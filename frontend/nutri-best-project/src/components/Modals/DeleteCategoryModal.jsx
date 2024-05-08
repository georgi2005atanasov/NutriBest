import Modal from "./Modal";
import styles from "./css/DeleteProductModal.module.css";
import { deleteCategory } from "../../../../../backend/api/api";
import { CategoryContext } from "../../store/CategoryContext";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef, useContext } from "react";

// eslint-disable-next-line react/prop-types
const DeleteCategoryModal = forwardRef(function DeleteCategoryModal({ category }, ref) {
    const submit = useSubmit();
    const { categories, setSelectedCategories } = useContext(CategoryContext);
    console.log(categories);

    async function handleDelete(event) {
        try {
            event.stopPropagation();

            const result = await deleteCategory(category);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            ref.current.close();

            if (result.ok == false) {
                submit("message=This category is already deleted, try to refresh!&type=danger",
                { action: "/categories", method: "get" });

                return;
            }

            setSelectedCategories(prev => {
                return [...prev.filter(x => x.name != category)];
            });

            return submit("message=Successfully deleted the category!&type=success",
                { action: "/categories", method: "get" });
        } catch (error) {
            return redirect("/error");
        }
    }

    function handleClose(event) {
        event.stopPropagation();
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are you sure you want to delete this category?</h4>
                <div>All the products and promotions within the &apos;{category}&apos; category will be deleted.</div>
                <div className={styles["modal-buttons"]}>
                    <button type="submit" onClick={handleDelete} className={styles["delete-btn"]}>Yes, Delete</button>
                    <form method="dialog" action="">
                        <button onClick={handleClose} className={styles["close-btn"]}>No, Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});

export default DeleteCategoryModal;