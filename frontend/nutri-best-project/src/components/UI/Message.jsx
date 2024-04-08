// eslint-disable-next-line react/prop-types
export default function Message({ message }) {
    return <div className="mx-3 alert alert-success" role="alert">
        {message}
    </div>
}