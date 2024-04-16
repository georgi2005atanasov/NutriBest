/* eslint-disable react/prop-types */
export default function ProductImage({src, styles}) {
    return <img className={styles["product-image"]} src={src} alt="Dynamic" />

}