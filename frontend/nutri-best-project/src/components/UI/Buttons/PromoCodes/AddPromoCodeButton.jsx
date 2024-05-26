import NavigationLink from "../../../Navigation/NavigationLink";

export default function AddPromoCodeButton() {
    return <div className="mb-2">
        <NavigationLink
            route={"/promo-codes/add"}
            text={"Add Promo Codes"}
            isAdmin={true} // just for styling purposes
            className={`d-flex justify-content-center align-items-center p-1`} />
    </div>
}