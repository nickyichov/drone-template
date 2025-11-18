export default function FlightInstruments({ roll, pitch, yaw, yacc, speed, altitudeAmsl, climb }) {
    const rollDeg = roll * (180 / Math.PI);

    return (
        <>
            <div className="flex">
                <AttitudeIndicator roll={roll} pitch={pitch} />
                <AirspeedIndicator speed={speed} />
                <TurnCoordinator yacc={yacc} rollDeg={rollDeg} />
                <HeadingIndicator yaw={yaw} />
                <Altimeter altitudeAmsl={altitudeAmsl} />
            </div>
        </>
    )
}

function AttitudeIndicator({roll, pitch}) {
    let pitchRotation = pitch * 100;

    if (pitchRotation > 35 ) {
        pitchRotation = 35;
    }
    else if (pitchRotation < -35 ) {
        pitchRotation = -35;
    }

    return (
        <>
            <div className="relative w-72">
                <img src="src/images/attitude_roll_1.svg"
                     alt="attitude roll background"
                     className="absolute"
                     style={{
                        transform: `rotate(${roll}deg)`
                    }}
                />
                <img src="src/images/attitude_roll_2.svg"
                     alt="attitude roll background"
                     className="absolute"
                     style={{
                        zIndex: 2,
                        transform: `rotate(${roll}deg)`
                    }}
                />
                <img src="src/images/attitude_pitch.svg"
                     alt="attitude pitch"
                     className="absolute"
                     style={{
                        zIndex: 1,
                        transform: `translate(0px, ${pitchRotation}px)`
                    }}
                />
                <img src="src/images/attitude_foreground_1.svg"
                     alt="attitude roll indicator"
                     className="absolute"
                     style={{
                        zIndex: 2,
                    }}
                />
                <img src="src/images/attitude_foreground_2.svg"
                     alt="attitude roll indicator"
                     className="absolute"
                     style={{
                        zIndex: 2,
                     }}
                />
                <img src="src/images/indicator_background_dashboard.svg"
                     alt="indicator background"
                     className="absolute"
                />
                <img src="src/images/indicator_foreground.svg"
                     alt="indicator foreground"
                     className="absolute"
                     style={{
                        zIndex: 3,
                     }}
                />
                <img src="src/images/indicator_background_screws.svg"
                     alt="indicator background screws"
                     className="absolute"
                />
            </div>
        </>
    )
}

// TODO: change ground speed to air speed
function AirspeedIndicator({speed}) {
    let airSpeed = (speed / 30) * 180;
    if (!airSpeed) {
        airSpeed = 0;
    }

    return (
        <>
            <div className="relative w-72">
                <img src="src/images/airspeed_trueairspeed.svg"
                     alt="airspeed true airspeed"
                     className="absolute"
                     style={{
                        zIndex: 2,
                     }}
                />
                <img src="src/images/airspeed_markings.svg"
                     alt="airspeed markings markings"
                     className="absolute"
                     style={{
                        zIndex: 2,
                     }}
                />
                <img src="src/images/airspeed_hand.svg"
                     alt="airspeed hand"
                     className="absolute"
                     style={{
                        transform: 'rotate(180deg)',
                        rotate: `${airSpeed  * 10}deg`,
                        zIndex: 2
                     }}
                />
                <div className="absolute border-solid border-2 bg-[#414141] rounded-[10px] w-[75px] right-[5px] bottom-[65px] text-white p-[10px] flex justify-center items-center"
                     style={{
                        zIndex: 2,
                     }}
                >
                    { Math.round(airSpeed * 100) / 100 }
                </div>
                <img src="src/images/indicator_background_dashboard.svg"
                     alt="indicator background" className="absolute"
                />
                <img src="src/images/indicator_foreground.svg"
                     alt="indicator foreground"
                     className="absolute"
                     style={{
                        zIndex: 1,
                     }}
                />
                <img src="src/images/indicator_background_screws.svg"
                     alt="indicator background screws"
                     className="absolute"
                />
            </div>
        </>
    )
}

function TurnCoordinator({ yacc, rollDeg }) {
    const slip = yacc * 2;
    return (
        <>
            <div className="relative w-72">
                <img src="src/images/turn_markings_1.svg"
                     alt="turn markings"
                     className="absolute"
                     style={{
                        zIndex: 2,
                     }}
                />
                <img src="src/images/turn_markings_2.svg"
                     alt="turn markings"
                     className="absolute"
                     style={{
                        zIndex: 2,
                     }}
                />
                <img src="src/images/turn_airplane.svg"
                     alt="turn airplane"
                     className="absolute"
                     style={{
                        transform: `rotate(${rollDeg}deg)`,
                        zIndex: 2,
                     }}
                />
                <img src="src/images/turn_ball.svg"
                     alt="turn ball"
                     className="absolute"
                     style={{
                        transform: `translate(${slip}px)`,
                        zIndex: 2,
                     }}
                />
                <img src="src/images/turn_ball_path.svg"
                     alt="turn ball path"
                     className="absolute"
                />
                <img src="src/images/indicator_background_dashboard.svg"
                     alt="indicator background"
                     className="absolute"
                />
                <img src="src/images/indicator_foreground.svg"
                     alt="indicator foreground"
                     className="absolute"
                     style={{
                        zIndex: 1,
                     }}
                />
                <img src="src/images/indicator_background_screws.svg"
                     alt="indicator background screws"
                     className="absolute"
                />
            </div>
        </>
    )
}

function HeadingIndicator({ yaw }) {
    const yawDeg = -yaw * (180 / Math.PI);

    return (
        <>
            <div className="relative w-72">
                <img src="src/images/heading_yaw.svg"
                     alt="heading yaw"
                     className="absolute"
                     style={{
                        transform: `rotate(${yawDeg}deg)`,
                        zIndex: 2,
                     }}
                />
                <img src="src/images/heading_markings.svg"
                     alt="heading markings"
                     className="absolute"
                     style={{
                        zIndex: 2,
                     }}
                />
                <img src="src/images/indicator_background_dashboard.svg"
                     alt="indicator background"
                     className="absolute"
                />
                <img src="src/images/indicator_foreground.svg"
                     alt="indicator foreground"
                     className="absolute"
                     style={{
                        zIndex: 1,
                     }}
                />
                <img src="src/images/indicator_background_screws.svg"
                     alt="indicator background screws"
                     className="absolute"
                />
            </div>
        </>
    )
}

// TODO: implement inhg and mbar measurements
function Altimeter({ altitudeAmsl }) {
    // turn it into feet
    const altitudeFeet = Math.abs(altitudeAmsl) * 3.28084;
    const hand1000 = (altitudeFeet % 10000) / 10000 * 360;
    const hand100 = (altitudeFeet % 1000) / 1000 * 360;

    return (
        <>
            <div className="relative w-72">
                <img src="src/images/altimeter_pressure_inhg.svg"
                     alt="altimeter pressure inhg"
                     className="absolute"
                     style={{
                        zIndex: 2,
                     }}
                />
                <img src="src/images/altimeter_background.svg"
                     alt="altimeter background"
                     className="absolute"
                     style={{
                        zIndex: 2,
                     }}
                />
                <img src="src/images/altimeter_foreground.svg"
                     alt="altimeter foreground"
                     className="absolute"
                     style={{
                        zIndex: 2,
                     }}
                />
                <img src="src/images/altimeter_hand_1000ft.svg"
                     alt="altimeter hand 1000ft"
                     className="absolute"
                     style={{
                        transform: `rotate(${hand1000}deg)`,
                        zIndex: 2,
                     }}
                />
                <img src="src/images/altimeter_hand_100ft.svg"
                     alt="altimeter hand 100ft"
                     className="absolute"
                     style={{
                        transform: `rotate(${hand100}deg)`,
                        zIndex: 2,
                     }}
                />
                <img src="src/images/indicator_background_dashboard.svg"
                     alt="indicator background"
                     className="absolute"
                />
                <img src="src/images/indicator_foreground.svg"
                     alt="indicator foreground"
                     className="absolute"
                     style={{
                        zIndex: 1,
                     }}
                />
                <img src="src/images/indicator_background_screws.svg"
                     alt="indicator background screws"
                     className="absolute"
                />
            </div>
        </>
    )
}

function VerticalSpeed({ climb }) {
    // the value might not be correct and it is too jumpy
    const climbFt = climb * 196.85;

    return (
        <>
            <div className="vertical-speed">
                <img src="src/images/vario_markings.svg" alt="vario markings" style={{
                    zIndex: 2,
                }}/>
                <img src="src/images/vario_hand.svg" alt="vario hand" style={{
                    transform: `rotate(${climbFt}deg)`,
                    zIndex: 2,
                }} />
                <img src="src/images/indicator_background_dashboard.svg" alt="indicator background"/>
                <img src="src/images/indicator_foreground.svg" alt="indicator foreground" style={{
                    zIndex: 1,
                }}/>
                <img src="src/images/indicator_background_screws.svg" alt="indicator background screws"/>
            </div>
        </>
    )
}