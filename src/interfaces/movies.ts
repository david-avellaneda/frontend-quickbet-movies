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
	release_date: string
	vote_average: number
	poster_path: string
	genre_ids?: number[]
}

export type { MovieListResponse, MovieDetails }
