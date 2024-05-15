/* eslint-disable react/prop-types */
import DropdownMenu from "../../Dropdown/DropdownMenu";
import MultiSelectFlavour from "../../Form/MultiSelectFlavour";

export default function FlavourFilter({ flavours, selected, setSelected }) {
    const flavoursCount = flavours && flavours
        .split(" and ")
        .filter(x => x)
        .length;
    return <DropdownMenu text={"Flavour"} filtersNumber={flavoursCount}>
        <MultiSelectFlavour
            newFlavours={flavours}
            selected={selected}
            setSelected={setSelected} />
    </DropdownMenu>;
}