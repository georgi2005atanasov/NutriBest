/* eslint-disable react/prop-types */
import { forwardRef } from "react"

//this component has to be wrapped with div.container
export default forwardRef(function Search({ styles, isVerified, handleChange, handleSearch }, ref) {
    return <div className="d-flex">
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-12 d-flex justify-content-center align-items-center">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className={`p-0 col-lg-9 col-12 d-flex justify-content-center align-items-end ${styles["search-container"]}`}>
                        <input
                            className={`${styles["search-bar"]} ${isVerified ? styles["search-bar-admin"] : ""}`}
                            id="search"
                            ref={ref}
                            type="text"
                            name="search"
                            onKeyDown={(event) => handleChange(event)}
                            placeholder="Search" />
                        <label onClick={handleSearch} htmlFor="search" className={styles["search-icon"]}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
})