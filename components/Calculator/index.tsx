"use client";

import { useSignIn } from "@/hooks/use-sign-in";
import Image from "next/image";
import { useState } from "react";

export default function Calculator() {
  const { signIn, isLoading, isSignedIn, user } = useSignIn({
    autoSignIn: true,
  });
  
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

  if (!isSignedIn) {
    return (
      <div className="bg-white text-black flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-6xl mb-4">🧮</div>
          <h1 className="text-4xl font-bold">Calculator</h1>
          <p className="text-lg text-gray-600">
            Sign in to start calculating
          </p>
          <button
            onClick={signIn}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        {/* User Info */}
        {user && (
          <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
            <Image
              src={user.pfp_url}
              alt="Profile"
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
            <div>
              <p className="font-semibold text-sm">{user.display_name}</p>
              <p className="text-xs text-gray-500">@{user.username}</p>
            </div>
          </div>
        )}

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