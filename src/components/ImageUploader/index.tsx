/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useRef, useState } from 'react'
import { CiCircleAlert } from 'react-icons/ci'
import styles from './index.module.css'

interface ImageUploaderProps {
	size: string
	path: string
	alt: string
}

const ImageUploader = ({ size, path, alt }: ImageUploaderProps) => {
	const [imageLoaded, setImageLoaded] = useState(false)
	const [downloadError, setDownloadError] = useState(false)

	const imgRef = useRef<HTMLImageElement | null>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target as HTMLImageElement
						img.src = img.dataset.src!
						observer.unobserve(img)
					}
				})
			},
			{ threshold: 0, rootMargin: '100px' }
		)

		const current = imgRef.current

		current && observer.observe(current)

		return () => {
			current && observer.unobserve(current)
		}
	}, [])

	return (
		<div className={styles.container}>
			<div
				className={`${styles.loader} ${imageLoaded || downloadError ? styles.loaded : ''}`}
			></div>
			{downloadError && <CiCircleAlert />}
			{!downloadError && (
				<img
					ref={imgRef}
					data-src={`https://image.tmdb.org/t/p/${size}${path}`}
					alt={alt}
					onError={() => setDownloadError(true)}
					onLoad={() => setImageLoaded(true)}
				/>
			)}
		</div>
	)
}

export default ImageUploader
