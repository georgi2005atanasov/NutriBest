import DropdownMenu from "../DropdownMenu";
import MultiSelectCategory from "../Form/MultiSelectCategory";

// eslint-disable-next-line react/prop-types
export default function CategoryFilter({ categoriesCount }) {
    return <DropdownMenu text={"Category"} filtersNumber={categoriesCount}>
        <h5 className="ms-3 mt-3">Choose:</h5>
        <MultiSelectCategory />
    </DropdownMenu>
}