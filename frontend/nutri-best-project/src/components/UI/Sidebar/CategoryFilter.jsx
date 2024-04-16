import DropdownMenu from "../DropdownMenu";
import MultiSelectCategory from "../Form/MultiSelectCategory";

export default function CategoryFilter() {
    return <DropdownMenu text={"Category"}>
        <h5 className="ms-3 mt-3">Choose:</h5>
        <MultiSelectCategory />
    </DropdownMenu>
}