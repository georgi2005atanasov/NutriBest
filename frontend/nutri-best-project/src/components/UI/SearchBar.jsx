import searchBar from "./css/SearchBar.module.css";

export default function SearchBar() {
    function handleSearchClick() {
        setTimeout(() => {
            console.log(123);
        }, 4000);
    }

    return <div className="col-md-4">
        <div className="d-flex">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className={`col-12 d-flex justify-content-center align-items-end ${searchBar["search-container"]}`}>
                            <input
                                className={searchBar["search-bar"]}
                                id="search"
                                type="text"
                                name="search"
                                onChange={handleSearchClick}
                                placeholder="Search" />
                            <label htmlFor="search" className={searchBar["search-icon"]}>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}