import { CATEGORIES } from "../../store/CategoryContext";

export function getProductForm(productModel) {
    const formData = new FormData();
    formData.append("name", productModel.name);
    formData.append("description", productModel.description);
    formData.append("price", parseFloat(productModel.price));
    formData.append("categories", productModel.categories);

    if (productModel.image) {
        formData.append("image", productModel.image);
    }

    return formData;
}

export function getProductCategories(productModel) {
    const categories = [];

    for (const { name, value } of CATEGORIES) {
        if (name in productModel) {
            categories.push(value);
        }
    }

    return categories;
}