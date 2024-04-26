// eslint-disable-next-line react/prop-types
export default function Header({ text, styles }) {
    return <header className={styles}>
        <h2 className="text-center mt-4">{text}</h2>
    </header>
}