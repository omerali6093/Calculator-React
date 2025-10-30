import React, { useState } from "react";
import Keys from "./Keys";

const Calculator = () => {
  const keys = [
    "AC",
    "C",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    ".",
    "0",
    "=",
  ];

  const [showResult, setShowResult] = useState(false);
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState([]); 

  const maxLimit = 15;

  function calculateResult() {
    if (display.length !== 0) {
      try {
        let calcResult = eval(display);
        calcResult = parseFloat(calcResult.toFixed(3));

        // 🆕 Save to history
        setHistory((prev) => [
          { expression: display, result: calcResult },
          ...prev,
        ]);

        setDisplay(calcResult.toString());
        setShowResult(true);
      } catch (err) {
        setDisplay("Error");
      }
    } else {
      setDisplay("");
    }
  }

  function handleButton(value) {
    setShowResult(false);
    if (value === "AC") {
      setDisplay("");
    } else if (value === "C") {
      setDisplay(display.slice(0, -1));
    } else if (isOperator(value)) {
      if (display === "" || isOperator(display[display.length - 1])) return;
      setDisplay(display + value);
    } else if (value === "=") {
      calculateResult();
    } else {
      if (display.length < maxLimit) {
        setDisplay(display + value);
      }
    }
  }

  function isOperator(char) {
    return ["*", "/", "%", "+", "-"].includes(char);
  }

  const operationClass =
    "text-[1.2rem] tracking-[2px] flex gap-[5px] items-center text-[rgba(255,255,255,0.5)] justify-end";
  const resultClass = "text-[1.7rem]";

  return (
    <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl text-white">
      <div
        className="overflow-x-auto bg-[#141414] min-h-[100px]
             flex items-end justify-end flex-col p-4 rounded-[10px]"
      >
        <div className={`${showResult ? resultClass : operationClass}`}>
          {display || "0"}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3rem] mt-5">
        {keys.map((item, index) => (
          <Keys
            label={item}
            key={index}
            keyClass={item === "=" && "="}
            onButtonClick={handleButton}
          />
        ))}
      </div>

      <div className="bg-[#1c1c1c] mt-4 rounded-xl p-3 max-h-[200px] overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-300">History</h2>
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="text-sm text-red-400 hover:text-red-500"
            >
              Clear
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500 text-sm">No history yet</p>
        ) : (
          <ul className="space-y-1">
            {history.map((item, i) => (
              <li
                key={i}
                className="flex justify-between text-sm bg-[#222] px-2 py-1 rounded-md"
              >
                <span>{item.expression}</span>
                <span className="text-green-400">= {item.result}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Calculator;