import {useState, useRef, useEffect} from "react";
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import Chart from "./Chart.jsx";
import ThreeDModel from "./Views/ThreeDModel.jsx";
import Settings from "./Views/Settings.jsx"
import Map from "./Views/Map.jsx";

export default function Sensors({ roll, pitch, yaw, temperature, airspeed, groundspeed, title, showWindSped, longitude, latitude }) {
    const [selectInformation, setSelectInformation] = useState("aileron");

    const handleSelectInformation = (info) => {
        setSelectInformation(info);
        console.log(selectInformation);
    }

   return (
       <>
           <div className="flex w-full">
               <div className="flex w-1/4 justify-center p-2">
                   <ul>
                       <li className="bg-gray-900 px-10 py-1 rounded-xl text-green-600 font-bold my-2 border-2 border-transparent
                                      hover:border-orange-800 hover:text-orange-800 hover:cursor-pointer text-center"
                           onClick={() => handleSelectInformation("aileron")}
                       >
                           Aileron
                       </li>
                       <li className="bg-gray-900 px-10 py-1 rounded-xl text-green-600 font-bold my-2 border-2 border-transparent
                                      hover:border-orange-800 hover:text-orange-800 hover:cursor-pointer text-center"
                           onClick={() => handleSelectInformation("roll")}
                       >
                           Roll
                       </li>
                       <li className="bg-gray-900 px-10 py-1 rounded-xl text-green-600 font-bold my-2 border-2 border-transparent
                                      hover:border-orange-800 hover:text-orange-800 hover:cursor-pointer text-center"
                           onClick={() => handleSelectInformation("settings")}
                       >
                           Settings
                       </li>
                       <li className="bg-gray-900 px-10 py-1 rounded-xl text-green-600 font-bold my-2 border-2 border-transparent
                                      hover:border-orange-800 hover:text-orange-800 hover:cursor-pointer text-center"
                           onClick={() => handleSelectInformation("map")}
                       >
                           Map
                       </li>
                   </ul>
               </div>
               <div className="w-full">
                   <div className="h-92">
                       {
                           selectInformation === "aileron" &&
                           <ThreeDModel roll={roll} pitch={pitch} yaw={yaw} />
                       }
                       {
                           selectInformation === "roll" &&
                           <div>
                               <Chart groundspeed={roll} />
                               <div>

                               </div>
                           </div>
                       }
                       {
                            selectInformation === "settings" &&
                            <Settings />
                       }
                       {
                           selectInformation === "map" &&
                           <Map distance={100} />
                       }
                   </div>
                   <div className="flex h-1/2 items-start p-2">
                       <ConstantSensors temperature={temperature} latitude={latitude} longitude={longitude} />
                   </div>
               </div>
           </div>
       </>
   )
}

function ConstantSensors({ temperature, latitude, longitude }) {
    const [distance, setDistance] = useState(2);
    const [battery, setBattery] = useState(25);
    const [batteryCapacity, setBatteryCapacity] = useState(5000);

    const voltage = 14.8; // V
    const powerDraw = 150 ; // W
    const flightTime = Number.parseFloat(
        (((batteryCapacity * voltage * 0.85) / powerDraw) * 60) / 1000
    ).toFixed(2);
    return (
        <>
            <div>
                <div className="flex justify-between p-2">
                    <div>
                        <label>
                            Battery:
                            <input
                                className="w-10 border p-1 rounded-md mx-2"
                                value={battery}
                                onChange={e => setBattery(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Distance:
                            <input
                                className="w-10 border p-1 rounded-md mx-2"
                                value={distance}
                                onChange={e => setDistance(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Battery Capacity:
                            <input
                                className="w-14 border p-1 rounded-md mx-2"
                                value={batteryCapacity}
                                onChange={e => setBatteryCapacity(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex gap-2 p-2">
                    <div className="flex flex-col items-center bg-gray-900 p-2 rounded-md">
                        <p className="text-yellow-600">Battery</p>
                        <div className="flex">
                            {
                                battery >= 50 && <img src="src/assets/power.png" alt="Battery"/> ||
                                battery < 50 && battery >= 20 && <img src="src/assets/power-warning.png" alt="Battery" /> ||
                                battery < 20 && <img src="src/assets/power-critical.png" alt="Battery" />
                            }
                        </div>
                        <p className="text-blue-800">{battery}%</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-900 p-2 rounded-md">
                        <p className="text-yellow-600">Distance</p>
                        <div>
                            {
                                battery >= 50 && distance < 3 ? (
                                    <img src="src/assets/distance.png" alt="Distance" />
                                ) : (battery < 50 && battery >= 20 && distance >= 3 && distance < 5) || (battery >= 50 && distance > 10 && distance < 15) ? (
                                    <img src="src/assets/distance-warning.png" alt="Distance" />
                                ) : (battery < 20 && distance > 1) || (battery < 50 && battery >= 20 && distance >= 5) || (battery >= 50 && distance >= 15) ?  (
                                    <img src="src/assets/distance-critical.png" alt="Distance" />
                                ) : <img src="src/assets/distance.png" alt="Distance" />
                            }
                        </div>
                        <p className="text-blue-800">{distance}KM</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-900 p-2 rounded-md">
                        <p className="text-yellow-600">Flight time</p>
                        <div>
                            {
                                flightTime >= 20 && (distance > 3 && distance <= 5) ? (
                                    <img src="src/assets/flight-time.png" alt="Flight time" />
                                ) : flightTime >= 10 && flightTime < 20 && (distance >= 1 && distance <= 3) ? (
                                    <img src="src/assets/flight-time-warning.png" alt="Flight time" />
                                ) : (flightTime < 10 && distance > 1) || (flightTime >= 20 && distance > 5) ? (
                                    <img src="src/assets/flight-time-critical.png" alt="Flight time" />
                                ) : <img src="src/assets/flight-time.png" alt="Flight time" />
                            }
                        </div>
                        <p className="text-blue-800">{flightTime}Min</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-900 px-2 p-2 rounded-md">
                        <div className="flex">
                            {
                                temperature < 60 && <img src="src/assets/temp-low.png" alt="temp" className="w-5"/> ||
                                temperature >= 60 && temperature <= 70 && <img src="src/assets/temp-norm.png" alt="temp" className="w-5"/> ||
                                temperature > 70 && <img src="src/assets/temp-high.png" alt="temp" className="w-5"/>
                            }
                            <p className="text-sm text-yellow-600">IMU</p>
                        </div>
                        <p className={ temperature > 60 && temperature < 70 ? "text-[#FFC20C] text-sm" :
                                       temperature > 70 ? "text-[#ED1C25] text-sm"
                                       : "text-[#22B14C] text-sm"}>
                            { temperature.toFixed(1) }&#8451;
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-900 px-2 p-2 rounded-md">
                        <div className="flex">
                            {
                                temperature < 60 && <img src="src/assets/temp-low.png" alt="temp" className="w-5"/> ||
                                temperature >= 60 && temperature <= 70 && <img src="src/assets/temp-norm.png" alt="temp" className="w-5"/> ||
                                temperature > 70 && <img src="src/assets/temp-high.png" alt="temp" className="w-5"/>
                            }
                            <p className="text-sm text-yellow-600">Fire</p>
                        </div>
                        <p className={ temperature > 60 && temperature < 70 ? "text-[#FFC20C] text-sm" :
                            temperature > 70 ? "text-[#ED1C25] text-sm"
                                : "text-[#22B14C] text-sm"}>
                            { temperature.toFixed(1) }&#8451;
                        </p>
                    </div>
                    <div className="bg-gray-900 p-2 rounded-md">
                        <div className="flex">
                            <img src="src/assets/satelite.png" alt="satelite"/>
                            <p className="text-sm text-yellow-600">GPS</p>
                        </div>
                        <div className="text-blue-800 text-sm">
                            <div className="flex gap-2">
                                <p>Lat:</p>
                                <p>{latitude}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Lon:</p>
                                <p>{longitude}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}