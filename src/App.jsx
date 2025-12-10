import {useEffect, useRef, useState} from "react";
import Header from "./Header.jsx"
import Sidebar from "./Sidebar.jsx"
import Sensors from "./Sensors.jsx"
import Chart from "./Chart.jsx";
import ThreeDModel from "./Views/ThreeDModel.jsx";
import Camera from "./Views/Camera.jsx"
import FlightInstruments from "./Views/FlightInstruments.jsx";

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
    const [amsl, setAmsl] = useState(0);
    const [yacc, setYacc] = useState(0);
    const [distance, setDistance] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

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
                if (data.type === "Altitude-amsl") {
                    setAmsl(data.value);
                }
                if (data.type === "HighresImu-yacc") {
                    setYacc(data.value);
                }
                if (data.type === "DistanceSensor-current") {
                    setDistance(data.value);
                }
                if (data.type === "GpsRawInt-lat") {
                    setLatitude(data.value)
                }
                if (data.type === "GpsRawInt-lon") {
                    setLongitude(data.value)
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
            <div className="flex flex-col w-full h-screen">
                <div className="border border-black h-1/3 w-full flex justify-center bg-[#444547]">
                    <FlightInstruments roll={roll} pitch={pitch} yaw={yaw} speed={groundspeed} yacc={yacc} altitudeAmsl={amsl} />
                </div>
                <div className="flex border border-black w-full h-2/3">
                    <div className="border border-black w-1/2 h-full flex">
                        <Camera />
                    </div>
                    <div className="border border-black w-1/2 h-full overflow-hidden">
                        Distance is { distance }
                        <Sensors roll={roll} pitch={pitch} yaw={yaw}
                                 temperature={temperature} groundspeed={groundspeed} showWindSpeed={showWindSpeed}
                                 latitude={latitude} longitude={longitude} />
                    </div>
                </div>
            </div>
        </>
    )
}