import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Header from "../components/layout/Header";
import "./globals.css";

const ReduxProvider = dynamic(() => import("@/lib/redux-provider"), {
	ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SFC Calculator",
	description:
		"A web application to calculate the premium points and simulate the flights",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={inter.className}>
				<ReduxProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<Header />
						{children}
					</ThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
