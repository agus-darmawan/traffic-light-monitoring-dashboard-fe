import axios from '@/lib/axios';

export const users = () => {
  const getUsers = async (role: string) => {
    try {
      const response = await axios.get(`users/${role}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (id: number) => {
    try {
      const response = await axios.get(`users/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  const postUser = async (regionData: any) => {
    try {
      const response = await axios.post('users', regionData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (id: number, regionData: any) => {
    try {
      const response = await axios.patch(`users/${id}`, regionData);
      console.log(response);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`users/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  };
  return {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser
  };
};
