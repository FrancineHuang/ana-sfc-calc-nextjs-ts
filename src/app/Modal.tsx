"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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
	alias: z.string().max(50),
	url: z.string().regex(
		// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
		"Invalid URL"
	),
});

export interface Bookmark {
	id: string;
	alias: string;
	url: string;
}

function Modal({
	button,
	title = "",
	url = "",
	id = "",
}: {
	button: () => React.ReactNode;
	title?: string;
	url?: string;
	id?: string;
}) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const router = useRouter();

	const dispatch = useDispatch();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			alias: title,
			url: url,
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
