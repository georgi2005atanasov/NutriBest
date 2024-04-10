import { useSearchParams } from "react-router-dom"
import Message from "../components/UI/Message";

export default function HomePage() {
    let [searchParams, setSearchParams] = useSearchParams();

    const message = searchParams.get('message');

    if (message) {
        setTimeout(() => {
            setSearchParams({});
        }, 2000);

        return <>
            <Message message={message} />
            <div>This is random home page</div>
        </>
    }

    return <>
        <div>This is random home page</div>
    </>
}