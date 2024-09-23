import './globals.css'
import WelcomeScreen from '@/components/WelcomeScreen'
import Navbar from '@/components/Navbar'
import inter from '@/fonts/inter'

export default function RootLayout({
	children,
	login
}: Readonly<{ children: React.ReactNode; login: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} no-scroll`}>
				<WelcomeScreen />
				<Navbar />
				{children}
				{login}
			</body>
		</html>
	)
}
