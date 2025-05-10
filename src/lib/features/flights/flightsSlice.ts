import { Flight } from "../../../types/Flight";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { flightAPI } from "../../api";

interface FlightsState {
	flights: Flight[];
  trashedFlights: Flight[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FlightsState = {
	flights: [],
  trashedFlights: [],
  loading: 'idle',
  error: null
};

// Async thunks for API operations
export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async () => {
    return await flightAPI.getAllFlights();
  }
);

export const fetchTrashedFlights =  createAsyncThunk(
  'flights/fetchTrashedFlights',
  async () => {
    return await flightAPI.getTrashedFlight();
  }
);

export const addFlightAsync = createAsyncThunk(
  'flights/addFlight',
  async (flight: Omit<Flight, 'id'>) => {
    return await flightAPI.createFlight(flight);
  }
);

export const deleteFlightAsync = createAsyncThunk(
  'flights/deleteFlight',
  async (id: string) => {
    await flightAPI.deteteFlight(id);
    return id
  }
);

export const restoreFlightAsync = createAsyncThunk(
  'flights/restoreFlight',
  async (id: string) => {
    return await flightAPI.restoreFlight(id);
  }
)


export const flightsSlice = createSlice({
	name: "flights",
	initialState,
	reducers: {
		addFlight: (state, action: PayloadAction<Flight>) => {
			state.flights.push(action.payload);
		},
		deleteFlight: (state, action: PayloadAction<string>) => {
			state.flights = state.flights.filter(
				(flight) => flight.id !== action.payload
			);
		},
		editFlight: (state, action: PayloadAction<Flight>) => {
			const index = state.flights.findIndex(
				(flight) => flight.id === action.payload.id
			);
			if (index === -1) return;

			state.flights[index] = { ...action.payload };
		},
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
	},
  extraReducers: (builder) => {
    // Operating fetchFlights
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch flights';
      })

    // Operating fetchTrashedFlights
      .addCase(fetchTrashedFlights.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed ro fetch the trashed flights';
      })

    // Operating addFlightAsync
      .addCase(addFlightAsync.fulfilled, (state, action) => {
        state.flights.push(action.payload);
      })

    // Operating deleteFlightAsync
      .addCase(deleteFlightAsync.fulfilled, (state, action) => {
        state.flights = state.flights.filter(
          (flight) => flight.id !== action.payload
        );
      })

    // Operating restoreFlightAsync
      .addCase(restoreFlightAsync.fulfilled, (state, action) => {
        state.trashedFlights = state.trashedFlights.filter(
          (flight) => flight.id !== action.payload.id
        );
        state.flights.push(action.payload);
      })
  }
});

export const { 
  addFlight, 
  deleteFlight, 
  editFlight,
  setError,
  clearError
} = flightsSlice.actions;

export const selectFlights = (state: { flights: FlightsState }) =>
	state.flights.flights;

export const selectTrashedFlights = (state: { flights: FlightsState }) =>
  state.flights.trashedFlights;

export const selectLoading = (state: { flights: FlightsState }) =>
  state.flights.loading;

export const selectError  = (state: { flights: FlightsState }) =>
  state.flights.error;

export default flightsSlice.reducer;
