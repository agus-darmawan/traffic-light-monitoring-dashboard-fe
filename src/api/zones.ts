import axios from '@/lib/axios';

export const index = async () => {
  try {
    const response = await axios.get('zones');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const show = async (id: number) => {
  try {
    const response = await axios.get(`zones/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const store = async (zoneData: any) => {
  try {
    const response = await axios.post('zones', zoneData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, zoneData: any) => {
  try {
    const response = await axios.patch(`zones/${id}`, zoneData);
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const destroy = async (id: number) => {
  try {
    await axios.delete(`zones/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
};
