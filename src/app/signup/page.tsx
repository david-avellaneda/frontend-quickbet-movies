import AuthInterface from '@/components/AuthInterface'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Sign Up - Quickbet Movies',
	description:
		'Become a member of Quickbet Movies and dive into the excitement of betting on your favorite films. Sign up now and start your cinematic adventure!'
}

export default function SignupPage() {
	return (
		<AuthInterface
			text='🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!'
			img='/signup-yellow-hoodie-character.png'
			page
		/>
	)
}
