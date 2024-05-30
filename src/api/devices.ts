import axios from '@/lib/axios';

export const index = async () => {
  try {
    const response = await axios.get('devices');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const show = async (id: number) => {
  try {
    const response = await axios.get(`devices/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const store = async (regionData: any) => {
  try {
    const response = await axios.post('devices', regionData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, regionData: any) => {
  try {
    const response = await axios.patch(`devices/${id}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const destroy = async (id: number) => {
  try {
    await axios.delete(`devices/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
};
