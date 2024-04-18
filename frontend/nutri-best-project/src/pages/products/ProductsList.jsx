/* eslint-disable react/prop-types */
import ProductItem from "./ProductItem";

export default function ProductsList({ productsRows }) {
    return productsRows && productsRows.length && productsRows.length != 0 ? productsRows.map(row =>
        <div key={row[0].name} className="row d-flex justify-content-lg-evenly justify-content-between mb-4">
            {row.map(p => {
                return <div className="col-md-3 col-lg-4" key={p.name}>
                    <ProductItem product={p} />
                </div>;
            })}
        </div>) :
        <div className="container d-flex">
            <h5 className="d-flex justify-content-center align-items-center">Currently there are no products in this Category!</h5>
        </div>
}