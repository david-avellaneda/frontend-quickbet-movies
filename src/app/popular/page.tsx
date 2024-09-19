import CategoryPage from '@/components/CategoryPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Popular Movies - Quickbet Movies',
	description:
		'Explore the most popular movies trending right now on Quickbet Movies. Your entertainment, your choice!'
}

export default function PopularPage(): JSX.Element {
	return <CategoryPage title='Popular movies' endpoint='movie/popular' />
}
