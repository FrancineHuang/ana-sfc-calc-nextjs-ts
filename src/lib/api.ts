import axios from 'axios';
import { Flight } from '../types/Flight';
import { objectCamelToSnake, objectSnakeToCamel } from '../utils/caseConverter';

// create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api',
  headers: {
    "Content-Type": 'application/json',
    'Accept': 'application/json',
  }
})

// Request interceptor: Convert camelCase to snake_case
api.interceptors.request.use(
  (config) => {
    // Only convert data for POST, PUT, PATCH requests
    if (config.data && ['post', 'put', 'patch'].includes(config.method || '')) {
      config.data = objectCamelToSnake(config.data);
    }

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor: Convert snake_case to camelCase
api.interceptors.response.use(
  (response) => {
    // Convert response data
    if (response.data) {
      response.data = objectSnakeToCamel(response.data);
    }

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response:', response.data);
    }

    return response;
  },
  (error) => {
    // Convert error response data
    if (error.response?.data) {
      error.response.data = objectSnakeToCamel(error.response.data);
    }

    console.error('❌ Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    return Promise.reject(error);
  }
);

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
  deleteFlight: async(id: string): Promise<void> => {
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