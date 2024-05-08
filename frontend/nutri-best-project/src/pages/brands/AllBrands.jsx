import styles from "./css/AllBrands.module.css";
import brandStyle from "./css/BrandItem.module.css";
import AddBrandButton from "../../components/UI/Buttons/Brands/AddBrandButton";
import Message from "../../components/UI/Shared/Message";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { allBrands } from "../../../../../backend/api/brands";
import DeleteBrandModal from "../../components/Modals/DeleteBrandModal";
import { motion } from "framer-motion";
import { defer, useLoaderData, useSearchParams, useSubmit } from "react-router-dom";
import { useEffect, useRef } from "react";

const AllBrands = () => {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const { brands } = useLoaderData();
    const submit = useSubmit();
    const dialog = useRef();

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

    const handleBrandClick = (br) => {
        sessionStorage.setItem("brands", br);
        submit(null, { action: `/products/all`, method: "GET" });
    };

    async function handleDelete(event) {
        event.stopPropagation();
        dialog.current.open();
    }

    return <>
        {message && <Message addStyles={"mb-0"} message={message} messageType={messageType} />}

        <div className={`${styles["brands-container"]} container-fluid d-flex flex-column align-items-center m-2 mt-5`}>
            <h2 className={`d-flex justify-content-center align-items-center m-0 mb-4 ${styles["brands-title"]}`}>
                Our Brands
            </h2>
            <AddBrandButton />
            <div className="row w-75 text-center">
                {brands &&
                    brands.some(x => !x.name) ?
                    null :
                    <div>{brands.map(x =>
                        <motion.div
                            key={x.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, y: -10, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className={`${brandStyle["brand-item"]} card`}
                            onClick={() => handleBrandClick(x)}
                        >
                            <DeleteBrandModal ref={dialog} brand={x.name} />
                            {isAdmin == true || isEmployee == true ?
                                <motion.i
                                    className={`fa fa-trash-o d-flex justify-content-end ${styles["delete-icon"]}`} aria-hidden="true"
                                    onClick={(event) => handleDelete(event)}
                                >
                                </motion.i> :
                                ""}
                            <div className={`card-body mb-3 d-flex justify-content-center w-100`}>
                                {x.name}
                            </div>
                        </motion.div>
                    )}</div>}

            </div>
        </div>
    </>
}

export default AllBrands;

export async function loader() {
    const brands = await allBrands();

    return defer({
        brands
    });
}