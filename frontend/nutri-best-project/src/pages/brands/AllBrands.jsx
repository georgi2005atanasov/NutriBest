import styles from "./css/AllBrands.module.css";
// import brandStyle from "./css/BrandItem.module.css";
import AddBrandButton from "../../components/UI/Buttons/Brands/AddBrandButton";
import Message from "../../components/UI/Shared/Message";
import BrandItem from "./BrandItem";
import useAuth from "../../hooks/useAuth";
import { getAuthToken } from "../../utils/auth";
import DeleteBrandModal from "../../components/Modals/DeleteBrandModal";
import { CategoryContext } from "../../store/CategoryContext";
import { useSearchParams, useSubmit } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

const AllBrands = () => {
    const dialog = useRef();
    const submit = useSubmit();
    const [brand, setBrand] = useState("");

    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const { brands } = useContext(CategoryContext);
    let [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

    useEffect(() => {
        if (brand != "") {
            dialog.current.open();
        }
    }, [brand]);

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

    const handleBrandClick = (event, brand) => {
        event.stopPropagation();
        sessionStorage.setItem("brands", brand);
        submit(null, { action: `/products/all`, method: "GET" });
    };

    async function handleDelete(event, brandName) {
        event.stopPropagation();
        setBrand(brandName);
    }

    return <>
        <DeleteBrandModal ref={dialog} brand={brand.name} />

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
                    brands.map(x => <div key={x.name} className="col-lg-3 col-md-4">
                        <BrandItem
                            onClick={handleBrandClick}
                            onDelete={handleDelete}
                            isVerified={isAdmin || isEmployee}
                            brand={x}
                            ref={dialog} />
                    </div>)}
            </div>
        </div>
    </>;
}

export default AllBrands;