import { useState } from "react"

export default function Header({ selectedOption, setSelectedOption }) {
    const [isChecked, setIsChecked] = useState(false);

    const checkHandler = () => {
        setIsChecked(!isChecked)
    }

    const handleChange = (e) => {
        setSelectedOption(e.target.value)
    }

    return (
        <>
            <div className="w-full bg-gray-800 p-3 flex justify-between">
                <div>
                    <label htmlFor="sensors">Choose a sensor: </label>
                    <select value={selectedOption}
                            onChange={handleChange}
                            className="bg-[#2f4f4f] p-1 rounded-sm text-xs"
                            name="sensors"
                            id="sensors">
                        <option defaultValue value="">Select</option>
                        <option value="roll">roll</option>
                        <option value="pitch">pitch</option>
                        <option value="yaw">yaw</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="companion-comupter">Companion computer</label>
                    <input type="checkbox"
                           name="companion-computer"
                           checked={isChecked}
                           onChange={checkHandler}/>
                </div>
            </div>
            <div>
                {selectedOption === "roll" && <div>Roll has been selected</div>}
                {selectedOption === "pitch" && <div>Pitch has been selected</div>}
                {selectedOption === "yaw" && <div>Yaw has been selected</div>}
            </div>
        </>
    )
}