import { Flight } from "../../../types/Flight";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlightsState {
	flights: Flight[];
}

const initialState: FlightsState = {
	flights: [],
};

export const flightsSlice = createSlice({
	name: "bookmarks",
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
	},
});

export const { addFlight } = flightsSlice.actions;
export const { deleteFlight } = flightsSlice.actions;
export const { editFlight } = flightsSlice.actions;
export const selectFlights = (state: { flights: FlightsState }) =>
	state.flights.flights;

export default flightsSlice.reducer;
