import axios from '@/lib/axios';

export const index = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get('devices', config);
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
    const response = await axios.get(`devices/${id}`, config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const store = async (regionData: any, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.post('devices', regionData, config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, regionData: any, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.patch(`devices/${id}`, regionData, config);
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
    await axios.delete(`devices/${id}`, config);
    return true;
  } catch (error) {
    throw error;
  }
};
