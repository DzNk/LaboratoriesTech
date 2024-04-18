import {Button, Center, Grid, Space, Stack, TextInput} from "@mantine/core";
import style from "pages/CalculatorPage/styles/Calculator.module.scss";
import {useOperations} from "pages/CalculatorPage/hooks/useOperations.ts";
import {Operation} from "pages/CalculatorPage/enums/calculatorEnums.ts";
import {useInputs} from "pages/CalculatorPage/hooks/useInputs.ts";
import {useState} from "react";

export function CalculatorPage() {
    const {currentOperation, setCurrentOperation} = useOperations();
    const [isHex, setIsHex] = useState<boolean>(false);
    const {
        lowerValue,
        setLowerValue,
        upperValue,
        setUpperValue,
        appendToInput,
        clearInput,
        result,
        compute,
        changeInput,
        invertValue,
        ref1,
        ref2,
    } = useInputs({operation: currentOperation, isHex: isHex});

    return (
        <>
            <Space h={'xl'}/>
            <Center>
                <Stack gap="xs"
                       className={style.input}>
                    <div ref={ref1}>
                        <TextInput
                            variant="filled"
                            value={upperValue}
                            onChange={(event) => setUpperValue(event.currentTarget.value)}
                            placeholder='Введите число'/>
                    </div>
                    <Center>
                    <span className={style.operationField}>
                        {currentOperation}
                    </span>
                    </Center>
                    <div ref={ref2}>
                        <TextInput
                            variant="filled"
                            value={lowerValue}
                            onChange={(event) => setLowerValue(event.currentTarget.value)}
                            placeholder='Введите число'/>
                    </div>
                    <div className={style.stroke}/>
                    <TextInput
                        disabled
                        value={result}
                        placeholder='Результат'/>
                </Stack>
                <Space w={'xl'}/>
                <Grid w={'24em'} columns={isHex ? 5 : 4}>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('1')}>1</Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('2')}>2</Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('3')}>3</Button>
                    </Grid.Col>
                    {isHex &&
                        <>
                            <Grid.Col span={1}>
                                <Button className={style.button} onClick={() => appendToInput('A')}>a</Button>
                            </Grid.Col>
                        </>
                    }
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => {
                            setCurrentOperation(Operation.ADD);
                            changeInput();
                        }}>
                            +
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('4')}>4</Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('5')}>5</Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('6')}>6</Button>
                    </Grid.Col>
                    {isHex &&
                        <>
                            <Grid.Col span={1}>
                                <Button className={style.button} onClick={() => appendToInput('B')}>b</Button>
                            </Grid.Col>
                        </>
                    }
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => {
                            setCurrentOperation(Operation.SUB);
                            changeInput();
                        }}>
                            -
                        </Button>
                    </Grid.Col>


                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('7')}>7</Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('8')}>8</Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('9')}>9</Button>
                    </Grid.Col>
                    {isHex &&
                        <>
                            <Grid.Col span={1}>
                                <Button className={style.button} onClick={() => appendToInput('C')}>c</Button>
                            </Grid.Col>
                        </>
                    }
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => {
                            setCurrentOperation(Operation.DIV);
                            changeInput();
                        }}>
                            /
                        </Button>
                    </Grid.Col>


                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('0')}>0</Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => appendToInput('.')}>.</Button>
                    </Grid.Col>
                    <Grid.Col span={1} onClick={() => invertValue()}>
                        <Button className={style.button}>+/-</Button>
                    </Grid.Col>
                    {isHex &&
                        <>
                            <Grid.Col span={1}>
                                <Button className={style.button} onClick={() => appendToInput('D')}>d</Button>
                            </Grid.Col>
                        </>
                    }
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => {
                            setCurrentOperation(Operation.MUL);
                            changeInput();
                        }}>
                            *
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => clearInput()}>
                            CLS
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => compute()}>
                            =
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button className={style.button} onClick={() => setIsHex(prevState => !prevState)}>
                            HEX
                        </Button>
                    </Grid.Col>
                    {isHex &&
                        <>
                            <Grid.Col span={1}>
                                <Button className={style.button} onClick={() => appendToInput('E')}>e</Button>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button className={style.button} onClick={() => appendToInput('F')}>f</Button>
                            </Grid.Col>
                        </>
                    }
                    {!isHex &&
                        <Grid.Col span={1}>
                            <Button className={style.button}></Button>
                        </Grid.Col>
                    }


                </Grid>
            </Center>
        </>
    );
}