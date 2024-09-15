import { MovieListResponse } from '@/interfaces/movies'
import { initialMovieListResponse, TMDB_API_OPTIONS } from './fetchMovieDetails'

const fetchData_ISR = async (endpoint: string): Promise<MovieListResponse> => {
	try {
		const res = await fetch(`https://api.themoviedb.org/3/${endpoint}`, {
			...TMDB_API_OPTIONS,
			next: { revalidate: 172800 } // 48 hours
		})

		if (!res.ok) throw new Error('There was an error retrieving the data')

		const data: MovieListResponse = await res.json()
		return data
	} catch (error) {
		return { ...initialMovieListResponse, err: true, err_msg: `${error}` }
	}
}

export default fetchData_ISR
