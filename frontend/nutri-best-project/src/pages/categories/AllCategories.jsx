import styles from "./css/AllCategories.module.css";
import Message from "../../components/UI/Shared/Message";
import AddCategoryButton from "../../components/UI/Buttons/Categories/AddCategoryButton";
import DownloadCsvButton from "../../components/UI/Buttons/Download/DownloadCsvButton";
import CategoryItem from "./CategoryItem";
import DeleteCategoryModal from "../../components/Modals/Delete/DeleteCategoryModal";
import { CategoryBrandContext } from "../../store/CategoryBrandContext";
import useAuth from "../../hooks/useAuth";
import { getAuthToken } from "../../utils/auth";
import { exportCategories } from "../../../../../backend/api/export";
import { motion } from "framer-motion";
import { useSearchParams, useSubmit } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

const AllCategories = () => {
    const submit = useSubmit();
    const dialog = useRef();
    const [category, setCategory] = useState("");
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const { categories } = useContext(CategoryBrandContext);
    let [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

    useEffect(() => {
        if (category) {
            dialog.current.open();
        }
    }, [category]);

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

    const handleCategoryClick = (category) => {
        sessionStorage.setItem("categories", category);
        submit(null, { action: `/products/all`, method: "GET" });
    };

    async function handleDelete(event, categoryName) {
        event.stopPropagation();
        setCategory(categoryName);
    }

    return <>
        <DeleteCategoryModal
            ref={dialog}
            categories={categories}
            category={category}
            setCategory={setCategory} />

        {message && <Message addStyles={"mb-0"} message={message} messageType={messageType} />}

        <motion.div
            className={`${styles["categories-container"]} container-fluid d-flex flex-column align-items-center m-2 mt-5`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className={"d-flex justify-content-center align-items-center m-0 mb-4 text-dark"}>
                Our Categories
            </h2>
            {(isAdmin || isEmployee) && <>
                <AddCategoryButton />
                <div className="w-100 text-end me-4">
                    <DownloadCsvButton
                        fileName="categories"
                        exportFunction={exportCategories} />
                </div>
            </>}

            <div className="row w-75 text-center">
                {categories.map((category, index) => (
                    <div className="col-lg-3 col-md-4" key={index}>
                        <CategoryItem
                            onClick={handleCategoryClick}
                            onDelete={handleDelete}
                            category={category}
                            isVerified={(isAdmin || isEmployee)} />
                    </div>
                ))}
            </div>
        </motion.div>
    </>
}

export default AllCategories;