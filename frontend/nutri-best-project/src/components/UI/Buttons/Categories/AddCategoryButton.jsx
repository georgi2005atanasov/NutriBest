import NavigationLink from "../../../Navigation/NavigationLink"

export default function AddCategoryButton() {
    return <div className="mb-2">
        <NavigationLink
            route={"/categories/add"}
            text={"Add Category"}
            isAdmin={true} // just for styling purposes
            className={`d-flex justify-content-center align-items-center p-1`} />
    </div>
}