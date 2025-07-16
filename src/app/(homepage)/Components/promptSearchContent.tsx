import { Result } from '../../../models/prompts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SearchList from './searchList';
import NoActionSearchContent from './searchContent/noActionSearchContent';

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
            return <div>Error occured!</div>
        case "pending":
            return <Skeleton
                className="w-full h-full"
                baseColor="black"
                highlightColor="#333333"
            />
    }

    return <div>Error occured!</div>;
}