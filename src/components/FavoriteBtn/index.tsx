import { FaHeart } from 'react-icons/fa'
import styles from './index.module.css'

const FavoriteBtn = (): JSX.Element => {
	return (
		<button className={styles.btn}>
			<FaHeart />
		</button>
	)
}

export default FavoriteBtn
