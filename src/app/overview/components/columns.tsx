"use client";

import { Bookmark } from "@/app/Modal";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableActions from "./table-actions";

export const columns: ColumnDef<Bookmark>[] = [
	{
    id: "boardingDate", 
		header: "搭乗日",
		size: 300,
		cell: ({ row }) => {
			return (
				<div>
					<Link href={row.original.url} className="cursor-pointer">
						{row.original.alias || row.original.url}
					</Link>
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
					<p>東京 羽田</p>
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
					<p>沖縄 那覇</p>
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
					<p>NH477</p>
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
					<p>14,900</p>
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
					<p>SV75</p>
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
					<p>1,180円</p>
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
					<p>1,476</p>
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
					<p>1,476</p>
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
					<p>10.09</p>
				</div>
			);
		},
	},
	{
    id: "action",
		header: "",
		size: 10,
		cell: ({ row }) => {
			return (
				<TableActions
					id={row.original.id}
					alias={row.original.alias}
					url={row.original.url}
				/>
			);
		},
	},
];
