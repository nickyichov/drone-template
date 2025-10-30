import {useEffect, useRef, useState} from "react"

export default function Header({ selectedOption, setSelectedOption }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            console.log(wrapperRef.current.contains(event.target));
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    })

    const checkHandler = () => {
        setIsChecked(!isChecked)
    }

    const showSensors = () => {
        setIsOpen(!isOpen)
    }

    const handleSensorChoice = (e) => {
        const value = e.target.value;

        setSelectedOption((prev) =>
            prev.includes(value)
            ? prev.filter((sensor) => sensor !== value)
            : [...prev, value]
        );
    }

    return (
        <>
            <div className="w-full bg-gray-800 p-3 flex justify-between">
                <div>
                    <fieldset className="flex gap-2 relative" ref={wrapperRef}>
                        <div className="flex gap-2 cursor-pointer" onClick={showSensors} >
                            <legend>Choose sensors</legend>
                            <OpenButton buttonLabel={isOpen ? "↑" : "↓"} isOpen={isOpen} />
                        </div>
                        <div className={isOpen ? "absolute z-10 left-0 top-6 block bg-gray-800 p-4 rounded-sm" : "hidden" }>
                            <div className="flex gap-2">
                                <input value="roll"
                                       type="checkbox"
                                       checked={selectedOption.includes("roll")}
                                       onChange={handleSensorChoice} />
                                <label>Roll</label>
                            </div>
                            <div className="flex gap-2">
                                <input value="pitch"
                                       type="checkbox"
                                       checked={selectedOption.includes("pitch")}
                                       onChange={handleSensorChoice} />
                                <label>Pitch</label>
                            </div>
                            <div className="flex gap-2">
                                <input value="yaw"
                                       type="checkbox"
                                       checked={selectedOption.includes("yaw")}
                                       onChange={handleSensorChoice} />
                                <label>Yaw</label>
                            </div>
                            <div className="flex gap-2">
                                <input value="attitude"
                                       type="checkbox"
                                       checked={selectedOption.includes("attitude")}
                                       onChange={handleSensorChoice} />
                                <label>Attitude</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="flex gap-2">
                    <label htmlFor="companion-comupter">Companion computer</label>
                    <input type="checkbox"
                           name="companion-computer"
                           checked={isChecked}
                           onChange={checkHandler}/>
                </div>
            </div>
        </>
    )
}

function OpenButton({ buttonLabel, isOpen }) {
    return (
        <button className={isOpen ? "opacity-50 cursor-pointer" : "opacity-100 cursor-pointer"}>
            {buttonLabel}
        </button>
    )
}