"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Modal from "../Modal";

function HowTo() {
	return (
		<div className="px-6 pt-10">
			<div className="mx-auto max-w-2xl py-8">
				<div className="text-center">
					<h1 className="font-bold tracking-tight text-4xl">
						How to add new links
					</h1>
					<p className="mt-6 text-lg text-gray-300">
						Page dedicated to explaining how to add new links...
					</p>
					<div className="mt-10 flex justify-center items-center gap-x-6">
						<Modal button={() => <Button>Add New Link</Button>} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default HowTo;
