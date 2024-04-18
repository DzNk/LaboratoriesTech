import {Operation} from "pages/CalculatorPage/enums/calculatorEnums.ts";
import {useState} from "react";

export function useOperations() {
    const [currentOperation, setCurrentOperation] = useState<Operation>(Operation.NONE);
    return {currentOperation: currentOperation, setCurrentOperation: setCurrentOperation};
}