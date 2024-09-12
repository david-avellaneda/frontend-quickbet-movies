'use client'

import { initialMovieListResponse } from '@/helpers/fetchMovieDetails'
import { MovieListResponse } from '@/interfaces/movies'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface FilterContextType {
	searchMovie: string
	setSearchMovie: Dispatch<SetStateAction<string>>
	selectedGenre: number
	setSelectedGenre: Dispatch<SetStateAction<number>>
	movies: MovieListResponse
	setMovies: Dispatch<SetStateAction<MovieListResponse>>
	page: number
}

const FilterContext = createContext<FilterContextType>({
	searchMovie: '',
	setSearchMovie: () => {},
	selectedGenre: 0,
	setSelectedGenre: () => {},
	movies: initialMovieListResponse,
	setMovies: () => {},
	page: 1
})

export default FilterContext

export const FilterProvider = ({
	children
}: Readonly<{
	children: React.ReactNode
}>): JSX.Element => {
	const [searchMovie, setSearchMovie] = useState('')
	const [selectedGenre, setSelectedGenre] = useState(0)
	const [movies, setMovies] = useState(initialMovieListResponse)

	const page = 1

	return (
		<FilterContext.Provider
			value={{
				searchMovie,
				setSearchMovie,
				selectedGenre,
				setSelectedGenre,
				movies,
				setMovies,
				page
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}
