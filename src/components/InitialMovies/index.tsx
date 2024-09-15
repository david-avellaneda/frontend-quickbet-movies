import styles from './index.module.css'
import { MovieListResponse } from '@/interfaces/movies'
import Link from 'next/link'
import MovieCard from '../MovieCard'
import { initialMovieListResponse, TMDB_API_OPTIONS } from '@/helpers/fetchMovieDetails'

interface InitialMoviesProps {
	title: string
	pageLink: string
	endpoint: string
	classname?: string
	err?: boolean
	err_msg?: string
}

const fetchMovies = async (endpoint: string): Promise<MovieListResponse> => {
	try {
		const res = await fetch(`https://api.themoviedb.org/3/${endpoint}`, {
			...TMDB_API_OPTIONS,
			next: { revalidate: 172800 } // 48 hours
		})

		if (!res.ok) throw new Error('There was an error retrieving the data')

		const data: MovieListResponse = await res.json()
		return data
	} catch (error) {
		return { ...initialMovieListResponse, err: true, err_msg: `${error}` }
	}
}

const InitialMovies = async ({ title, pageLink, endpoint }: InitialMoviesProps) => {
	const movies: MovieListResponse = await fetchMovies(endpoint)

	return (
		<div className={styles.container}>
			<h2>
				<Link href={pageLink}>{title}</Link>
			</h2>
			<div className={styles.movies}>
				{movies.results?.slice(0, 15).map((result) => <MovieCard key={result.id} movie={result} />)}
				{movies.results?.length > 0 && pageLink && (
					<div className={styles.view_more}>
						<p>See more movies in this category</p>
						<Link href={`/${pageLink}`}>Go</Link>
					</div>
				)}
				{movies?.err && <p className={styles.error}>{movies.err_msg}</p>}
			</div>
		</div>
	)
}

export default InitialMovies
