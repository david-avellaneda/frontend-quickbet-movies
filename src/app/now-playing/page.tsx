import CategoryPage from '@/components/CategoryPage'

export default function NowPlayingPage(): JSX.Element {
	return <CategoryPage title='Now playing movies' endpoint='movie/now_playing' />
}
