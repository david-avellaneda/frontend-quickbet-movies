'use client'

import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { CiCircleAlert } from 'react-icons/ci'

interface MovieRecommendationProps {
	poster_path: string
	id: string
	title: string
}

const MovieRecommendation = ({ poster_path, id, title }: MovieRecommendationProps) => {
	const [imgError, setImgError] = useState(false)

	const handleClick = (): void => {
		document.documentElement.classList.add('no-transition')
		setTimeout(() => document.documentElement.classList.remove('no-transition'), 100)
	}

	return (
		<div className={styles.container}>
			<Link href={`/movie/${id}`} className={styles.container_img} onClick={handleClick}>
				{imgError && <CiCircleAlert />}
				{poster_path === null && (
					<Image
						src='/photos-bro.svg'
						alt='No image available'
						width={200}
						height={225}
						className={styles.no_img}
					/>
				)}
				{!imgError && poster_path !== null && (
					<Image
						src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
						alt={`${title}`}
						width={200}
						height={225}
						onError={() => setImgError(true)}
					/>
				)}
				<div>
					<p>{title}</p>
				</div>
			</Link>
		</div>
	)
}

export default MovieRecommendation
