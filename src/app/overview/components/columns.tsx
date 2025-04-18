"use client";

import { Flight } from "../../../types/Flight";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableActions from "./table-actions";

// Formatting the numbers to Japanese currency
const formatCurrency = (value: number | undefined) => {
	if (value === undefined) return "";
	return value.toLocaleString("ja-JP");
};

export const columns: ColumnDef<Flight>[] = [
	{
		id: "boardingDate",
		header: "搭乗日",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>{row.original.boardingDate}</p>
				</div>
			);
		},
	},
	{
		id: "departure",
		header: "出発地",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>{row.original.departure}</p>
				</div>
			);
		},
	},
	{
		id: "destination",
		header: "目的地",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>{row.original.destination}</p>
				</div>
			);
		},
	},
	{
		id: "flightNumber",
		header: "便名",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>{row.original.flightNumber}</p>
				</div>
			);
		},
	},
	{
		id: "ticketPrice",
		header: "航空券代",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>{formatCurrency(row.original.ticketPrice)}円</p>
				</div>
			);
		},
	},
	{
		id: "fareType",
		header: "運賃種別",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>{row.original.fareType}</p>
				</div>
			);
		},
	},
	{
		id: "otherExpenses",
		header: "その他費用",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>
						{row.original.otherExpenses
							? `${formatCurrency(row.original.otherExpenses)}円`
							: "-"}
					</p>
				</div>
			);
		},
	},
	{
		id: "earnedPP",
		header: "獲得PP",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>{formatCurrency(row.original.earnedPP)}</p>
				</div>
			);
		},
	},
	{
		id: "status",
		header: "ステータス",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>{row.original.status}</p>
				</div>
			);
		},
	},
	{
		id: "ppUnitPrice",
		header: "PP単価",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<p>{row.original.ppUnitPrice?.toFixed(2) || "-"}</p>
				</div>
			);
		},
	},
	{
		id: "action",
		header: "",
		size: 10,
		cell: ({ row }) => {
			return <TableActions {...row.original} />;
		},
	},
];
