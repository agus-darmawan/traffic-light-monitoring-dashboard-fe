import axios from '@/lib/axios';

export const index = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get('zones', config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const show = async (id: number, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(`zones/${id}`, config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const store = async (zoneData: any, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.post('zones', zoneData, config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, zoneData: any, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.patch(`zones/${id}`, zoneData, config);
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const destroy = async (id: number, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    await axios.delete(`zones/${id}`, config);
    return true;
  } catch (error) {
    throw error;
  }
};
