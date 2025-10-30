export default function Sensors({ temperature }) {
   return (
       <>
           <Temperature temperature={temperature} />
           <Camera/>
       </>
   )
}

function Camera() {
    return (
        <>
            <div className="w-56 h-56 border flex items-center justify-center m-2">

            </div>
        </>
    )
}

function Temperature({ temperature }) {
    return (
        <>
            <div className={
                temperature > 65 && temperature < 75 ? "w-24 border p-2 m-2 flex items-center justify-center bg-orange-500" :
                temperature > 75 ? "w-24 border p-2 m-2 flex items-center justify-center bg-red-500"
                : "w-24 border p-2 m-2 flex items-center justify-center bg-green-500"}>
                {temperature.toFixed(1)}&#8451;
            </div>
        </>
    )
}