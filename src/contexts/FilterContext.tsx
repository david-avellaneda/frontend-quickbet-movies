'use client'

import { initialMovieListResponse } from '@/helpers/fetchMovieDetails'
import { MovieListResponse } from '@/interfaces/movies'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

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
		</FilterContext.Provider>
	)
}
