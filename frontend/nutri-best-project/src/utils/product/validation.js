export function getProductErrors(productModel) {
    let data = {
        errors: {}
    };

    if (productModel.price <= 0 || isNaN(productModel.price)) {
        data.errors["Price"] = ["Price must be bigger than 0!"];
    }

    if (productModel.categories.length <= 0) {
        data.errors["Category"] = ["You have to choose at least 1 category!"];
    }

    if (!productModel.description || productModel.description.length < 5 || productModel.description.length > 2000) {
        data.errors["Description"] = ["Description is required!"];
    }

    if (!productModel.name || productModel.name.length == 0) {
        data.errors["Name"] = ["Name is required!"];
    }

    if (!productModel.image) {
        data.errors["Image"] = ["Image is required!"];
    }

    if (!productModel.brand) {
        data.errors["Brand"] = ["Brand is required!"];
    }

    if (isNaN(productModel.quantity) && productModel.quantity != null) {
        data.errors["Quantity"] = ["Quantity must be a number!"];
    }

    return data;
}