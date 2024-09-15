import Filters from '@/components/Filters'
import InitialMovies from '@/components/InitialMovies'
import PromotionalBanner from '@/components/PromotionalBanner'
import { FilterProvider } from '@/contexts/FilterContext'
import styles from './page.module.css'
import MovieList from '@/components/MovieList'

export default function Home() {
	return (
		<main>
			<PromotionalBanner />
			<div className={styles.container}>
				<FilterProvider>
					<Filters />
					<MovieList />
				</FilterProvider>
				<section className={`${styles.initialMovies}`} id='initial_movies'>
					<InitialMovies title='Popular' pageLink='popular' endpoint='movie/popular' />
					<InitialMovies title='Top Rated' pageLink='top-rated' endpoint='movie/top_rated' />
					<InitialMovies title='Now Playing' pageLink='now-playing' endpoint='movie/now_playing' />
					<InitialMovies title='Upcoming' pageLink='upcoming' endpoint='movie/upcoming' />
				</section>
			</div>
		</main>
	)
}
