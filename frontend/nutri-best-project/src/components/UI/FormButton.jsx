
// eslint-disable-next-line react/prop-types
export default function FormButton({ text, wrapperStyles }) {
    return <div className={wrapperStyles}>
        <button className="text-center">{text}</button>
    </div>
}