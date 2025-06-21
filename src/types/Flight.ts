export interface Flight {
	id: string;
	boardingDate: string;
	departure: string;
	destination: string;
	flightNumber: string;
	ticketPrice: number;
	fareType: string;
	otherExpenses?: number;
	earnedPP: number;
	status?: boolean;
	ppUnitPrice?: number;
}
