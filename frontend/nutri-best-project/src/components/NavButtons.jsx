/* eslint-disable react/prop-types */
import shoppingBag from "../assets/shopping-bag.png";
import { useLoaderData } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useSubmit } from "react-router-dom"
import UserButtons from "./User/UserButtons";
import GuestButtons from "./Guest/GuestButtons";

export default function NavButtons({ styles }) {
    const token = useLoaderData("rootLoader");

    let isAdmin = false;
    let tokenData = null;

    if (token) {
        tokenData = jwtDecode(token);
    }

    if (tokenData && tokenData.role == "Administrator") {
        isAdmin = true;
    }

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