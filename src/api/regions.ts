import axios from '@/lib/axios';

export const index = async () => {
  try {
    const response = await axios.get('regions');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const show = async (id: number, token: string) => {
  try {
    const response = await axios.get(`regions/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const showByZone = async (zone_id: number) => {
  try {
    const response = await axios.get(`regions/zone/${zone_id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const store = async (regionData: any) => {
  try {
    const response = await axios.post('regions', regionData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, regionData: any) => {
  try {
    const response = await axios.patch(`regions/${id}`, regionData);
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const destroy = async (id: number) => {
  try {
    await axios.delete(`regions/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
};
