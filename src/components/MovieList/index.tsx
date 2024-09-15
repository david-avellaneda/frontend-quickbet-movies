'use client'

import { MovieDetails } from '@/interfaces/movies'
import MovieCard from '../MovieCard'
import styles from './index.module.css'
import { useContext } from 'react'
import FilterContext from '@/contexts/FilterContext'

const MovieList = ({ title = 'Search results' }: { title?: string }) => {
	const { searchMovie, movies } = useContext(FilterContext)

	return (
		<>
			<div className={styles.container} id='movie_list'>
				<h2>{title}</h2>
				<div className={styles.movies}>
					{movies?.results.map((movie: MovieDetails) => <MovieCard key={movie.id} movie={movie} />)}
					{!movies.err && movies.results.length === 0 && (
						<p className={styles.notFound}>{`No results found for the movie "${searchMovie}"`}</p>
					)}
					{movies?.err && <p className={styles.error}>{movies.err_msg}</p>}
				</div>
			</div>
		</>
	)
}

export default MovieList
