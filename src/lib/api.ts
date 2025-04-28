import axios from 'axios';
import { Flight } from '../types/Flight';

// create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: { 
    "Content-Type": 'application/json',
    'Accept': 'application/json',
  }
})

// Flight related API endpoints (refer from Laravel routes)
// TODO: After the update api has added on Laravel side, please add it here as same.
export const flightAPI = {
  // Get all flights
  getAllFlights: async (): Promise<Flight[]> => {
    const response = await api.get('/flights');
    return response.data;
  },

  // Get one specific flight
  getFlightById: async (id: string): Promise<Flight[]> => {
    const response = await api.get(`/flights/${id}`);
    return response.data;
  },

  // Create one flight data
  createFlight: async (flight: Omit<Flight, 'id'>): Promise<Flight> => {
    const response = await api.post('/flight', flight);
    return response.data;
  },

  // Delete flight data by id
  deteteFlight: async(id: string): Promise<void> => {
    await api.delete(`/flights/${id}`)
  },

  // Get trashed flight
  getTrashedFlight: async(): Promise<Flight[]> => {
    const response = await api.get('/flights/trashed');
    return response.data;
  },

  // Restore trashed flight by id
  restoreFlight: async(id: string): Promise<Flight> => {
    const response = await api.post(`flights/${id}/restore`);
    return response.data;
  }
};

export default api;