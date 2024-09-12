interface Genre {
	id: number
	name: string
}

interface GenreResponse {
	genres: Genre[]
	err?: boolean
	err_msg?: string
}

export type { Genre, GenreResponse }
