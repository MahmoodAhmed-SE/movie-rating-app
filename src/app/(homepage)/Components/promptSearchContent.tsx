import { Result } from '../../../models/prompts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SearchList from './searchList';
import styles from '../homepage.module.css';
import NoActionSearchContent from './searchContent/noActionSearchContent';

type Props = {
    promptStatus: string,
    results: Result[],
}

export default function PromptSearchContent({ promptStatus, results }: Props) {
    let promptSearchContent;
    switch (promptStatus) {
        case "no-action":
            promptSearchContent = <NoActionSearchContent />
            break;
        case "success":
            promptSearchContent = <div className={styles.prompt_search_result_container}>
                <SearchList results={results} />
            </div>
            break;
        case "failed":
            break;
        case "pending":
            promptSearchContent = <Skeleton
                className="w-full h-full"
                baseColor="black"
                highlightColor="#333333"
            />
            break;
    }

    if (!promptSearchContent) return <div>Error occured!</div>;

    return promptSearchContent;
}