import NavigationLink from "../../../Navigation/NavigationLink";

export default function AddFlavourButton() {
    return <div className="mb-2">
        <NavigationLink
            route={"/flavours/add"}
            text={"Add Flavour"}
            isAdmin={true} // just for styling purposes
            className={`d-flex justify-content-center align-items-center p-1`} />;
    </div>
}