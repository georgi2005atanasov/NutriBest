/* eslint-disable react/prop-types */
import DropdownMenu from "../../Dropdown/DropdownMenu";
import NoneFilter from "../../Buttons/Filters/NoneFilter";
import AscFilter from "../../Buttons/Filters/AscFilter";
import DescFilter from "../../Buttons/Filters/DescFilter";

export default function AlphaFilter({ alpha, selectedBtn, alphaCount }) {
    return <DropdownMenu text={"Alphabetically"} filtersNumber={alphaCount}>
        <div id="alpha-none" className={!alpha ? selectedBtn : ""}>
            <NoneFilter identifier={"alpha"} />
        </div>
        <hr className="m-0" />
        <div id="alpha-asc" className={`${alpha == "asc" ? selectedBtn : ""}`}>
            <AscFilter text={"Ordered (A-Z)"} identifier={"alpha"} />
        </div>
        <hr className="m-0" />
        <div id="alpha-asc" className={`${alpha == "desc" ? selectedBtn : ""}`}>
            <DescFilter text={"Reversed (Z-A)"} identifier={"alpha"} />
        </div>
    </DropdownMenu>;
}