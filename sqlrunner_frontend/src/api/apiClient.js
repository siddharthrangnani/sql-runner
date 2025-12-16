import axios from "axios";


const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000";
export const fetchTables = async () => {
  const res = await axios.get(`${API_BASE_URL}/tables`);
  return res.data.tables;
};

export const fetchTableDetails = async (tableName) => {
  const res = await axios.get(`${API_BASE_URL}/tables/${tableName}`);
  return res.data;
};


export const runSqlQuery = async (query) => {
  const response = await axios.post(`${API_BASE_URL}/query`, { query });
  return response.data;
};

