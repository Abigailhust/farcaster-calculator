"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ 
    onClick, 
    className = "", 
    children, 
    variant = "default" 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    variant?: "default" | "operator" | "equals" | "clear";
  }) => {
    const baseClasses = "h-16 text-xl font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50";
    
    const variantClasses = {
      default: "bg-gray-200 hover:bg-gray-300 text-black focus:ring-gray-400",
      operator: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400",
      equals: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400",
      clear: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        {/* Calculator Display */}
        <div className="bg-black text-white p-4 rounded-lg mb-4">
          <div className="text-right text-3xl font-mono overflow-hidden">
            {display}
          </div>
        </div>

        {/* Calculator Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={clear} variant="clear" className="col-span-2">
            Clear
          </Button>
          <Button onClick={() => {}} variant="operator">
            ±
          </Button>
          <Button onClick={() => performOperation("÷")} variant="operator">
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber("7")}>7</Button>
          <Button onClick={() => inputNumber("8")}>8</Button>
          <Button onClick={() => inputNumber("9")}>9</Button>
          <Button onClick={() => performOperation("×")} variant="operator">
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber("4")}>4</Button>
          <Button onClick={() => inputNumber("5")}>5</Button>
          <Button onClick={() => inputNumber("6")}>6</Button>
          <Button onClick={() => performOperation("-")} variant="operator">
            -
          </Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber("1")}>1</Button>
          <Button onClick={() => inputNumber("2")}>2</Button>
          <Button onClick={() => inputNumber("3")}>3</Button>
          <Button onClick={() => performOperation("+")} variant="operator">
            +
          </Button>

          {/* Row 5 */}
          <Button onClick={() => inputNumber("0")} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={handleEquals} variant="equals">
            =
          </Button>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Farcaster Calculator Mini App
        </div>
      </div>
    </div>
  );
}