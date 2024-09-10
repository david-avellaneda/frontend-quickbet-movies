'use client'

import styles from './index.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const WelcomeScreen = (): JSX.Element => {
	const [show, setShow] = useState(false)
	const [hidden, setHidden] = useState(false)

	useEffect(() => {
		const hide = setTimeout(() => setHidden(true), 1500)
		const remove = setTimeout(() => setShow(true), 2000)

		return () => {
			clearTimeout(hide)
			clearTimeout(remove)
		}
	}, [])

	useEffect(() => {
		if (show) document.body.classList.remove('no-scroll')
	}, [show])

	return (
		<>
			{!show && (
				<div className={`${styles.container} ${hidden && styles.hidden}`}>
					<div className={styles.container_logo}>
						<Image
							src='/logo-welcome-screen.svg'
							alt='Logo Quickbet Movies'
							width={313}
							height={68}
							priority
							className={styles.logo}
						/>
						<Image
							src='/loader.svg'
							alt='Loading'
							width={300}
							height={75}
							priority
							className={styles.loader}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default WelcomeScreen
