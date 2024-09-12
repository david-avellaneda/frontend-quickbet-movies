'use client'

import { IoSearchOutline } from 'react-icons/io5'
import styles from './index.module.css'
import { useContext, useEffect } from 'react'
import FilterContext from '@/contexts/FilterContext'
import { fetchMovieDetails, initialMovieListResponse } from '@/helpers/fetchMovieDetails'
import { MovieListResponse } from '@/interfaces/movies'

const SearchInput = (): JSX.Element => {
	const { searchMovie, setSearchMovie, selectedGenre, setMovies, page } = useContext(FilterContext)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const movie = event.target.value.replace(/\s+/g, ' ')
		setSearchMovie(movie)
	}

	useEffect(() => {
		const fetchMovies = async () => {
			const movies = await fetchMovieDetails(
				`search/movie?query=${searchMovie.toLowerCase().trim()}&page=${page}`
			)
			if (searchMovie.trim() !== '' && selectedGenre === 0) {
				setMovies(movies)
			}
			if (searchMovie.trim() !== '' && selectedGenre !== 0) {
				const filteredMovies =
					searchMovie.trim() !== '' &&
					selectedGenre !== 0 &&
					movies.results.filter(
						(movie) => movie.genre_ids && movie.genre_ids.includes(selectedGenre)
					)
				const moviesFilteredGyGenre: MovieListResponse = {
					...initialMovieListResponse,
					results: filteredMovies || []
				}
				setMovies(moviesFilteredGyGenre)
			}
		}

		fetchMovies()
	}, [searchMovie, selectedGenre, setMovies, page])

	return (
		<div className={styles.container}>
			<label htmlFor='search'>Search</label>
			<div className={styles.container_input}>
				<input
					type='text'
					name='search'
					id='search'
					placeholder='Keywords'
					autoComplete='off'
					value={searchMovie}
					onChange={handleChange}
				/>
				<IoSearchOutline />
			</div>
		</div>
	)
}

export default SearchInput
