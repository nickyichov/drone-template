import express from 'express';
import { SerialPort } from "serialport";
import { MavLinkPacketParser, MavLinkPacketSplitter,
    minimal, common, ardupilotmega, uavionix, icarous
} from "node-mavlink";
import { WebSocketServer } from "ws";

const port = new SerialPort({
    path: '/dev/tty.usbmodem01',
    baudRate: 9600
});

const reader = port
    .pipe(new MavLinkPacketSplitter())
    .pipe(new MavLinkPacketParser())

const REGISTRY = {
    ...minimal.REGISTRY,
    ...common.REGISTRY,
    ...ardupilotmega.REGISTRY,
    ...uavionix.REGISTRY,
    ...icarous.REGISTRY,
}

const app = express();
app.use(express.static('public'));

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
})

const wss = new WebSocketServer({ server });

let sensorNameMessage = "";

wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        const message = JSON.parse(data);
        sensorNameMessage = message.sensor;
    });
});

reader.on('data', packet => {
    const clazz = REGISTRY[packet.header.msgid];
    if (clazz) {
        const data = packet.protocol.data(packet.payload, clazz);
        const name = data.constructor.name;

        if (name === 'Attitude') {
            const roll = Math.round(data.roll * 100)/100;
            const pitch = Math.round(data.pitch * 100)/100;
            const yaw = Math.round(data.yaw * 100)/100;

            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ type: 'Attitude-roll', value: roll }));
                client.send(JSON.stringify({ type: 'Attitude-pitch', value: pitch }));
                client.send(JSON.stringify({ type: 'Attitude-yaw', value: yaw }));
            })
        }

        if (name === 'HighresImu') {
            const temperature = data.temperature;

            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ type: 'Imu-temperature', value: temperature }));
            })
        }

        if (name === 'VfrHud') {
            const airspeed = data.airspeed;
            const groundspeed = data.groundspeed;

            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ type: 'VfrHud-airspeed', value: airspeed }));
                client.send(JSON.stringify({ type: 'VfrHud-groundspeed', value: groundspeed }));
            })
        }

        if (name === 'Altitude') {
            const altitudeAmsl = Math.round(data.altitudeAmsl * 100)/100;

            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ type: 'Altitude-amsl', value: altitudeAmsl }));
            })
        }

        if (name === 'HighresImu') {
            const yacc = Math.round(data.yacc * 100)/100;

            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ type: 'HighresImu-yacc', value: yacc }));
            })
        }

        if (name === 'DistanceSensor') {
            const currentDistance = data.currentDistance;

            console.log(currentDistance);

            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ type: 'DistanceSensor-current', value: currentDistance }));
            })
        }

        if (name === 'GpsRawInt') {
            const lat = data.lat / 1e7;
            const lon = data.lon / 1e7;

            wss.clients.forEach((client) => {
                client.send(JSON.stringify({type: 'GpsRawInt-lat', value: lat}));
                client.send(JSON.stringify({type: 'GpsRawInt-lon', value: lon}));
            })
        }
    }
})