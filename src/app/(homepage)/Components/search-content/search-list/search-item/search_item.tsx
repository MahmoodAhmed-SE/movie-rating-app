import styles from './search_item.module.css';

type Result = {
	id: string
	title: string
	plot: string
	transcript: string
	year_made: string
	authors: string
	directors: string
	actors: string
	genres: string
	languages: string
	runtime_minutes: string
	rating: string
	tags: string
	combination_embedding: string
	created_at: string
	updated_at: string
}


type Props = {
	watchItem: Result
}

export default function SearchItem({ watchItem }: Props) {
	return (
		<div className={styles.result_container} /*onClick={() => redirectToMoviePage(watchItem.id)}*/>
			<div className={styles.image_container}>
				<img src={`/api/movie-image/${watchItem.id}`} alt={`Poster image for movie ${watchItem.title}`} />
			</div>
			<div className={styles.content_container}>
				<h1 className={styles.title}>
					{watchItem.title}
				</h1>
				<div className={styles.movie_meta}>
					<h2 className={styles.year}>
						{new Date(watchItem.year_made).getFullYear()}
					</h2>
					<h3 className={styles.genres}>
						{watchItem.genres}Action, Drama, etc..
					</h3>

				</div>
				<p className={styles.overview}>
					{watchItem.plot}A polite and kind bear from Peru arrives in London and teaches everyone around him — even the cold-hearted more...
				</p>
				<button className={styles.details_cta} onClick={() => { }}>
					Details
				</button>
			</div>
		</div>
	);
}