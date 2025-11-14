import {useEffect, useRef, useState} from "react";
import Header from "./Header.jsx"
import Sidebar from "./Sidebar.jsx"
import Sensors from "./Sensors.jsx"
import Chart from "./Chart.jsx";
import ThreeDModel from "./Views/ThreeDModel.jsx";

export default function App() {
    const ws = useRef(null)

    const [selectedSensor, setSelectedSensor] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const selectedTypeRef = useRef(selectedType);

    const [roll, setRoll] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [yaw, setYaw] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [airspeed, setAirspeed] = useState(0);
    const [groundspeed, setGroundspeed] = useState(0);

    const [showWindSpeed, setShowWindSpeed] = useState(false);

    const [selectedOption, setSelectedOption] = useState("");

    const [showSensors, setShowSensors] = useState(false);

    const [rollArray, setRollArray] = useState([]);

    useEffect(() => {
        ws.current = new WebSocket('ws://127.0.0.1:3000');

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === "Attitude-roll") {
                    setRoll(data.value);
                    let arr = [...rollArray];
                    arr.push(data.value);
                    setRollArray(arr);
                }
                if (data.type === "Attitude-pitch") {
                    setPitch(data.value);
                }
                if (data.type === "Attitude-yaw") {
                    setYaw(data.value);
                }
                if (data.type === "Imu-temperature") {
                    setTemperature(data.value);
                }
                if (data.type === "VfrHud-airspeed") {
                    setAirspeed(data.value);
                }
                if (data.type === "VfrHud-groundspeed") {
                    setGroundspeed(data.value);
                }
            } catch (e) {
                console.error(e);
            }
        }
    });

    useEffect(() => {
        selectedTypeRef.current = selectedType;
    },[selectedType]);

    const sendSensorName = (message) => {
        setSelectedSensor(message);
        ws.current.send(JSON.stringify({sensor: message}));
    };

    const selectTypeFromSensor = (typeFromSensor) => {
        setSelectedType(typeFromSensor);
    };

    return (
        <>
            <Header selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <div className="flex">
                <div>
                    <div className="h-full w-48 border border-black">
                        <div className="h-10 bg-gray-800 text-white flex justify-center items-center cursor-pointer over"
                             onClick={() => setShowSensors(!showSensors)}>
                            <span>Sensors</span>
                        </div>
                        <div className={showWindSpeed ? "bg-gray-600" : "bg-transparent"}>
                            <div className="border border-black h-10 flex justify-center items-center cursor-pointer hover:bg-gray-800 font-semibold"
                                 onClick={() => {setShowWindSpeed(!showWindSpeed)}}>
                                Detect wind speed
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start border border-black">
                    <div className="block w-96 h-64 border m-2 relative">
                        <ThreeDModel roll={roll} pitch={pitch} yaw={yaw} />
                    </div>
                    <Sensors temperature={temperature} airspeed={airspeed} groundspeed={groundspeed} title={'Detect Wind Speed'} showWindSped={showWindSpeed} />
                    <div className="flex gap-2 w-full p-2">
                        { selectedOption.includes("roll") && <div className={"border-1 p-2 w-full text-center"}>Roll: {roll}</div>}
                        { selectedOption.includes("pitch") && <div className={"border-1 p-2 w-full text-center"}>Pitch: {pitch}</div> }
                        { selectedOption.includes("yaw") && <div className={"border-1 p-2 w-full text-center"}>Yaw: {yaw}</div> }
                    </div>
                    <div className="flex gap-2 w-full p-2">
                        { selectedOption.includes("attitude") &&
                            <div className="border-1 p-2 w-28 text-left">
                                <div className="flex justify-between">
                                    Roll: <p>{roll}</p>
                                </div>
                                <div className="flex justify-between">
                                    Pitch: <p>{pitch}</p>
                                </div>
                                <div className="flex justify-between">
                                    Yaw: <p>{yaw}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}