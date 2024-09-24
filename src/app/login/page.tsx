import AuthInterface from '@/components/AuthInterface'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Login - Quickbet Movies',
	description:
		'Join Quickbet Movies and place bets on your favorite films. Your entertainment, your choice!'
}

export default function LoginPage() {
	return (
		<AuthInterface
			text='🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let
				the cinematic adventure begin!'
			img='/login-yellow-hoodie-character.png'
			page
		/>
	)
}
