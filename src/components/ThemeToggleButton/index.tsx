'use client'

import { useEffect } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import styles from './index.module.css'

interface ThemeToggleBtnProps {
	theme: boolean
	// eslint-disable-next-line no-unused-vars
	setTheme: (theme: boolean) => void
}

const ThemeToggleBtn = ({ theme, setTheme }: ThemeToggleBtnProps) => {
	const handleThemeBtn = (): void => {
		document.documentElement.classList.add('no-transition')
		setTheme(!theme)
		setTimeout(() => document.documentElement.classList.remove('no-transition'), 500)
	}

	useEffect(() => {
		const getInitialMode = (): string => {
			const preferenceMode = window.localStorage.getItem('theme')
			const systemModePreference = window.matchMedia('(prefers-color-scheme: dark)')

			if (preferenceMode && typeof preferenceMode === 'string') return preferenceMode

			if (systemModePreference && typeof systemModePreference.matches === 'boolean')
				return systemModePreference.matches ? 'dark' : 'light'

			return 'light'
		}

		const currentMode = getInitialMode()

		if (currentMode === 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark')
			window.localStorage.setItem('theme', 'dark')
			setTheme(true)
		}
	}, [setTheme])

	useEffect(() => {
		if (theme) {
			document.documentElement.setAttribute('data-theme', 'dark')
			window.localStorage.setItem('theme', 'dark')
		} else {
			document.documentElement.removeAttribute('data-theme')
			window.localStorage.setItem('theme', 'light')
		}
	}, [theme])

	return (
		<button className={styles.btn} onClick={handleThemeBtn}>
			{theme ? <IoSunny /> : <IoMoon />}
		</button>
	)
}

export default ThemeToggleBtn
