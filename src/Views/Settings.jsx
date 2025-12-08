import { useState } from "react";
import Map from "./Map";

export default function Settings() {
    const [range, setRange] = useState(100);

    return (
        <>
            <div className="m-2">
                <div className="flex gap-2">
                    <div className="flex gap-2 items-center">
                        <span>Range:</span>
                        <input type="text"
                               className="w-1/2 text-sm p-1 border border-white rounded-md"
                               value={range}
                               onChange={e => setRange(e.target.value)}
                        />
                    </div>
                </div>
                <div className="h-72">
                    <Map distance={range} />
                </div>
            </div>
        </>
    )
}