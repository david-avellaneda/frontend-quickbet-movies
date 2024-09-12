'use client'

import { useContext, useEffect, useRef } from 'react'
import MovieList from '../MovieList'
import styles from './index.module.css'
import FilterContext from '@/contexts/FilterContext'
import { fetchMovieDetails } from '@/helpers/fetchMovieDetails'
import { MovieListResponse } from '@/interfaces/movies'

const Movies = (): JSX.Element => {
	const { searchMovie, selectedGenre, movies, setMovies } = useContext(FilterContext)
	const inputMoviesRef = useRef<HTMLInputElement | null>(null)
	const genreMoviesRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			async (entries) => {
				if (
					entries[0].isIntersecting &&
					!movies.err &&
					searchMovie.trim() === '' &&
					selectedGenre !== 0
				) {
					const nextPage = movies.page + 1
					if (nextPage <= 50) {
						const newMovies = await fetchMovieDetails(
							`discover/movie?with_genres=${selectedGenre}&page=${nextPage}`
						)
						const combinedMovies: MovieListResponse = {
							...newMovies,
							results: [...movies.results, ...newMovies.results]
						}
						setMovies(combinedMovies)
					}
				}
				if (
					entries[0].isIntersecting &&
					!movies.err &&
					searchMovie.trim() !== '' &&
					selectedGenre === 0
				) {
					const nextPage = movies.page + 1
					if (nextPage <= 2) {
						const newMovies = await fetchMovieDetails(
							`search/movie?query=${searchMovie.toLowerCase().trim()}&page=${nextPage}`
						)
						const combinedMovies: MovieListResponse = {
							...newMovies,
							results: [...movies.results, ...newMovies.results]
						}
						setMovies(combinedMovies)
					}
				}
				if (
					entries[0].isIntersecting &&
					!movies.err &&
					searchMovie.trim() !== '' &&
					selectedGenre !== 0
				) {
					const nextPage = movies.page + 1

					if (nextPage <= 2) {
						const newMovies = await fetchMovieDetails(
							`search/movie?query=${searchMovie.toLowerCase().trim()}&page=${nextPage}`
						)

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
					}
				}
			},
			{ rootMargin: '50px' }
		)

		if (searchMovie.trim() === '' && selectedGenre !== 0) {
			const currentRef = genreMoviesRef.current

			if (currentRef) {
				observer.observe(currentRef)
			}

			return () => {
				if (currentRef) {
					observer.unobserve(currentRef)
				}
			}
		}

		if (searchMovie.trim() !== '' && selectedGenre === 0) {
			const currentRef = inputMoviesRef.current

			if (currentRef) {
				observer.observe(currentRef)
			}

			return () => {
				if (currentRef) {
					observer.unobserve(currentRef)
				}
			}
		}
		if (searchMovie.trim() !== '' && selectedGenre !== 0) {
			const currentRef = inputMoviesRef.current

			if (currentRef) {
				observer.observe(currentRef)
			}

			return () => {
				if (currentRef) {
					observer.unobserve(currentRef)
				}
			}
		}
	}, [searchMovie, selectedGenre, movies, setMovies])

	return (
		<section className={`section ${styles.container}`}>
			{/* Initial movies */}
			{searchMovie.trim() === '' && selectedGenre === 0 && (
				<>
					<MovieList
						title='Popular'
						classname='scroll_x'
						pageLink='popular'
						endpoint='movie/popular?language=en-US&page=1'
					/>
					<MovieList
						title='Top Rated'
						classname='scroll_x'
						pageLink='top-rated'
						endpoint='movie/top_rated?language=en-US&page=1'
					/>
					<MovieList
						title='Now Paying'
						classname='scroll_x'
						pageLink='now-playing'
						endpoint='movie/now_playing?language=en-US&page=1'
					/>
					<MovieList
						title='Upcoming'
						classname='scroll_x'
						pageLink='upcoming'
						endpoint='movie/upcoming?language=en-US&page=1'
					/>
				</>
			)}
			{/* Input*/}
			{searchMovie.trim() !== '' && selectedGenre === 0 && (
				<>
					<MovieList title='Search results' classname='scroll_y' movies={movies} />
					<div ref={inputMoviesRef}></div>
				</>
			)}
			{/* Select */}
			{searchMovie.trim() === '' && selectedGenre !== 0 && (
				<>
					<MovieList title='Search results' classname='scroll_y' movies={movies} />
					<div ref={genreMoviesRef}></div>
				</>
			)}
			{/* Combined input and selects  */}
			{searchMovie.trim() !== '' && selectedGenre !== 0 && (
				<>
					<MovieList title='Search results' classname='scroll_y' movies={movies} />
					<div ref={inputMoviesRef}></div>
				</>
			)}
		</section>
	)
}

export default Movies
