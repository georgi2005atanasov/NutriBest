// eslint-disable-next-line react/prop-types
export default function FormInput({ styles, text, ...props }) {
    return <div className={`${styles} my-3`}>
        <label htmlFor="username">{text}</label>
        <input {...props} />
    </div>
}