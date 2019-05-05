import axios from 'axios';
import { busVehicleDataPath } from '../../config';

export const fetchBusVehicleData = () => axios.get(busVehicleDataPath);
