/* eslint-disable react/prop-types */
export default function NavToggler({ styles }) {
    return <div className="col-10 p-0">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className={`${styles["menu"]} d-flex justify-content-end align-items-center`}>
                        <input type="checkbox" id={styles["check"]} />
                        <label htmlFor={styles["check"]} className={`${styles["button"]}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                        <nav>
                            <a href="/">Home</a>
                            <a href="/login">Products</a>
                            <a href="/info">About us</a>
                            <a href="/contact">Contact</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
}