import axios from 'axios';

export async function getStudents(
  offset: number,
  pageLimit: number,
  country: string
) {
  try {
    const res = await axios.get(
      `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
        (country ? `&search=${country}` : '')
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
