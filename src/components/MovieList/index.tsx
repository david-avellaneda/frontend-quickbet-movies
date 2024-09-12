'use client'

import { MovieDetails, MovieListProps, MovieListResponse } from '@/interfaces/movies'
import MovieCard from '../MovieCard'
import styles from './index.module.css'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { fetchMovieDetails, initialMovieListResponse } from '@/helpers/fetchMovieDetails'
import FilterContext from '@/contexts/FilterContext'

const MovieList = ({
	title,
	classname,
	pageLink,
	endpoint,
	movies
}: MovieListProps): JSX.Element => {
	const [initialMovies, setInitialMovies] = useState<MovieListResponse>(initialMovieListResponse)

	const { searchMovie } = useContext(FilterContext)

	useEffect(() => {
		const fetchMovies = async (): Promise<void> => {
			const movies = await fetchMovieDetails(`${endpoint}`)
			setInitialMovies(movies)
		}

		if (endpoint) fetchMovies()
	}, [endpoint])

	const { results, err, err_msg }: MovieListResponse = initialMovies

	return (
		<div className={`${styles.container} ${styles[classname]}`}>
			<h2>{pageLink ? <Link href={pageLink}>{title}</Link> : <>{title}</>}</h2>
			<div className={styles.movies}>
				{/* Initial movies */}
				{results?.slice(0, 15).map((result, index) => <MovieCard key={index} movie={result} />)}
				{results?.length > 0 && pageLink && (
					<div className={styles.view_more}>
						<p>See more movies in this category</p>
						<Link href={`/${pageLink}`}>Go</Link>
					</div>
				)}
				{/* Input and select results */}
				{movies?.results.map((movie: MovieDetails) => <MovieCard key={movie.id} movie={movie} />)}
				{err && <p className={styles.error}>{`${err_msg}`}</p>}
				{movies?.err && (
					<p className={styles.error} style={{ textAlign: 'center' }}>{`${movies.err_msg}`}</p>
				)}
				{movies?.results && movies.results.length === 0 && (
					<p className={styles.not_found}>{`No results found for the movie "${searchMovie}"`}</p>
				)}
			</div>
		</div>
	)
}

export default MovieList
