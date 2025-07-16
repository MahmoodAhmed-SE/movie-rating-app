import styles from '../homepage.module.css';

type Props = {
	results: Result[]
}

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

export default function SearchList({ results }: Props) {

	return (
		<div className={styles.prompt_search_result_container}>
			{
				results.map((watchItem: Result) => {
					return (
						<div className={styles.prompt_search_result_item} key={watchItem.id}>
							<div>id:{watchItem.id}</div>
							<div>title:{watchItem.title}</div>
							<div>year:{watchItem.year_made}</div>
						</div>
					);
				})
			}
		</div>
	);
}