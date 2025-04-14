"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";

function Header() {
	return (
		<div className="border-b bg-gray-800 justify-between p-4">
			<div className="mx-auto flex items-center justify-between max-w-[60rem]">
				<div className="flex items-center">
					<Image
						src="/logo.png"
						width={30}
						height={30}
						alt="logo"
						className="mr-2"
					/>
					<a href="/">PocketLinks</a>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex">
						<Button asChild variant="link">
							<Link href="/overview">Overview</Link>
						</Button>
						<Button variant="link">
							<Link href="/howto">How To</Link>
						</Button>
						<Button variant="link">
							<Link href="/bin">Bin</Link>
						</Button>
					</div>

					<Modal button={() => <Button>Add New Link</Button>} />
				</div>
			</div>
		</div>
	);
}

export default Header;
