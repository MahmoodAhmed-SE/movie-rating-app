import { useRouter } from 'next/navigation';
import styles from './search_content.module.css';
import SearchItem from './search-item/search_item';
import { Result } from './dto';

type Props = {
	results: Result[]
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