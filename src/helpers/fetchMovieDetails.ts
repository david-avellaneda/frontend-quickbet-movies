import { MovieListResponse } from '@/interfaces/movies'

const TMDB_API_OPTIONS = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY_TMDB
	}
}

const initialMovieListResponse: MovieListResponse = {
	page: 1,
	results: [],
	total_pages: 0,
	total_results: 0
}

const fetchMovieDetails = async (endpoint: string): Promise<MovieListResponse> => {
	try {
		const res = await fetch(`https://api.themoviedb.org/3/${endpoint}`, TMDB_API_OPTIONS)

		if (!res.ok) throw new Error('There was an error retrieving the data')

		const data: MovieListResponse = await res.json()
		return data
	} catch (error) {
		return { ...initialMovieListResponse, err: true, err_msg: `${error}` }
	}
}

export { TMDB_API_OPTIONS, initialMovieListResponse, fetchMovieDetails }
