import { useEffect, useState } from "react";
import Header from "./Header.jsx"

export default function App() {
    const [roll, setRoll] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [yaw, setYaw] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        const ws = new WebSocket('ws://127.0.0.1:3000');

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === "Attitude-roll") {
                    setRoll(data.value);
                }
                if (data.type === "Attitude-pitch") {
                    setPitch(data.value);
                }
                if (data.type === "Attitude-yaw") {
                    setYaw(data.value);
                }
            } catch (e) {
                console.error(e);
            }
        }
    })

    return (
        <>
            <Header selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <div className="flex gap-2 w-full">
                { selectedOption.includes("roll") && <div className={"border-1 p-2 w-28"}>Roll: {roll}</div>}
                { selectedOption.includes("pitch") && <div className={"border-1 p-2 w-28"}>Pitch: {pitch}</div> }
                { selectedOption.includes("yaw") && <div className={"border-1 p-2 w-28"}>Yaw: {yaw}</div> }
            </div>
        </>
    )
}