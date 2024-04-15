/* eslint-disable react/prop-types */
import shoppingBag from "../../assets/shopping-bag.png";
import { useLoaderData } from "react-router-dom";
import { useSubmit } from "react-router-dom"
import UserButtons from "../User/UserButtons";
import GuestButtons from "../Guest/GuestButtons";
import useAuth from "../../hooks/useAuth";

export default function NavButtons({ styles }) {
    const token = useLoaderData("rootLoader");
    const { isAdmin } = useAuth(token);

    const submit = useSubmit();

    function handleLogout() {
        submit(null, { action: "/logout", method: "post" })
    }

    if (token && token != "EXPIRED" && token != 0) {
        return <UserButtons
            styles={styles}
            isAdmin={isAdmin}
            handleLogout={handleLogout}
            shoppingBag={shoppingBag} />
    }

    return <GuestButtons
        styles={styles}
        shoppingBag={shoppingBag} />
}