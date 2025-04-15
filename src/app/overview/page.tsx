"use client";

import { selectBookmarks } from "@/lib/features/bookmarks/bookmarksSlice";
import { useSelector } from "react-redux";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function Overview() {
	const bookmarks = useSelector(selectBookmarks);
	return (
		<div className="container mx-auto py-10">
			<h2 className="font-bold mb-4 text-xl">マイフライト一覧</h2>
			<DataTable columns={columns} data={bookmarks} />
		</div>
	);
}
