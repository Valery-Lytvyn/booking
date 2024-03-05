import axios, { AxiosResponse } from "axios";
import { PlaceDataType } from "../types";

export const getData = async <T>(path: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get<T>(path);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error);
    throw new Error(`Failed to fetch data from ${path}`);
  }
};

export const postPlace = async <T>(path: string, data: PlaceDataType) => {
  try {
    await axios.post<T>(path, data);
  } catch (error) {
    console.error(`Error posting data to ${path}:`, error);
    throw new Error(`Error posting data to ${path}`);
  }
};
