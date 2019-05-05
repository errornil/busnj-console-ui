import { objectProp } from '../helpers';

const domain = objectProp(['window', 'location', 'hostname'], global);
const isLocalhost = domain === 'localhost';

export const basePath = isLocalhost ? 'http://localhost:4501' : '';
export const busVehicleDataPath = basePath + "/busVehicleData";
