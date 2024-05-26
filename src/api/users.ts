import axios from '@/lib/axios';

export const index = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get('users', config);
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
    const response = await axios.get(`users/${id}`, config);
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
    const response = await axios.post('users', regionData, config);
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
    console.log(id, regionData, token);
    const response = await axios.patch(`users/${id}`, regionData, config);
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
    await axios.delete(`users/${id}`, config);
    return true;
  } catch (error) {
    throw error;
  }
};
