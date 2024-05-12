import styles from "./css/AllFlavours.module.css";
import Message from "../../components/UI/Shared/Message";
import AddFlavourButton from "../../components/UI/Buttons/Flavours/AddFlavourButton";
import FlavourItem from "./FlavourItem";
import { allFlavours, deleteFlavour } from "../../../../../backend/api/flavours";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";

export default function AllFlavours() {
    const { flavours } = useLoaderData();
    let [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

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
        console.log("Opens modal:");
        console.log(name);
    }, []);

    return <>
        {message && <Message addStyles={"mb-0"} message={message} messageType={messageType} />}
        <div className="container-fluid d-flex flex-column align-items-center">
            <div className={`row d-flex justify-content-center ${styles["flavours-container"]}`}>

                <h2 className={"row d-flex justify-content-center align-items-center m-0 mb-3 pt-3 text-dark"}>
                    All Flavours
                </h2>

                <div className="d-flex justify-content-center">
                    <AddFlavourButton />
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
        </div>
    </>
}

export async function loader({ request, params }) {
    try {
        const flavours = await allFlavours();

        return {
            flavours
        }
    } catch (error) {
        return redirect("/error")
    }
}