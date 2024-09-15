interface MovieResponse {
	loading: boolean
	data: MovieListResponse
}

interface MovieError {
	error: boolean
	message: string
}

interface MovieListResponse {
	page: number
	results: MovieDetails[]
	total_pages: number
	total_results: number
	err?: boolean
	err_msg?: string
}

interface MovieDetails {
	id: number
	backdrop_path?: string
	title: string
	release_date: Date
	vote_average: number
	poster_path: string
	genre_ids?: number[]
}

export type { MovieResponse, MovieError, MovieListResponse, MovieDetails }
