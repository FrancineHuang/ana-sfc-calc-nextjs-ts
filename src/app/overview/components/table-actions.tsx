"use client";

import Modal, { Bookmark } from "@/app/Modal";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBookmark } from "@/lib/features/bookmarks/bookmarksSlice";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

function TableActions({ id, alias, url }: Bookmark) {
	const dispatch = useDispatch();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<BsThreeDots className="w-6 h-6" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Modal
					button={() => (
						<button className="cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
							<FaEdit className="w-5 h-5 mr-2" />
							Edit
						</button>
					)}
					title={alias}
					url={url}
					id={id}
				/>

				<DropdownMenuItem
					className="cursor-pointer text-red-500"
					onClick={() => dispatch(deleteBookmark(id))}
				>
					<RiDeleteBin2Line className="w-5 h-5 mr-2" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default TableActions;
