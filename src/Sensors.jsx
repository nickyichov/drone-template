export default function Sensors({ temperature }) {
   return (
       <>
           <div className="flex">
               <Camera/>
               <Temperature temperature={temperature} />
           </div>
       </>
   )
}

function Camera() {
    return (
        <>
            <div className="w-56 h-56 border flex items-center justify-center m-2">
                <img className="h-full" src="../src/assets/thermalPhoto.jpeg" alt="thermal photo" />
            </div>
        </>
    )
}

function Temperature({ temperature }) {
    return (
        <>
            <div className={
                temperature > 60 && temperature < 70 ? "w-24 h-12 border p-2 m-2 flex items-center justify-center bg-orange-500" :
                temperature > 70 ? "w-24 h-12 border p-2 m-2 flex items-center justify-center bg-red-500"
                : "w-24 h-12 border p-2 m-2 flex items-center justify-center bg-green-500"}>
                {temperature.toFixed(1)}&#8451;
            </div>
        </>
    )
}