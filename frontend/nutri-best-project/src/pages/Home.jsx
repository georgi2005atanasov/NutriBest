import { useSearchParams } from "react-router-dom"
import Message from "../components/UI/Shared/Message";
import { useEffect } from "react";

export default function HomePage() {
    let [searchParams, setSearchParams] = useSearchParams();

    const message = searchParams.get('message');
    const messageType = searchParams.get('type');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setSearchParams({});
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [message, setSearchParams]);

    if (message) {
        return <>
            <Message message={message} messageType={messageType} />
            <div>This is random home page</div>
        </>
    }

    return <>
        <div>This is random home page</div>
    </>
}