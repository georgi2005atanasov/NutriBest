import { CATEGORIES } from "../../store/CategoryBrandContext";

export function getProductForm(productModel) {
    const formData = new FormData();
    formData.append("name", productModel.name);
    formData.append("description", productModel.description);
    formData.append("price", productModel.price);
    formData.append("categories", productModel.categories);
    formData.append("brand", productModel.brand);
    formData.append("productSpecs", productModel.productSpecs);

    if (productModel.image) {
        formData.append("image", productModel.image);
    }

    return formData;
}

export function getProductCategories(productModel) {
    const categories = [];

    for (const { name } of CATEGORIES) {
        if (name.replace(" ", "") in productModel) {
            categories.push(name);
        }
    }

    return categories;
}