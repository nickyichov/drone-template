import { useState } from "react"

export default function Header() {
    const [isChecked, setIsChecked] = useState(false)

    const checkHandler = () => {
        setIsChecked(!isChecked)
    }

    return (
        <>
            <div className="w-full bg-gray-800 p-3 flex justify-between">
                <div>
                    <label htmlFor="sensors">Choose a sensor: </label>
                    <select className="bg-[#2f4f4f] p-1 rounded-sm text-xs" name="sensors" id="sensors">
                        <option defaultValue disabled hidden></option>
                        <option>roll</option>
                        <option>pitch</option>
                        <option>yaw</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="companion-comupter">Companion computer</label>
                    <input type="checkbox"
                           name="companion-computer"
                           checked={isChecked}
                           onChange={checkHandler}/>
                    <p>The checkbox is {isChecked ? "checked" : "unchecked"}</p>
                </div>
            </div>
        </>
    )
}