'use client'

import { MovieDetails, MovieListResponse } from '@/interfaces/movies'
import MovieCard from '../MovieCard'
import styles from './index.module.css'
import { RefObject, useContext, useEffect, useRef, useState } from 'react'
import { fetchMovieDetails } from '@/helpers/fetchMovieDetails'
import FilterContext from '@/contexts/FilterContext'

const MovieList = () => {
	const { searchMovie, selectedGenre, movies, setMovies } = useContext(FilterContext)

	const [page, setPage] = useState(1)

	const divRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const initialMoviesElement = document.getElementById('initial_movies')
		if (initialMoviesElement) {
			if (searchMovie.trim() === '' && selectedGenre === 0) {
				initialMoviesElement.style.display = 'flex'
				initialMoviesElement.style.visibility = 'visible'
			} else {
				initialMoviesElement.style.display = 'none'
				initialMoviesElement.style.visibility = 'hidden'
			}
		}

		const observer = new IntersectionObserver(
			async (entries) => {
				if (!movies.err && entries[0].isIntersecting) {
					if (searchMovie.trim() === '' && selectedGenre !== 0) {
						if (page <= 20) {
							const newMovies = await fetchMovieDetails(
								`discover/movie?with_genres=${selectedGenre}&page=${page}`
							)
							const combinedMovies: MovieListResponse = {
								...newMovies,
								results: [
									...movies.results,
									...newMovies.results.filter(
										(newMovie) =>
											!movies.results.some((existingMovie) => existingMovie.id === newMovie.id)
									)
								]
							}
							setPage((prevPage) => prevPage + 1)
							setMovies(combinedMovies)
						}
					}
					if (searchMovie.trim() !== '') {
						const nextPage = movies.page + 1
						if (nextPage <= 3) {
							const newMovies = await fetchMovieDetails(
								`search/movie?query=${searchMovie.toLowerCase().trim()}&page=${nextPage}`
							)
							if (selectedGenre !== 0) {
								const filteredMovies = newMovies.results.filter(
									(movie) => movie.genre_ids && movie.genre_ids.includes(selectedGenre)
								)

								const combinedMovies = [
									...movies.results,
									...filteredMovies.filter(
										(newMovie) =>
											!movies.results.some((existingMovie) => existingMovie.id === newMovie.id)
									)
								]

								const moviesFilteredGyGenre: MovieListResponse = {
									...newMovies,
									results: combinedMovies
								}
								setMovies(moviesFilteredGyGenre)
							} else {
								const combinedMovies: MovieListResponse = {
									...newMovies,
									results: [...movies.results, ...newMovies.results]
								}
								setMovies(combinedMovies)
							}
						}
					}
				}
			},
			{ rootMargin: '300px' }
		)

		const observeElement = (ref: RefObject<HTMLElement>) => {
			if (ref.current) observer.observe(ref.current)

			return () => {
				if (ref.current) observer.unobserve(ref.current)
			}
		}

		if (searchMovie.trim() === '' && selectedGenre !== 0 && movies.page <= 20) {
			return observeElement(divRef)
		} else if (searchMovie.trim() !== '' && selectedGenre === 0 && movies.page <= 3) {
			return observeElement(divRef)
		} else if (searchMovie.trim() !== '' && selectedGenre !== 0 && movies.page <= 3) {
			return observeElement(divRef)
		}
	}, [searchMovie, selectedGenre, movies, setMovies, page])

	return (
		<>
			{searchMovie.trim() !== '' || selectedGenre !== 0 ? (
				<div className={styles.container}>
					<h2>Search results</h2>
					<div
						className={`${styles.movies} ${searchMovie.trim() !== '' ? styles.moviesFiltered : ''} ${movies.err || movies.results.length === 0 ? styles.moviesError : ''}`}
					>
						{movies?.results.map((movie: MovieDetails) => (
							<MovieCard key={movie.id} movie={movie} />
						))}
						{!movies.err && movies.results.length === 0 && (
							<p className={styles.notFound}>{`No results found for the movie "${searchMovie}"`}</p>
						)}
						{movies?.err && <p className={styles.error}>{movies.err_msg}</p>}
					</div>
					<div ref={divRef}></div>
				</div>
			) : null}
		</>
	)
}

export default MovieList
