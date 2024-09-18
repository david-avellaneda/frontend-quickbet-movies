'use client'

import Image from 'next/image'
import CircleProgress from '../CircleProgress'
import { MovieDetails } from '@/interfaces/movies'
import styles from './index.module.css'
import Link from 'next/link'
import FavoriteBtn from '../FavoriteBtn'
import { CiCircleAlert } from 'react-icons/ci'
import { useState } from 'react'

const MovieCard = ({ movie }: { movie: MovieDetails }): JSX.Element => {
	const { id, title, release_date, vote_average, poster_path } = movie
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
				{poster_path !== null && (
					<Image
						src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
						alt={`${title}`}
						width={200}
						height={225}
						onError={() => setImgError(true)}
					/>
				)}
			</Link>
			<div className={styles.details}>
				<h3>{title}</h3>
				<p>{release_date}</p>
				<div className={styles.elements}>
					<div className={styles.rating}>
						<p>Rating</p>
						<CircleProgress percentage={Math.round((vote_average / 10) * 100)} />
					</div>
					<div className={styles.heart}>
						<p>Favorites</p>
						<FavoriteBtn />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MovieCard
