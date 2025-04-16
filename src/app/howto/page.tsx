"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Modal from "../Modal";

// MEMO: I will temporally write a pure text on this page.
// what I need? -> fix it to make it like a real tutorial page and have a clear description.
function HowTo() {
	return (
		<div className="px-6 pt-10">
			<div className="mx-auto max-w-2xl py-8">
				<div className="text-center">
					<h1 className="font-bold tracking-tight text-2xl">
            新規フライト情報の追加方法
					</h1>
					<p className="mt-6 text-lg text-gray-700">
            このページでは、システムに新しいフライト情報を追加する手順を詳しく説明しています。<br/>
            下のボタンをクリックすると入力フォームが表示され、フライト番号、出発地、目的地、出発時刻などの必要な情報を入力することができます。<br/>
            全ての項目を正確に入力し、確認した後で登録ボタンを押してください。<br/>
            データは即時に反映され、ユーザーはすぐに新しいフライト情報を検索・閲覧することができます。<br/>
					</p>
					<div className="mt-10 flex justify-center items-center gap-x-6">
						<Modal button={() => <Button>新規フライトを追加</Button>} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default HowTo;
