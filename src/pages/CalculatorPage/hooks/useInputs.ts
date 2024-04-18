import {useEffect, useState} from "react";
import {useFocusWithin} from "@mantine/hooks";
import {Operation} from "pages/CalculatorPage/enums/calculatorEnums.ts";


export type Properties = {
    operation: Operation;
    isHex: boolean;
}

export function useInputs(props: Properties) {
    const {operation, isHex} = props;

    const [upperValue, setUpperValue] = useState<string | number>('');
    const [lowerValue, setLowerValue] = useState<string | number>('');
    const [currentInput, setCurrentInput] = useState<'upper' | 'lower'>('upper');
    const [result, setResult] = useState<string | number>('');

    const {ref: ref1, focused: focused1} = useFocusWithin();
    const {ref: ref2, focused: focused2} = useFocusWithin();

    const changeInput = () => {
        if (upperValue.toString().length === 0) return;
        setCurrentInput('lower');
    }

    const appendToInput = (value: string) => {
        if (value === '.' && ((currentInput === 'upper' && upperValue.toString().includes('.')) ||
            (currentInput === 'lower' && lowerValue.toString().includes('.')))) {
            return;
        }
        if (currentInput === 'upper') setUpperValue((prev: string | number) => prev.toString() + value);
        else setLowerValue((prev: string | number) => prev.toString() + value);
    };

    const clearInput = () => {
        setUpperValue('');
        setLowerValue('');
        setResult('');
        setCurrentInput('upper');
    }

    const compute = () => {
        const upperValueStr = upperValue.toString();
        const lowerValueStr = lowerValue.toString();

        if (upperValueStr.length === 0 || lowerValueStr.length === 0) return;

        const floatUpperValue = parseFloat(upperValueStr);
        const floatLowerValue = parseFloat(lowerValueStr);
        let resultValue = 0;

        switch (operation) {
            case Operation.ADD:
                resultValue = floatUpperValue + floatLowerValue;
                break;
            case Operation.SUB:
                resultValue = floatUpperValue - floatLowerValue;
                break;
            case Operation.MUL:
                resultValue = floatUpperValue * floatLowerValue;
                break;
            case Operation.DIV:
                if (floatLowerValue == 0) break;
                resultValue = floatUpperValue / floatLowerValue;
                break;
        }

        setResult(resultValue.toString());
    }

    const invertValue = () => {
        const currentValue = currentInput === 'upper' ? upperValue : lowerValue;
        const strValue = currentValue.toString();
        if (strValue.length === 0) return;

        if (strValue[0] === '-') {
            if (currentInput === 'upper') setUpperValue(strValue.slice(1));
            else setLowerValue(strValue.slice(1));
        } else {
            if (currentInput === 'upper') setUpperValue(prevState => '-' + prevState);
            else setLowerValue(prevState => '-' + prevState);
        }
    }

    useEffect(() => {
        if (focused1) {
            setCurrentInput('upper');
        } else if (focused2) {
            setCurrentInput('lower');
        }
    }, [focused1, focused2]);


    useEffect(() => {
        const convertDecimalToHex = (decimalStr: string) => {
            const sign = decimalStr.startsWith('-') ? '-' : '';
            if (sign) decimalStr = decimalStr.substring(1);

            const decimalNum = parseFloat(decimalStr);
            return sign + decimalNum.toString(16);
        };

        const convertHexToDecimal = (hexStr: string) => {
            const sign = hexStr.startsWith('-') ? '-' : '';
            if (sign) hexStr = hexStr.substring(1);

            const parts = hexStr.split(".");
            const integerPart = parseInt(parts[0], 16);
            let fractionalPart = 0;

            if (parts.length > 1) {
                for (let i = 0; i < parts[1].length; i++) {
                    fractionalPart += parseInt(parts[1][i], 16) / Math.pow(16, i + 1);
                }
            }

            const decimalNum = sign + (integerPart + fractionalPart).toString();
            return parseFloat(decimalNum).toString();
        };


        if (isHex) {
            if (upperValue !== '') {
                setUpperValue((prev) => convertDecimalToHex(prev.toString()));
            }
            if (lowerValue !== '') {
                setLowerValue((prev) => convertDecimalToHex(prev.toString()));
            }
            if (result !== '') {
                setResult((prev) => convertDecimalToHex(prev.toString()));
            }
        } else {
            if (upperValue !== '') {
                setUpperValue((prev) => convertHexToDecimal(prev.toString()));
            }
            if (lowerValue !== '') {
                setLowerValue((prev) => convertHexToDecimal(prev.toString()));
            }
            if (result !== '') {
                setResult((prev) => convertHexToDecimal(prev.toString()));
            }
        }
    }, [isHex]);


    return {
        upperValue: upperValue, setUpperValue: setUpperValue,
        lowerValue: lowerValue, setLowerValue: setLowerValue,
        changeInput: changeInput,
        clearInput: clearInput,
        compute: compute,
        result: result,
        appendToInput: appendToInput,
        invertValue: invertValue,
        ref1,
        ref2
    };
}