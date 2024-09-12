import Filters from '@/components/Filters'
import Movies from '@/components/Movies'
import PromotionalBanner from '@/components/PromotionalBanner'
import { FilterProvider } from '@/contexts/FilterContext'

export default function Home(): JSX.Element {
	return (
		<main style={{ paddingBlockEnd: '4rem' }}>
			<PromotionalBanner />
			<FilterProvider>
				<Filters />
				<Movies />
			</FilterProvider>
		</main>
	)
}
