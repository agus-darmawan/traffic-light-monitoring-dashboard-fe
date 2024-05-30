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

export const dashboard = () => {
  const getStatictics = async (): Promise<ResultType> => {
    try {
      const response = await axios.get('dashboard');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    getStatictics
  };
};
