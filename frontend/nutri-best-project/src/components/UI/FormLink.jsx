import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function FormLink({ route, styles, text }) {
    return <div className="text-center my-3">
        <Link to={route} className={styles}>{text}</Link>
    </div>;
}