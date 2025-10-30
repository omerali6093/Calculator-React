import React, { use, useState }  from 'react';
import Keys from './Keys'

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
        "EQUAL"
    ];

    const [showResult, setShowResult] = useState(false);


    const operationClass = "text-[1.2rem] tracking-[2px] flex gap-[5px] items-center text-[rgba(255,255,255,0.5)] justify-end"
    const resultClass = "text-[1.7rem] "

    return (
        <div className="min-w-[320px] bg-black flex-col gap-4 p-4 rounded-2xl">
            <div className="overflow-x-auto bg-[#141414] min-h-[100px]
             flex items-end justify-end flex-col p-4 rounded-[10px]">
                <div className={`${showResult ? resultClass : operationClass }`}>Result</div>
             </div>

            <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3rem] mt-5">
                {keys.map((item, index) => (
                    < Keys label={item} key={index} keyClass={item === 'EQUALS' &&
                        'equals' }/>
                ))}
            </div>
        </div>    
    )
}

export default Calculator;