import express from 'express';
import { SerialPort } from "serialport";
import { MavLinkPacketParser, MavLinkPacketSplitter,
    minimal, common, ardupilotmega, uavionix, icarous
} from "node-mavlink";
import { WebSocketServer } from "ws";

const port = new SerialPort({
    path: '/dev/tty.usbmodem01',
    baudRate: 57600
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

reader.on('data', packet => {
    const clazz = REGISTRY[packet.header.msgid];
    if (clazz) {
        const data = packet.protocol.data(packet.payload, clazz);
        const name = data.constructor.name;

        wss.clients.forEach(client => {
            client.send(JSON.stringify({name}))
        })

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

        wss.on('message', msg => {
            const data = JSON.parse(msg);

            console.log('received data is ', data);
        })
    }
})