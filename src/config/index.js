import { objectProp } from '../helpers';

const domain = objectProp(['window', 'location', 'hostname'], global);
const isLocalhost = domain === 'localhost';

export const basePath = isLocalhost ? 'http://localhost:6001' : '';

export const busVehicleDataPath = basePath + "/busVehicleData";

export const busVehicleDataStreamPath = isLocalhost
    ? 'ws://localhost:6001/busVehicleDataStream'
    : 'wss://console.busnj.chuhlomin.com/busVehicleDataStream';
