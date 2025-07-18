import { useRouter } from 'next/navigation';
import styles from './searchContent.module.css';

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
	const router = useRouter();

	const redirectToMoviePage = (id: string) => {
		router.push("/movie/" + id)
	}


	return (
		<div className={styles.prompt_search_result_container}>
			{
				results.map((watchItem: Result) => {
					return (
						<div className={styles.prompt_search_result_item} key={watchItem.id} onClick={() => redirectToMoviePage(watchItem.id)}>
							<div className={styles.prompt_search_result_item_header}>
								<div className={styles.prompt_search_result_item_id}>
									#{watchItem.id}
								</div>
								<div className={styles.prompt_search_result_item_title}>
									{watchItem.title}
								</div>
							</div>
							<div className={styles.prompt_search_result_item_year}>
								Year: {new Date(watchItem.year_made).getFullYear()}
							</div>
						</div>
					);
				})
			}
		</div>
	);
}