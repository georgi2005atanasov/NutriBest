import styles from "./css/AllCategories.module.css";
import Message from "../../components/UI/Shared/Message";
import CategoryItem from "./CategoryItem";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { CategoryContext } from "../../store/CategoryContext";
import { useSearchParams, useSubmit } from "react-router-dom";
import { useContext, useEffect } from "react";
import AddCategoryButton from "../../components/UI/Buttons/Categories/AddCategoryButton";

const AllCategories = () => {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const { categories } = useContext(CategoryContext);
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

    return <>
        {message && <Message addStyles={"mb-0"} message={message} messageType={messageType} />}

        <div className={`${styles["categories-container"]} container-fluid d-flex flex-column align-items-center m-2 mt-5`}>
            <h2 className={"d-flex justify-content-center align-items-center m-0 mb-4 text-dark"}>
                Our Categories
            </h2>
            <AddCategoryButton />
            <div className="row w-75 text-center">
                {categories.map((category, index) => (
                    <div className="col-lg-3 col-md-4" key={index}>
                        <CategoryItem category={category} isVerified={(isAdmin || isEmployee)} />
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default AllCategories;