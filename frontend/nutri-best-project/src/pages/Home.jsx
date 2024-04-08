import { useSearchParams } from "react-router-dom"
import Message from "../components/UI/Message";

export default function HomePage() {
    let [searchParams, setSearchParams] = useSearchParams();

    // Read a search parameter
    const message = searchParams.get('message');

    if (message) {
        setTimeout(() => {
            setSearchParams({});
        }, 3000);

        return <>
            <Message message={message} />
            <div>This is random home page</div>
        </>
    }

    return <>
        <div>This is random home page</div>
    </>
}