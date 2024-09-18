import CircleProgress from '@/components/CircleProgress'
import FavoriteBtn from '@/components/FavoriteBtn'
import { err_msg, initialMovieListResponse, TMDB_API_OPTIONS } from '@/helpers/fetchMovieDetails'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import { CiPlay1 } from 'react-icons/ci'
import { formatDate } from '@/helpers/formatDate'
import MovieRecommendation from '@/components/MovieRecommendation'
import { MovieDetails, MovieListResponse } from '@/interfaces/movies'

interface MoviePageProps {
	params: {
		id: string
	}
}

interface MoviePageResponse {
	backdrop_path: string
	poster_path: string
	title: string
	release_date: string
	runtime: string
	overview: string
	vote_average: number
	genres: { id: number; name: string }[]
	err?: boolean
	err_msg?: string
}

interface MovieTrailer {
	id: number
	results: [{ key: string; name: string; site: string; type: string; size: number }]
}

const formatRuntime = (minutes: number): string => {
	const hours = Math.floor(minutes / 60)
	const remainingMinutes = minutes % 60
	return `${hours}h ${remainingMinutes}min`
}

// Incremental Static Regeneration (ISR)
const fetchMovieDetails = async (id: string) => {
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
			...TMDB_API_OPTIONS,
			next: { revalidate: 172800 } // 48 hours
		})

		if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

		let data: MoviePageResponse = await res.json()

		data = {
			...data,
			release_date: formatDate(data.release_date),
			runtime: formatRuntime(parseInt(data.runtime)),
			vote_average: Math.round((data.vote_average / 10) * 100)
		}

		return data
	} catch {
		return {
			backdrop_path: '',
			poster_path: '',
			title: '',
			release_date: '',
			runtime: '',
			overview: '',
			vote_average: 0,
			genres: [],
			err: true,
			err_msg
		}
	}
}

const fetchTrailer = async (id: string) => {
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, {
			...TMDB_API_OPTIONS,
			next: { revalidate: 172800 } // 48 hours
		})

		if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

		const data: MovieTrailer = await res.json()

		const trailer = data.results.find(
			(video) => video.type === 'Trailer' && video.site === 'YouTube'
		)

		if (trailer) {
			return { link: `https://www.youtube.com/watch?v=${trailer.key}` }
		} else {
			return { err: true, err_msg: '0' }
		}
	} catch {
		return { err: true, err_msg }
	}
}

const fetchRecommendations = async (id: string) => {
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
			...TMDB_API_OPTIONS,
			next: { revalidate: 172800 } // 48 hours
		})

		if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

		const data: MovieListResponse = await res.json()

		return { ...data, results: data.results.slice(0, 10) }
	} catch {
		return { ...initialMovieListResponse, err: true, err_msg }
	}
}

export default async function MoviePage({ params }: MoviePageProps) {
	const movie = await fetchMovieDetails(params.id)
	const trailer = await fetchTrailer(params.id)
	const recommendations = await fetchRecommendations(params.id)

	const {
		backdrop_path,
		poster_path,
		title,
		release_date,
		runtime,
		overview,
		vote_average,
		genres
	} = movie

	return (
		<main
			className={`${styles.container} ${!movie.err ? 'transparent_movie_page' : styles.notFound}`}
		>
			{!movie.err && (
				<>
					<section className={styles.containerDetails}>
						{backdrop_path !== null && (
							<>
								<Image
									src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
									alt={title}
									width={1300}
									height={731}
									className={styles.backdrop}
								/>
								<div className={styles.gradient}></div>
							</>
						)}
						<div className={styles.details}>
							<div className={styles.poster}>
								<div className={poster_path === null ? styles.noImg : ''}>
									{poster_path === null && (
										<Image
											src='/photos-bro.svg'
											alt='No image available'
											width={200}
											height={225}
										/>
									)}
									{poster_path !== null && (
										<Image
											src={`https://image.tmdb.org/t/p/w780/${poster_path}`}
											alt={title}
											width={300}
											height={500}
										/>
									)}
								</div>
								{trailer.link && (
									<Link href={trailer.link} target='_blank'>
										Official Trailer
										<CiPlay1 />
									</Link>
								)}
								{trailer.err && trailer.err_msg === '0' && <p>Trailer not found</p>}
								{trailer.err && trailer.err_msg !== '0' && <p>{trailer.err_msg}</p>}
							</div>
							<div className={styles.info}>
								<div className={styles.containerTitle}>
									<h1 className={styles.title}>{title}</h1>
									<div className={styles.date}>
										<p>{release_date}</p>
										<p>{runtime}</p>
									</div>
								</div>
								<div className={styles.overview}>
									<p>Overview:</p>
									<p>{overview}</p>
								</div>
								<div className={styles.score}>
									<div className={styles.percentage}>
										<CircleProgress percentage={vote_average} />
										<p>
											Users <br />
											Scrore
										</p>
									</div>
									<FavoriteBtn />
								</div>
								<div className={styles.genres}>
									{genres && genres.map((genre) => <div key={genre.id}>{genre.name}</div>)}
								</div>
							</div>
						</div>
					</section>
					<section className={styles.recommendations}>
						<h2>Recommendations</h2>
						<div>
							{!recommendations.err &&
								recommendations.results.length > 0 &&
								recommendations.results.map((e: MovieDetails) => (
									<MovieRecommendation
										key={e.id}
										poster_path={e.poster_path}
										id={`${e.id}`}
										title={e.title}
									/>
								))}
							{!recommendations.err && recommendations.results.length === 0 && (
								<p>Recommended movies not found</p>
							)}
						</div>
					</section>
				</>
			)}
			{movie.err && (
				<>
					<Image src='/film-rolls.svg' alt='Film rolls' width={500} height={586} />
					<p>Movie not found</p>
					<Link href='/'>Go to home</Link>
				</>
			)}
		</main>
	)
}
