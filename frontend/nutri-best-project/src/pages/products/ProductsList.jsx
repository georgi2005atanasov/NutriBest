import ProductItem from "./ProductItem";

export default function ProductsList({ productsRows }) {
    return productsRows.map(row => <div key={row[0].name} className="row d-flex justify-content-between mb-4">
        {row.map(p => {
            const src = `data:${p.productImage.contentType};base64,${p.productImage.imageData}`;
            return <div className="col-md-3 col-lg-4" key={p.name}>
                <ProductItem product={p} src={src} />
            </div>;
        })}
    </div>);
}