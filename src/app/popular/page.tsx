import CategoryPage from '@/components/CategoryPage'

export default function PopularPage(): JSX.Element {
	return <CategoryPage title='Popular movies' endpoint='movie/popular' />
}
