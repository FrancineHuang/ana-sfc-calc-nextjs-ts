"use client";

import { Button } from "../components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flight } from "../types/Flight";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
	addBookmark,
	editBookmark,
} from "../lib/features/bookmarks/bookmarksSlice";

const formSchema = z.object({
  boardingDate: z.string().min(1, "搭乗日は必須です"),
  departure: z.string().min(1, "出発地は必須です"),
  destination: z.string().min(1, "目的地は必須です"),
  flightNumber: z.string().min(1, "便名は必須です"),
  ticketPrice: z.coerce.number({
    required_error: "航空券代は必須です",
    invalid_type_error: "有効な数字を入力してください"
  }).positive("正の数を入力してください"),
  fareType: z.string().min(1, "運賃種別は必須です"),
  otherExpenses: z.coerce.number().optional(),
  earnedPP: z.coerce.number({
    required_error: "獲得PPは必須です", 
    invalid_type_error: "有効な数字を入力してください"
  }).positive("正の数を入力してください"),
  status: z.string().optional(),
});

// MEMO: 之后需要把下面的类型定义砍掉，换成types定义的航班信息
type FormData = z.infer<typeof formSchema>;


function Modal({
	button,
	flightData = {},
	id = "",
}: {
	button: () => React.ReactNode;
	flightData?: Partial<Flight>;
	id?: string;
}) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const router = useRouter();

	const dispatch = useDispatch();
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			boardingDate: flightData.boardingDate || "",
			departure: flightData.departure || "東京 羽田",
			destination: flightData.destination || "沖縄 那覇",
			flightNumber: flightData.flightNumber || "",
			ticketPrice: flightData.ticketPrice || undefined,
			fareType: flightData.fareType || "",
			otherExpenses: flightData.otherExpenses || undefined,
			earnedPP: flightData.earnedPP || undefined,
			status: flightData.status || "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const newId = id || uuidv4();
		const newBookmark: Bookmark = { ...values, id: newId };
		if (id && id.trim() !== "") {
			// edit exisitng bookmark
			dispatch(editBookmark(newBookmark));
		} else {
			// add new bookmark
			dispatch(addBookmark(newBookmark));
			router.push("/results");
		}

		form.reset();
		setIsDialogOpen(false);
	}
	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>{button()}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="mb-4"></DialogTitle>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{/* TITLE INPUT */}
							<FormField
								control={form.control}
								name="alias"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title/Alias</FormLabel>
										<FormControl>
											<Input placeholder="Your Title..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* URL INPUT */}
							<FormField
								control={form.control}
								name="url"
								render={({ field }) => (
									<FormItem>
										<FormLabel>URL/Link</FormLabel>
										<FormControl>
											<Input placeholder="Your URL..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default Modal;
