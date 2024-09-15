'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import styles from './index.module.css'
import { fetchMovieDetails } from '@/helpers/fetchMovieDetails'
import FilterContext from '@/contexts/FilterContext'
import { Genre, GenreResponse } from '@/interfaces/genres'
import { fetchGenresMovie, initialGenres } from '@/helpers/fetchGenres'

const SelectGenre = (): JSX.Element => {
	const [genres, setGenres] = useState<Genre[]>(initialGenres.genres)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const selectRef = useRef<HTMLDivElement>(null)

	const { searchMovie, selectedGenre, setSelectedGenre, setMovies } = useContext(FilterContext)

	const handleSelect = (id: number): void => {
		setSelectedGenre(id)
		setIsOpen(false)
	}

	useEffect(() => {
		const fetchMovies = async () => {
			const movies = await fetchMovieDetails(`discover/movie?with_genres=${selectedGenre}&page=1`)
			setMovies(movies)
		}

		searchMovie === '' && selectedGenre !== 0 && !isOpen && fetchMovies()
	}, [searchMovie, selectedGenre, setMovies, isOpen])

	useEffect(() => {
		const fetchgenres = async (): Promise<void> => {
			const res: GenreResponse = await fetchGenresMovie()
			if (res.err) {
				setGenres(initialGenres.genres)
			} else {
				const sortedGenres = res.genres.sort((a, b) => a.name.localeCompare(b.name))
				setGenres([...initialGenres.genres, ...sortedGenres])
			}
		}
		fetchgenres()

		const handleClickOutside = (event: MouseEvent): void => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) setIsOpen(false)
		}
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className={styles.container}>
			<label htmlFor='genre'>Genres</label>
			<div className={styles.custom_select} ref={selectRef}>
				<div
					className={styles.selected_option}
					onClick={() => setIsOpen(!isOpen)}
					data-selected={selectedGenre}
				>
					{genres.find((genre) => genre.id === selectedGenre)?.name}
					<IoIosArrowDown />
				</div>
				{isOpen && (
					<div className={styles.options}>
						{genres.map((genre) => (
							<div key={genre.id} className={styles.option} onClick={() => handleSelect(genre.id)}>
								{genre.name}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default SelectGenre
