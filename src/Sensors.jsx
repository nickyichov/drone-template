import {useState, useRef, useEffect} from "react";
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import Chart from "./Chart.jsx";
import ThreeDModel from "./Views/ThreeDModel.jsx";

export default function Sensors({ roll, pitch, yaw, temperature, airspeed, groundspeed, title, showWindSped }) {
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
                   </ul>
               </div>
               <div className="w-full">
                   <div>
                       {
                           selectInformation === "aileron" &&
                           <ThreeDModel roll={roll} pitch={pitch} yaw={yaw} />
                       }
                       {
                           selectInformation === "roll" &&
                           <div>
                               <Chart />
                               <div>

                               </div>
                           </div>
                       }
                   </div>
                   <div className="flex h-1/2 items-end p-2">
                       <ConstantSensors temperature={temperature} />
                   </div>
               </div>
           </div>
       </>
   )
}

function Temperature({ temperature }) {
    return (
        <>
            <div className="flex flex-col items-end">
                <div className="flex flex-col items-center">
                    <div className={
                        temperature > 60 && temperature < 70 ? "w-24 h-12 border p-2 m-2 mb-0 flex items-center justify-center bg-orange-500" :
                        temperature > 70 ? "w-24 h-12 border p-2 m-2 mb-0 flex items-center justify-center bg-red-500"
                        : "w-24 h-12 border p-2 m-2 mb-0 flex items-center justify-center bg-green-500"}>
                        {temperature.toFixed(1)}&#8451;
                    </div>
                    <div className="bg-white w-24 text-black flex justify-center text-xs text-center">
                        Pixhawk Temperature
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className={
                        temperature > 60 && temperature < 70 ? "w-24 h-12 border p-2 m-2 mb-0 flex items-center justify-center bg-orange-500" :
                            temperature > 70 ? "w-24 h-12 border p-2 m-2 mb-0 flex items-center justify-center bg-red-500"
                                : "w-24 h-12 border p-2 m-2 mb-0 flex items-center justify-center bg-green-500"}>
                        {temperature.toFixed(1)}&#8451;
                    </div>
                    <div className="bg-white w-24 text-black flex justify-center text-xs text-center">
                        Fire Temperature
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className={
                        temperature > 60 && temperature < 70 ? "w-24 h-12 border p-2 m-2 mb-0 flex items-center justify-center bg-orange-500" :
                            temperature > 70 ? "w-24 h-12 border p-2 m-2 mb-0 flex items-center justify-center bg-red-500"
                                : "w-24 h-12 border p-2 m-2 mb-0 flex items-center justify-center bg-green-500"}>
                        {temperature.toFixed(1)}&#8451;
                    </div>
                    <div className="bg-white w-24 text-black flex justify-center text-xs text-center">
                        Air Temperature
                    </div>
                </div>
            </div>
        </>
    )
}

function ConstantSensors({ temperature }) {

    return (
        <>
            <div className="flex gap-2">
                <div>
                    Power
                </div>
                <div>
                    Fuel
                </div>
                <div className="flex flex-col items-center bg-gray-900 px-2 p-2 rounded-md">
                    <div className="flex">
                        {
                            temperature < 60 && <img src="src/assets/temp-low.png" alt="temp" className="w-5"/> ||
                            temperature >= 60 && temperature <= 70 && <img src="src/assets/temp-norm.png" alt="temp" className="w-5"/> ||
                            temperature > 70 && <img src="src/assets/temp-high.png" alt="temp" className="w-5"/>
                        }
                        <p className="text-sm">ECT</p>
                    </div>
                    <p className={ temperature > 60 && temperature < 70 ? "text-[#FFC20C] text-sm" :
                                   temperature > 70 ? "text-[#ED1C25] text-sm"
                                   : "text-[#22B14C] text-sm"}>
                        { temperature.toFixed(1) }&#8451;
                    </p>
                </div>
                <div>
                    Temperature Fire
                </div>
                <div>
                    GPS
                </div>
            </div>
        </>
    )
}