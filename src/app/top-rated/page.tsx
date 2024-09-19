import CategoryPage from '@/components/CategoryPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Top Rated Movies - Quickbet Movies',
	description:
		'Discover the highest-rated movies on Quickbet Movies. Your entertainment, your choice!'
}

export default function TopRatedPage(): JSX.Element {
	return <CategoryPage title='Top rated movies' endpoint='movie/top_rated' />
}
