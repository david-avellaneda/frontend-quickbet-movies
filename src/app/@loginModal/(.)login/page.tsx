'use client'

import Login from '@/components/Login'
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
		<>{loaded ? <Login customClass='loginModalPage' scrollPosition={scrollPosition} /> : null}</>
	)
}
