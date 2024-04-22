import DropdownMenu from "../DropdownMenu";
import NoneFilter from "../Buttons/NoneFilter";
import AscFilter from "../Buttons/AscFilter";
import DescFilter from "../Buttons/DescFilter";
import RangePriceFilter from "../Buttons/RangePriceFilter";

// eslint-disable-next-line react/prop-types
export default function PriceFilter({ price, selectedBtn }) {
    return <DropdownMenu text={"Price"}>
        <div id="price-none" className={!price ? selectedBtn : ""}>
            <NoneFilter identifier={"price"} />
        </div>
        <hr className="m-0" />
        <div id="price-desc">
            <RangePriceFilter identifier={"price"} />
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