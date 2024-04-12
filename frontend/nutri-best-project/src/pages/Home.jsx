import { useSearchParams } from "react-router-dom"
import Message from "../components/UI/Message";

export default function HomePage() {
    let [searchParams, setSearchParams] = useSearchParams();

    const message = searchParams.get('message');
    const messageType = searchParams.get('type');

    if (message) {
        setTimeout(() => {
            setSearchParams({});
        }, 4000);

        return <>
            <Message message={message} messageType={messageType} />
            <div>This is random home page</div>
        </>
    }

    return <>
        <div>This is random home page</div>
    </>
}