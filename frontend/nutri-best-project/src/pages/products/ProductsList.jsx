/* eslint-disable react/prop-types */
import ProductItem from "./ProductItem";

export default function ProductsList({ productsRows, sizes="" }) {
    return productsRows && productsRows.length && productsRows.length != 0 ? productsRows.map(row =>
        <div key={row[0].name} className="row d-flex justify-content-lg-evenly justify-content-between mb-4">
            {row.map(p => {
                return <div className={sizes ? `${sizes}` : "col-md-3 col-lg-4"} key={p.productId}>
                    <ProductItem product={p} />
                </div>;
            })}
        </div>) :
        <div className="container d-flex">
            <h5 className="d-flex justify-content-center align-items-center">There are no products matching your criteria!</h5>
        </div>
}