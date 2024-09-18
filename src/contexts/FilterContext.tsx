'use client'

import { fetchMovieDetails, initialMovieListResponse } from '@/helpers/fetchMovieDetails'
import { MovieListResponse } from '@/interfaces/movies'
import {
	createContext,
	Dispatch,
	ReactNode,
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from 'react'

interface FilterContextType {
	searchMovie: string
	setSearchMovie: Dispatch<SetStateAction<string>>
	selectedGenre: number
	setSelectedGenre: Dispatch<SetStateAction<number>>
	movies: MovieListResponse
	setMovies: Dispatch<SetStateAction<MovieListResponse>>
	page: number
	setPage: Dispatch<SetStateAction<number>>
}

const FilterContext = createContext<FilterContextType>({
	searchMovie: '',
	setSearchMovie: () => {},
	selectedGenre: 0,
	setSelectedGenre: () => {},
	movies: initialMovieListResponse,
	setMovies: () => {},
	page: 1,
	setPage: () => {}
})

export default FilterContext

export const FilterProvider = ({
	children
}: Readonly<{
	children: ReactNode
}>) => {
	const [searchMovie, setSearchMovie] = useState('')
	const [selectedGenre, setSelectedGenre] = useState(0)
	const [movies, setMovies] = useState(initialMovieListResponse)
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
							setPage((prevPage) => prevPage + 1)
							setMovies({
								...newMovies,
								results: [...movies.results, ...newMovies.results]
							})
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
								setMovies({
									...newMovies,
									results: [...movies.results, ...filteredMovies]
								})
							} else {
								setMovies({
									...newMovies,
									results: [...movies.results, ...newMovies.results]
								})
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
	}, [searchMovie, selectedGenre, movies, setMovies, page, setPage])

	return (
		<FilterContext.Provider
			value={{
				searchMovie,
				setSearchMovie,
				selectedGenre,
				setSelectedGenre,
				movies,
				setMovies,
				page,
				setPage
			}}
		>
			{children}
			{(searchMovie.trim() !== '' || selectedGenre !== 0) && <div ref={divRef}></div>}
		</FilterContext.Provider>
	)
}
