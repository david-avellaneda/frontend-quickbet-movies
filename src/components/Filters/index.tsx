import SearchInput from '../SearchInput'
import SelectGenre from '../SelectGenre'
import styles from './index.module.css'

const Filters = (): JSX.Element => {
	return (
		<section className={styles.container}>
			<SearchInput />
			<SelectGenre />
		</section>
	)
}

export default Filters
