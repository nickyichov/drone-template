import {useState, useRef, useEffect} from "react";
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import Chart from "./Chart.jsx";

export default function Sensors({ temperature, airspeed, groundspeed, title, showWindSped }) {
   return (
       <>
           <div className="flex flex-col w-full justify-between">
               <div className="flex">
                   <div className="block w-96 h-64 border m-2 relative">
                       <div className={showWindSped ? "block" : "hidden"}>
                           <Tank airspeed={airspeed} groundspeed={groundspeed} title={title} />
                       </div>
                   </div>
                   <Camera/>
                   <Temperature temperature={temperature} />
               </div>
           </div>
       </>
   )
}

function Camera() {
    return (
        <>
            <div className="w-96 h-64 border flex items-center justify-center m-2">
                <img className="h-full" src="../src/assets/thermalPhoto.jpeg" alt="thermal photo" />
            </div>
        </>
    )
}

function Temperature({ temperature }) {
    return (
        <>
            <div className="flex flex-col">
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

function Tank({ airspeed, groundspeed, title }) {
    return (
        <>
            <div className="bg-gray-800 p-2">Title: {title}</div>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <Chart groundspeed={groundspeed}/>
            </div>
        </>
    )
}