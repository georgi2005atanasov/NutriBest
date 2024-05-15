/* eslint-disable react/prop-types */
import DropdownMenu from "../../Dropdown/DropdownMenu";
import MultiSelectQuantity from "../../Form/MultiSelectQuantity";

export default function QuantityFilter({ quantities }) {
    const quantityCount = quantities && quantities
        .split("+")
        .filter(x => x)
        .length;
    return <DropdownMenu text={"Quantity"} filtersNumber={quantityCount}>
        <MultiSelectQuantity newQuantities={quantities} />
    </DropdownMenu>;
}