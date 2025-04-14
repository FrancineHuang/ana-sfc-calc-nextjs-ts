import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Results() {
	return (
		<div className="px-6 pt-10">
			<div className="mx-auto max-w-2xl py-8">
				<div className="text-center">
					<h2 className="font-bold tracking-tight text-4xl">
						Submission Completed!
					</h2>
					<p className="mt-6 text-md text-gray-300">
						Your submission will apear in the overview page.
					</p>
				</div>
				<div className="mt-10 flex justify-center items-center gap-x-6">
					<Button asChild>
						<Link href="/overview" className="">
							Back to Overview
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Results;
