/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from 'next/navigation'
import styles from './index.module.css'
import { useState } from 'react'
import {
	IoIosAlert,
	IoIosArrowDropleft,
	IoIosCheckmarkCircle,
	IoIosEye,
	IoIosEyeOff
} from 'react-icons/io'
import Link from 'next/link'

const Login = ({
	scrollPosition,
	customClass
}: {
	scrollPosition?: number
	customClass: string
}) => {
	const [email, setEmail] = useState('')
	const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null)
	const [password, setPassword] = useState('')
	const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const router = useRouter()

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

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible)
	}

	return (
		<section
			className={`${styles.container} ${styles[customClass]}`}
			style={{ top: `${scrollPosition}px` }}
			onClick={() => customClass === 'loginModalPage' && router.back()}
		>
			<div onClick={(e) => e.stopPropagation()}>
				<div className={styles.backdrop}></div>
				<div>
					<div className={styles.content}>
						{customClass === 'loginModalPage' && (
							<button className={styles.close} onClick={() => router.back()}>
								<IoIosArrowDropleft />
								Back
							</button>
						)}
						<div className={styles.links}>
							<Link href='#'>Sign up</Link>
							<Link href='/login'>Log In</Link>
						</div>
						<div className={styles.containerForm}>
							<p>We love having you back</p>
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
											{isValidEmail === null ? null : isValidEmail ? (
												<IoIosCheckmarkCircle className={styles.iconSuccess} />
											) : (
												<IoIosAlert className={styles.iconAlert} />
											)}
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
											<span onClick={togglePasswordVisibility}>
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
						<p>
							🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and
							let the cinematic adventure begin!
						</p>
						<img src='/login-yellow-hoodie-character.png' alt='Yellow hoodie character' />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Login
