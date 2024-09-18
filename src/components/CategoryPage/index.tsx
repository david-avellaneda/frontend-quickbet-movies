import { MovieDetails, MovieListResponse } from '@/interfaces/movies'
import styles from './index.module.css'
import MovieCard from '../MovieCard'
import { err_msg, initialMovieListResponse, TMDB_API_OPTIONS } from '@/helpers/fetchMovieDetails'

interface CategoryPageProps {
	title: string
	endpoint: string
}

// Incremental Static Regeneration (ISR)
const fetchMovies = async (endpoint: string) => {
	const allResults: MovieDetails[] = []
	let combinedResponse: MovieListResponse = { ...initialMovieListResponse, results: [] }

	try {
		for (let page = 1; page <= 5; page++) {
			const res = await fetch(`https://api.themoviedb.org/3/${endpoint}?page=${page}`, {
				...TMDB_API_OPTIONS,
				next: { revalidate: 172800 } // 48 hours
			})

			if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

			const data: MovieListResponse = await res.json()
			allResults.push(...data.results)
		}
		const uniqueResults = allResults.filter(
			(newMovie, index, self) =>
				index === self.findIndex((existingMovie) => existingMovie.id === newMovie.id)
		)
		combinedResponse = { ...combinedResponse, results: uniqueResults }

		return combinedResponse
	} catch {
		return { ...initialMovieListResponse, err: true, err_msg }
	}
}

const CategoryPage = async ({ title, endpoint }: CategoryPageProps) => {
	const movies: MovieListResponse = await fetchMovies(endpoint)

	return (
		<main className={styles.container}>
			<h1>{title}</h1>
			<div className={styles.movies}>
				{movies?.results.map((movie: MovieDetails) => <MovieCard key={movie.id} movie={movie} />)}
				{movies?.err && <p className='error'>{movies.err_msg}</p>}
			</div>
		</main>
	)
}

export default CategoryPage
