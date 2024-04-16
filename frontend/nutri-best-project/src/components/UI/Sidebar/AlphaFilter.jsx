/* eslint-disable react/prop-types */
import DropdownMenu from "../DropdownMenu";
import NoneFilter from "../Buttons/NoneFilter";
import AscFilter from "../Buttons/AscFilter";
import DescFilter from "../Buttons/DescFilter";

export default function AlphaFilter({ alpha, selectedBtn }) {
    return <DropdownMenu text={"Alphabetically"}>
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