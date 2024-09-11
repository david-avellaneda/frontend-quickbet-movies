import CircleProgress from '../CircleProgress'
import styles from './index.module.css'
import FavoriteBtn from '../FavoriteBtn'

const PromotionalBanner = (): JSX.Element => {
	return (
		<section className={styles.container}>
			<div className={styles.info}>
				<div className={styles.description}>
					<h1>Kung Fu Panda 4</h1>
					<p>
						Join Po and the Furious Five on a new epic adventure! Discover the power of friendship
						and the strength within! Get ready to unleash your inner warrior! 🥋✨
					</p>
				</div>
				<div className={styles.details}>
					<FavoriteBtn />
					<CircleProgress percentage={97} />
				</div>
			</div>
		</section>
	)
}

export default PromotionalBanner
