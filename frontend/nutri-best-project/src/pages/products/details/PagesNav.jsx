/* eslint-disable react/prop-types */
export default function PagesNav({ product, wrapperStyle, linkStyle }) {
    return <div className={wrapperStyle}>
        <span onClick={() => history.back()} className={`${linkStyle} text-secondary`}>All &gt; </span>
        <span className={`${linkStyle} text-secondary`}>{product}</span>
    </div>
}