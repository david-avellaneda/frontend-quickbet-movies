const formatDate = (dateString: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}
	return new Date(dateString).toLocaleDateString('en-US', options)
}

export { formatDate }
