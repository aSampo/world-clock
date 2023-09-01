import axios from 'axios';
import { TimeZone } from '../models/TimeZone';

const API_BASE_URL = 'http://localhost:3000';

export async function fetchTimezones(): Promise<string[]> {
  const response = await axios.get<string[]>(`${API_BASE_URL}/timezone`);
  return response.data;
}

export async function fetchTimezoneDetails(timezone: string): Promise<TimeZone> {
  const response = await axios.get(`${API_BASE_URL}/timezone/${timezone}`);
  return response.data;
}
