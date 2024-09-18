'use client'

import { MovieDetails } from '@/interfaces/movies'
import MovieCard from '../MovieCard'
import styles from './index.module.css'
import { useContext } from 'react'
import FilterContext from '@/contexts/FilterContext'
import { formatDate } from '@/helpers/formatDate'

const MovieList = ({ title = 'Search results' }: { title?: string }) => {
	const { searchMovie, selectedGenre, movies } = useContext(FilterContext)

	const uniqueMovies: MovieDetails[] = Array.from(
		new Set(movies.results.map((movie) => movie.id))
	).map((id) => {
		const movie = movies.results.find((m) => m.id === id)!
		return {
			...movie,
			release_date: formatDate(movie.release_date)
		}
	})

	return (
		<>
			{searchMovie.trim() !== '' || selectedGenre !== 0 ? (
				<div className={styles.container}>
					<h2>{title}</h2>
					<div className={styles.movies}>
						{!movies.err &&
							uniqueMovies.map((movie: MovieDetails) => <MovieCard key={movie.id} movie={movie} />)}
						{!movies.err && movies.results.length === 0 && (
							<p className={styles.notFound}>{`No results found for the movie "${searchMovie}"`}</p>
						)}
						{movies?.err && <p className='error'>{movies.err_msg}</p>}
					</div>
					<div></div>
				</div>
			) : null}
		</>
	)
}

export default MovieList
