'use client'

import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
import ImageUploader from '../ImageUploader'

interface MovieRecommendationProps {
	poster_path: string
	id: string
	title: string
}

const MovieRecommendation = ({ poster_path, id, title }: MovieRecommendationProps) => {
	const handleClick = (): void => {
		document.documentElement.classList.add('no-transition')
		setTimeout(() => document.documentElement.classList.remove('no-transition'), 200)
	}

	return (
		<div className={styles.container}>
			<Link href={`/movie/${id}`} className={styles.container_img} onClick={handleClick}>
				{poster_path === null && (
					<Image
						src='/photos-bro.svg'
						alt='No image available'
						width={200}
						height={225}
						className={styles.no_img}
					/>
				)}
				{poster_path !== null && <ImageUploader size='w342' path={poster_path} alt={title} />}
				<div>
					<p>{title}</p>
				</div>
			</Link>
		</div>
	)
}

export default MovieRecommendation
