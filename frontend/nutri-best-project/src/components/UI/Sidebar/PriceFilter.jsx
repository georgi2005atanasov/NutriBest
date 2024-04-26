import DropdownMenu from "../Dropdown/DropdownMenu";
import NoneFilter from "../Buttons/NoneFilter";
import AscFilter from "../Buttons/AscFilter";
import DescFilter from "../Buttons/DescFilter";
import RangePriceFilter from "../Buttons/RangePriceFilter";

// eslint-disable-next-line react/prop-types
export default function PriceFilter({ price, selectedBtn }) {
    let filtersCount = getFiltersCount();

    return <DropdownMenu text={"Price"} filtersNumber={filtersCount}>
        <div id="price-none" className={!price ? selectedBtn : ""}>
            <NoneFilter identifier={"price"} />
        </div>
        <hr className="m-0" />
        <div id="price-desc">
            <RangePriceFilter />
        </div>
        <hr className="m-0" />
        <div id="price-asc" className={`${price == "asc" ? selectedBtn : ""}`}>
            <AscFilter identifier={"price"} />
        </div>
        <hr className="m-0" />
        <div id="price-desc" className={`${price == "desc" ? selectedBtn : ""}`}>
            <DescFilter identifier={"price"} />
        </div>
    </DropdownMenu>
}

function getFiltersCount() {
    let count = 0;

    if (sessionStorage.getItem("priceRange") && sessionStorage.getItem("priceRange") != "") {
        const [min, max] = sessionStorage.getItem("priceRange").split(" ");

        if (Number(min) != 0 || Number(max) != sessionStorage.getItem("maxPrice")) {
            count++;
        }
    }
    if (sessionStorage.getItem("price") && sessionStorage.getItem("price") != "") {
        count++;
    }

    return count;
}