import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function PagesNav({ product, wrapperStyle, linkStyle }) {
    const navigate = useNavigate();

    return <div className={wrapperStyle}>
        <span onClick={() => {
            navigate("/products/all");
            setTimeout(() => {
                window.scrollTo(0, 0); // Scroll to the top after a slight delay
            }, 100);
        }} className={`${linkStyle} text-secondary`}>All &gt; </span>
        <span className={`${linkStyle} text-secondary`}>{product}</span>
    </div>
}