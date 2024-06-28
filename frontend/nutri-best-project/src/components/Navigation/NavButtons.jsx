/* eslint-disable react/prop-types */
import styles from "./MainNavigation.module.css";
import shoppingBag from "../../assets/shopping-bag.png";
import UserButtons from "../User/UserButtons";
import GuestButtons from "../Guest/GuestButtons";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useSubmit } from "react-router-dom";

export default function NavButtons() {
    const token = useLoaderData("rootLoader");
    const { isAdmin, isEmployee } = useAuth(token);

    const submit = useSubmit();

    function handleLogout() {
        return submit(null, { action: "/logout", method: "POST" })
    }

    if (token && token != "EXPIRED" && token != 0) {
        return <UserButtons
            styles={styles}
            isVerified={isAdmin || isEmployee}
            handleLogout={handleLogout}
            shoppingBag={shoppingBag} />
    }

    return <GuestButtons
        styles={styles}
        shoppingBag={shoppingBag} />
}