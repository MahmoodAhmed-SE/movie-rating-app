import { useRouter } from 'next/navigation';
import styles from './search_content.module.css';
import SearchItem from './search-item/search_item';

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
				results.map((watchItem: Result) => <SearchItem watchItem={watchItem} key={watchItem.id} />)
			}
		</div>
	);
}