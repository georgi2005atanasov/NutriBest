import NavigationLink from "../../../Navigation/NavigationLink";

export default function AddBrandButton() {
    return <div className="mb-2">
        <NavigationLink
            route={"/brands/add"}
            text={"Add Brand"}
            isAdmin={true} // just for styling purposes
            className={`d-flex justify-content-center align-items-center p-1`} />;
    </div>
}