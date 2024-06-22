import NavigationLink from "../Navigation/NavigationLink"

export default function AddPromotionButton() {
    return <NavigationLink
        route={"/promotions/add"}
        text={"Add Promotion"}
        isAdmin={true}
        className={`d-flex justify-content-center align-items-center p-0`} />
}