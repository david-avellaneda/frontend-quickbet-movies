import CategoryPage from '@/components/CategoryPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Now Playing Movies - Quickbet Movies',
	description:
		'Discover the newest releases hitting theaters now on Quickbet Movies. Stay updated with the latest in cinema!'
}

export default function NowPlayingPage(): JSX.Element {
	return <CategoryPage title='Now playing movies' endpoint='movie/now_playing' />
}
