import styles from "./css/AllBrands.module.css";
import AddBrandButton from "../../components/UI/Buttons/Brands/AddBrandButton";
import Message from "../../components/UI/Shared/Message";
import DeleteBrandModal from "../../components/Modals/Delete/DeleteBrandModal";
import BrandDetailsModal from "../../components/Modals/BrandDetailsModal";
import BrandItem from "./BrandItem";
import useAuth from "../../hooks/useAuth";
import { getAuthToken } from "../../utils/auth";
import { getImageByBrandName } from "../../../../../backend/api/api";
import { CategoryBrandContext } from "../../store/CategoryBrandContext";
import { motion } from "framer-motion";
import { useSearchParams, useSubmit, redirect } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

const AllBrands = () => {
    const dialogDelete = useRef();
    const dialogDetails = useRef();
    const submit = useSubmit();
    const [brand, setBrand] = useState("");
    const [modal, setModal] = useState("");
    const [image, setImage] = useState("");

    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const { brands } = useContext(CategoryBrandContext);
    let [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

    const loadImage = useCallback(async function loadImage() {
        try {
            const result = await getImageByBrandName(brand.name);
            setImage(`data:${result.contentType};base64,${result.imageData}`);
        } catch (error) {
            return redirect("/error");
        }
    }, [brand.name]);

    useEffect(() => {
        if (brand && modal == "delete") {
            dialogDelete.current.open();
        }
        else if (brand && modal == "details") {
            loadImage();
        }
    }, [brand, modal, loadImage]);

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

    useEffect(() => {
        if (image != "" && modal == "details") {
            dialogDetails.current.open();
        }
    }, [image, modal]);

    const handleBrandClick = (event, brand) => {
        event.stopPropagation();
        sessionStorage.setItem("brand", brand);
        submit(null, { action: `/products/all`, method: "GET" });
    };

    async function handleDelete(event, brand) {
        event.stopPropagation();
        setBrand(brand);
        setModal("delete");
    }

    async function handleDetails(event, brand) {
        event.stopPropagation();
        setBrand(brand);
        setModal("details");
    }

    return <>
        <DeleteBrandModal
            ref={dialogDelete}
            brand={brand.name}
            setBrand={setBrand}
            setModal={setModal}
        />
        <BrandDetailsModal
            ref={dialogDetails}
            image={image}
            brand={brand}
            setBrand={setBrand}
            setModal={setModal} />

        {message && <Message addStyles={"mb-0"} message={message} messageType={messageType} />}

        <motion.div
            className={`${styles["brands-container"]} container-fluid d-flex flex-column align-items-center m-2 mt-5`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className={`d-flex justify-content-center align-items-center m-0 mb-4 ${styles["brands-title"]}`}>
                Our Brands
            </h2>
            {(isAdmin || isEmployee) && <AddBrandButton />}
            <div className="row w-75 text-center">
                {brands &&
                    brands.some(x => !x.name) ?
                    null :
                    brands.map(x => <div key={x.name} className="col-lg-3 col-md-4">
                        <BrandItem
                            onClick={handleBrandClick}
                            onDelete={handleDelete}
                            onOpen={handleDetails}
                            isVerified={isAdmin || isEmployee}
                            brand={x} />
                    </div>)}
            </div>
        </motion.div>
    </>;
}

export default AllBrands;