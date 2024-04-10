// eslint-disable-next-line react/prop-types
export default function FormInput({ styles, text, error, id, ...props }) {
    return <div className={`${styles} my-3`}>
        <label htmlFor={id}>{text}</label>
        <input {...props} id={id} />
        {error && <p>{error}</p>}
    </div>
}