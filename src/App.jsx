import { useEffect, useState } from "react";

export default function App() {
    const [roll, setRoll] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [yaw, setYaw] = useState(0);

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
            <div className="flex gap-2 w-full">
                <div>{roll}</div>
                <div>{pitch}</div>
                <div>{yaw}</div>
            </div>
        </>
    )
}