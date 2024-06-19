import styles from "./css/AllPackages.module.css";
import Message from "../../components/UI/Shared/Message";
import PackageItem from "./PackageItem";
import DeletePackageModal from "../../components/Modals/Delete/DeletePackageModal";
import AddPackageButton from "../../components/UI/Buttons/Packages/AddPackageButton";
import { allPackages } from "../../../../../backend/api/api";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useSearchParams, useSubmit } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";

export default function AllPackages() {
    const dialog = useRef();
    const submit = useSubmit();
    const { packages } = useLoaderData();
    const [grams, setGrams] = useState("");
    let [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    useEffect(() => {
        if (grams) {
            dialog.current.open();
        }
    }, [grams]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchParams(prev => {
                prev.delete("type");
                prev.delete("message");
                return prev;
            })
        }, 2500);

        return () => {
            clearTimeout(timeout);
        }
    }, [setSearchParams]);

    const handleDelete = useCallback(async function handleDelete(event, grams) {
        event.stopPropagation();
        setGrams(grams);
    }, []);

    // if (!isAdmin && !isEmployee) {
    //     return submit("message=Page Not Found!&type=danger",
    //         { action: "/", method: "GET" });
    // }

    return <>
        <DeletePackageModal
            packageToDelete={grams}
            setPackageToDelete={setGrams}
            ref={dialog}
        />

        {message && <Message addStyles={"mb-0"} message={message} messageType={messageType} />}
        <motion.div
            className="container-fluid d-flex flex-column align-items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`row d-flex justify-content-center ${styles["packages-container"]}`}>
                <h2 className={"row d-flex justify-content-center align-items-center m-0 mb-3 pt-3 text-dark"}>
                    All Packages
                </h2>

                <div className="d-flex justify-content-center">
                    <AddPackageButton />
                </div>

                {packages.map((x, index) => (
                    <div key={x.grams}>
                        <PackageItem
                            key={index}
                            grams={x.grams}
                            onDelete={handleDelete} />
                    </div>
                ))}
            </div>
        </motion.div>
    </>
}

export async function loader({ request, params }) {
    try {
        const packages = await allPackages(true);

        if (packages == null) {
            return redirect("/?message=Page Not Found&type=danger");
        }

        return {
            packages
        }
    } catch (error) {
        return redirect("/error")
    }
}