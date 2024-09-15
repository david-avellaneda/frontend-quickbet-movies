import styles from './index.module.css'
import { MovieListResponse } from '@/interfaces/movies'
import Link from 'next/link'
import MovieCard from '../MovieCard'
import fetchData_ISR from '@/helpers/fetchData_ISR'

interface InitialMoviesProps {
	title: string
	pageLink: string
	endpoint: string
	classname?: string
	err?: boolean
	err_msg?: string
}

const InitialMovies = async ({ title, pageLink, endpoint }: InitialMoviesProps) => {
	const movies: MovieListResponse = await fetchData_ISR(endpoint)

	return (
		<div className={styles.container}>
			<h2>
				<Link href={pageLink}>{title}</Link>
			</h2>
			<div className={styles.movies}>
				{movies.results?.slice(0, 15).map((result) => <MovieCard key={result.id} movie={result} />)}
				{movies.results?.length > 0 && pageLink && (
					<div className={styles.view_more}>
						<p>See more movies in this category</p>
						<Link href={`/${pageLink}`}>Go</Link>
					</div>
				)}
				{movies?.err && <p className={styles.error}>{movies.err_msg}</p>}
			</div>
		</div>
	)
}

export default InitialMovies
