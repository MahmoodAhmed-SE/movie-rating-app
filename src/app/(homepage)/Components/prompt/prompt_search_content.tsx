import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SearchList from '../search-content/search-list/search_list';
import NoActionSearchContent from '../search-content/no-action/no_action_search_content';
import ErrorOccured from '../search-content/errors/error_occured';
import { Result } from '../search-content/search-list/dto';

type Props = {
    promptStatus: string,
    results: Result[],
}

export default function PromptSearchContent({ promptStatus, results }: Props) {
    switch (promptStatus) {
        case "no-action":
            return <NoActionSearchContent />
        case "success":
            return <SearchList results={results} />
        case "failed":
            return <ErrorOccured />
        case "pending":
            return <Skeleton
                className="w-full h-full"
                baseColor="black"
                highlightColor="#333333"
            />
    }

    return <div>Error occured!</div>;
}