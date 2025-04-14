"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<div className="px-6 pt-10">
				<div className="mx-auto max-w-2xl py-8">
					<div className="text-center">
						<h1 className="font-bold tracking-tight text-6xl">
							The fastest way to save your links!
						</h1>
						<p className="mt-6 text-lg text-gray-300">
							Get started managing all your links and bookmarks with PocketLinks
						</p>
						<div className="mt-10 flex justify-center items-center gap-x-6">
							<Button asChild>
								<Link href="/overview" className="">
									Get started
								</Link>
							</Button>
							<Button asChild variant="secondary">
								<Link href="/howto" className="text-sm font-semibold">
									Learn more
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
