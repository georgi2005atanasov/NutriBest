/* eslint-disable react/prop-types */
export default function MainDetails({ product }) {
    return <>
        <h5 className="mt-4">{product.name}</h5>
        <hr className="m-1" />
        <div className="ms-3">Related Categories: <strong>{product.categories.join(", ")}</strong></div>
        <hr className="m-1" />
        <div className="ms-3">Manufacturer: <strong>{product.brand}</strong></div>
        <hr className="m-1" />
    </>
}