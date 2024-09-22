import Login from '@/components/Login'
import styles from './page.module.css'

export default function LoginPage() {
	return (
		<main className={styles.container}>
			<Login customClass='loginPage' />
		</main>
	)
}
