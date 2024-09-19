import CategoryPage from '@/components/CategoryPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Upcoming Movies - Quickbet Movies',
	description:
		'Stay ahead with Quickbet Movies. Discover and bet on upcoming movie releases. Your entertainment, your choice!'
}

export default function UpcomingPage(): JSX.Element {
	return <CategoryPage title='Upcoming movies' endpoint='movie/upcoming' />
}
