import { Link } from "react-router-dom";

//in the children is the icon
// eslint-disable-next-line react/prop-types
export default function Filter({ children, handler, styles, text }) {
    return <Link onClick={handler} className={`${styles} text-decoration-none p-2 d-flex justify-content-center align-items-center`}>
        <p className="text-center m-0 pe-2">
            <strong className="text-center">{text}</strong>
        </p>
        {children &&
            <button className="mx-1 p-2 border-0">
                {children}
            </button>}
    </Link>;
}