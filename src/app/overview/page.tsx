"use client";

import { selectFlights } from "@/lib/features/flights/flightsSlice";
import { useSelector } from "react-redux";
import { columns } from "../../components/tables/columns";
import { DataTable } from "../../components/tables/data-table";

export default function Overview() {
	const flights = useSelector(selectFlights);
	return (
		<div className="container mx-auto py-10">
			<h2 className="font-bold mb-4 text-xl">マイフライト一覧</h2>
			<DataTable columns={columns} data={flights} />
		</div>
	);
}
