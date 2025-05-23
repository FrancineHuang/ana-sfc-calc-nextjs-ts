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
					<a className="text-gray-50" href="/">
						SFC Calculator
					</a>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex">
						<Button asChild variant="link">
							<Link href="/overview">フライト一覧</Link>
						</Button>
						<Button asChild variant="link">
							<Link href="/howto">新規を追加</Link>
						</Button>
						<Button asChild variant="link">
							<Link href="/bin">ゴミ箱</Link>
						</Button>
					</div>

					<Modal button={() => <Button>新規フライトを追加</Button>} />
				</div>
			</div>
		</div>
	);
}

export default Header;
