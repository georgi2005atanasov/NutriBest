// eslint-disable-next-line react/prop-types
export default function FormButton({ text, wrapperStyles, ...props }) {
    return <div className={wrapperStyles}>
        <button className="text-center" {...props}>{text}</button>
    </div>
}