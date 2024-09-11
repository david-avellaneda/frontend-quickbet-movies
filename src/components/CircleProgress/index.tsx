'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './index.module.css'

const CircleProgress = ({ percentage }: { percentage: number }): JSX.Element => {
	const [valuePercentage, setValuePercentage] = useState(0)
	const circleRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							setValuePercentage(percentage)
						}, 500)
						observer.disconnect()
					}
				})
			},
			{ threshold: 1 }
		)

		const currentRef = circleRef.current

		if (currentRef) observer.observe(currentRef)

		return () => {
			if (currentRef) observer.unobserve(currentRef)
		}
	}, [percentage])

	const getColor = (percentage: number): string => {
		if (percentage <= 40) return '#E54545'
		if (percentage <= 75) return '#FF8800'
		return '#4DA14F'
	}

	return (
		<div className={styles.circle_container} ref={circleRef}>
			<svg className={styles.circle} width='80' height='80' viewBox='0 0 36 36'>
				<path
					className={styles.circle_bg}
					d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
					style={{ stroke: getColor(percentage) }}
				/>
				<path
					className={styles.circle_progress}
					strokeDasharray={`${valuePercentage}, 100`}
					d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
					style={{ stroke: getColor(percentage) }}
				/>
			</svg>
			<p>{percentage}%</p>
		</div>
	)
}

export default CircleProgress
