'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './index.module.css'
import { useEffect, useState } from 'react'
import ThemeToggleBtn from '../ThemeToggleButton'
import { usePathname } from 'next/navigation'

const Navbar = (): JSX.Element => {
	const [theme, setTheme] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const [open, setOpen] = useState<undefined | boolean>(undefined)

	const router = usePathname() === '/'

	const handleMenu = (): void => setOpen(!open)
	const handleClick = (): void => setOpen(false)

	useEffect(() => {
		function handleScroll() {
			window.scrollY > 120 ? setScrolled(true) : setScrolled(false)
		}

		window.addEventListener('scroll', handleScroll)

		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		if (open !== undefined) {
			if (window.innerWidth < 1000) {
				if (open) {
					document.body.classList.add('no-scroll')
				} else document.body.classList.remove('no-scroll')
			}
		}
	}, [open])

	return (
		<header
			className={`${styles.header} ${open ? styles.active : ''} ${router && scrolled ? styles.scrolled : ''} ${!router ? styles.scrolled : ''}`}
		>
			<nav>
				<Link href='/' className={styles.container_logo} onClick={handleClick}>
					<Image
						src='/logo-white.svg'
						alt='Logo Quickbet Movies'
						width={313}
						height={68}
						className={`
              ${router && !scrolled && !open && styles.show_img} 
              ${router && !scrolled && open && theme && styles.show_img}
              ${router && scrolled && theme && styles.show_img}
              ${router && scrolled && !theme && styles.hide_img}
              ${!router && theme ? styles.show_img : styles.hide_img}
            `}
					/>
					<Image
						src='/logo-black.svg'
						alt='Logo Quickbet Movies'
						width={313}
						height={68}
						className={`
              ${router && !scrolled && open && !theme && styles.show_img}
              ${router && scrolled && !theme && styles.show_img}
              ${!router && !theme ? styles.show_img : styles.hide_img}
            `}
					/>
				</Link>
				<button
					className={`${styles.icon_menu} ${open ? styles.open_menu : ''}`}
					onClick={handleMenu}
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
				<ul className={`${styles.items} ${open ? styles.items_active : ''}`}>
					<div className={styles.links}>
						<li>
							<Link href='/' onClick={handleClick}>
								Home
							</Link>
						</li>
						<li>
							<Link href='/popular' onClick={handleClick}>
								Popular
							</Link>
						</li>
						<li>
							<Link href='/top-rated' onClick={handleClick}>
								Top rated
							</Link>
						</li>
						<li>
							<Link href='/now-playing' onClick={handleClick}>
								Now playing
							</Link>
						</li>
						<li>
							<Link href='/upcoming' onClick={handleClick}>
								Upcoming
							</Link>
						</li>
					</div>
					<div className={styles.config}>
						<li>
							<Link href='#' onClick={handleClick}>
								<Image src='/user.svg' alt='User' width={20} height={20} />
							</Link>
						</li>
						<li onClick={handleClick}>
							<ThemeToggleBtn theme={theme} setTheme={setTheme} />
						</li>
					</div>
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
