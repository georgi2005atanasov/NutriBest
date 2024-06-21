import styles from "./css/AllFlavours.module.css";
import Message from "../../components/UI/Shared/Message";
import AddFlavourButton from "../../components/UI/Buttons/Flavours/AddFlavourButton";
import DeleteFlavourModal from "../../components/Modals/Delete/DeleteFlavourModal";
import DownloadCsvButton from "../../components/UI/Buttons/Download/DownloadCsvButton";
import FlavourItem from "./FlavourItem";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { allFlavours, exportFlavours } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useSearchParams, useSubmit } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

export default function AllFlavours() {
    const dialog = useRef();
    const submit = useSubmit();
    const { flavours } = useLoaderData();
    const [flavour, setFlavour] = useState("");
    let [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    useEffect(() => {
        if (flavour) {
            dialog.current.open();
        }
    }, [flavour]);

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

    const handleDelete = useCallback(async function handleDelete(event, name) {
        event.stopPropagation();
        setFlavour(name);
    }, []);

    if (!isAdmin && !isEmployee) {
        return submit("message=Page Not Found!&type=danger",
            { action: "/", method: "GET" });
    }

    return <>
        <DeleteFlavourModal
            flavour={flavour}
            setFlavour={setFlavour}
            flavours={flavours}
            ref={dialog} />

        {message && <Message addStyles={"mb-0"} message={message} messageType={messageType} />}
        <motion.div
            className="container-fluid d-flex flex-column align-items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`row d-flex justify-content-center ${styles["flavours-container"]}`}>
                <h2 className={"row d-flex justify-content-center align-items-center m-0 mb-3 pt-3 text-dark"}>
                    All Flavours
                </h2>

                <div className="d-flex flex-column align-items-center justify-content-center">
                    <AddFlavourButton />
                </div>
                <div className="w-100 text-end me-4">

                    <DownloadCsvButton
                        fileName="flavours"
                        exportFunction={exportFlavours} />
                </div>

                {flavours.map((flavour, index) => (
                    <div key={flavour.name}>
                        <FlavourItem
                            key={index}
                            flavour={flavour}
                            onDelete={handleDelete} />
                    </div>
                ))}
            </div>
        </motion.div>
    </>
}

export async function loader({ request, params }) {
    try {
        const flavours = await allFlavours(true);

        return {
            flavours
        }
    } catch (error) {
        return redirect("/error")
    }
}