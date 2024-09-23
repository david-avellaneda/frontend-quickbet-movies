/* eslint-disable @next/next/no-img-element */

'use client'

import Link from 'next/link'
import styles from './index.module.css'
import { IoIosArrowDropleft, IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface AuthInterfaceProps {
	text: string
	img: string
	page?: boolean
	modal?: boolean
	scrollPosition?: number
}

const AuthInterface = ({ text, img, modal, scrollPosition = 0, page }: AuthInterfaceProps) => {
	const [email, setEmail] = useState('')
	const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null)
	const [password, setPassword] = useState('')
	const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const router = useRouter()
	const pathname = usePathname()

	const validateEmail = (email: string) => {
		const re = /^[a-z0-9._-]{4,40}@[a-z0-9.-]{4,20}\.[a-z]{2,10}$/
		return re.test(email.toLowerCase())
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const emailValue = e.target.value
		setEmail(emailValue)
		setIsValidEmail(validateEmail(emailValue))
	}

	const validatePassword = (password: string) => {
		const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/
		return re.test(password)
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const passwordValue = e.target.value
		setPassword(passwordValue)
		setIsValidPassword(validatePassword(passwordValue))
	}

	return (
		<section
			className={`${styles.container} ${page ? styles.page : ''} ${modal ? styles.modal : ''}`}
			style={{ top: `${scrollPosition}px` }}
			onClick={() => modal && router.back()}
			id={modal ? 'modal' : ''}
		>
			<div onClick={(e) => e.stopPropagation()}>
				<div className={styles.backdrop}></div>
				<div>
					<div className={styles.content}>
						{modal && (
							<button className={styles.close} onClick={() => router.back()}>
								<IoIosArrowDropleft />
								Back
							</button>
						)}
						<div className={styles.links}>
							<Link
								href='/signup'
								className={pathname === '/signup' ? styles.activeLink : ''}
								onClick={(e) => {
									e.preventDefault()
									if (modal) {
										router.back()
										setTimeout(() => router.push('/signup'), 50)
									} else {
										router.push('/signup')
									}
								}}
							>
								Sign up
							</Link>
							<Link href='/login' className={pathname === '/login' ? styles.activeLink : ''}>
								Log In
							</Link>
						</div>
						<div className={styles.containerForm}>
							{pathname === '/login' && <p>We love having you back</p>}
							<form className={styles.form} name='login' onSubmit={(e) => e.preventDefault()}>
								<div className={styles.inputs}>
									<div className={styles.containerInput}>
										<div>
											<input
												type='email'
												placeholder='Email'
												autoComplete='off'
												name='email'
												value={email}
												onChange={handleEmailChange}
											/>
										</div>
										{isValidEmail !== null && isValidEmail === false && (
											<p className={styles.alertMessage}>
												Enter a valid email address example@domain.com
											</p>
										)}
									</div>
									<div className={styles.containerInput}>
										<div>
											<input
												type={isPasswordVisible ? 'text' : 'password'}
												placeholder='Password'
												name='password'
												value={password}
												onChange={handlePasswordChange}
											/>
											<span onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
												{isPasswordVisible ? <IoIosEye /> : <IoIosEyeOff />}
											</span>
										</div>
										{isValidPassword !== null && isValidPassword === false && (
											<p className={styles.alertMessage}>
												The password must be between 6 and 20 characters long, include at least one
												uppercase letter, one lowercase letter, and one number.
											</p>
										)}
									</div>
								</div>
								<button
									type='submit'
									disabled={!(isValidEmail && isValidPassword)}
									className={styles.submitBtn}
								>
									Continue
								</button>
							</form>
							<p>For any questions, reach out to support@quickbetmovies.com</p>
						</div>
					</div>
					<div className={styles.info}>
						<h1>Welcome back to Quickbet Movies!</h1>
						<p>{text}</p>
						<img src={img} alt='Yellow hoodie character' />
					</div>
				</div>
			</div>
		</section>
	)
}

export default AuthInterface
