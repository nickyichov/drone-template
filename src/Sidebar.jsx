import {useState} from "react";

export default function Sidebar({ sensorNames }) {
    const [showSensors, setShowSensors] = useState(false);
    const [sensorName, setSensorName] = useState("");

    return (
        <>
            <div className="h-full w-48 border border-black">
                <div className="h-10 bg-gray-800 text-white flex justify-center items-center cursor-pointer over"
                     onClick={() => setShowSensors(!showSensors)}>
                    <span>Sensors ↓</span>
                </div>
                <div className={showSensors ? "block" : "hidden"}>
                    <ul className="pl-2">
                        {sensorNames.map((sensorName, index) => (
                            <li className="hover:opacity-50 cursor-pointer"
                                key={index}
                                onClick={() => {setSensorName(sensorName)}}
                            >
                                {sensorName}
                            </li>
                        ))}
                    </ul>
                    {sensorName}
                </div>
            </div>
        </>
    )
}