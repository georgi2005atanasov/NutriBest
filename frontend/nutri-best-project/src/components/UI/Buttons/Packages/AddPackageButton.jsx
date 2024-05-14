import NavigationLink from "../../../Navigation/NavigationLink";

export default function AddPackageButton() {
    return <div className="mb-2">
        <NavigationLink
            route={"/packages/add"}
            text={"Add Package"}
            isAdmin={true}
            className={`d-flex justify-content-center align-items-center p-1`} />;
    </div>
}