import 'dotenv/config'
import { Metadata } from 'next'
import './globals.css'
import WelcomeScreen from '@/components/WelcomeScreen'
import Navbar from '@/components/Navbar'
import inter from '@/fonts/inter'

export const metadata: Metadata = {
	title: 'Quickbet Movies',
	description:
		'Discover and bet on your favorite movies with Quickbet Movies. Your entertainment, your choice!'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>): JSX.Element {
	return (
		<html lang='en'>
			<body className={`${inter.className} no-scroll`}>
				<WelcomeScreen />
				<Navbar />
				{children}
			</body>
		</html>
	)
}
