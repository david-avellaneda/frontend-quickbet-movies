'use client'

import AuthInterface from '@/components/AuthInterface'
import { useEffect, useState } from 'react'

export default function LoginModalPage() {
	const [scrollPosition, setScrollPosition] = useState(0)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		setScrollPosition(window.scrollY)
		document.body.classList.add('no-scroll')
		setLoaded(true)

		return () => document.body.classList.remove('no-scroll')
	}, [])

	return (
		<>
			{loaded ? (
				<AuthInterface
					text='🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let
				the cinematic adventure begin!'
					img='/login-yellow-hoodie-character.png'
					modal
					scrollPosition={scrollPosition}
				/>
			) : null}
		</>
	)
}
