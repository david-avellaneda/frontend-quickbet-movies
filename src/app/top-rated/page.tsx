import CategoryPage from '@/components/CategoryPage'

export default function TopRatedPage(): JSX.Element {
	return <CategoryPage title='Top rated movies' endpoint='movie/top_rated' />
}
