import axios from '@/lib/axios';
import type { Device } from '@/types/devices';

export interface ResultType {
  all_devices: number;
  problem: {
    count: number;
    devices: Device[];
  };
  issue: {
    count: number;
    devices: Device[];
  };
  active: {
    count: number;
    devices: Device[];
  };
}

export const index = async (token: string): Promise<ResultType> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get('dashboard', config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
