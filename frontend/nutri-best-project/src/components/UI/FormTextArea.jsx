// eslint-disable-next-line react/prop-types
export default function FormTextArea({ styles, text, error, id, ...props }) {
    return <div className={`${styles} my-3`}>
        <label htmlFor={id}>{text}</label>
        <textarea {...props} id={id} />
        {error && <p>{error}</p>}
    </div>
}