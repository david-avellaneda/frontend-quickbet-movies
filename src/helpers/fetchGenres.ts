import { GenreResponse } from '@/interfaces/genres'
import { TMDB_API_OPTIONS } from './fetchMovieDetails'

const initialGenres: GenreResponse = {
	genres: [
		{
			id: 0,
			name: 'No genre selected'
		}
	]
}

const fetchGenresMovie = async (): Promise<GenreResponse> => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/genre/movie/list?language=en`,
			TMDB_API_OPTIONS
		)

		if (!res.ok) throw new Error('There was an error retrieving the data')

		const data: GenreResponse = await res.json()
		return data
	} catch (error) {
		return { ...initialGenres, err: true, err_msg: `${error}` }
	}
}

export { initialGenres, fetchGenresMovie }
