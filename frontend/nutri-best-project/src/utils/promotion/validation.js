export function getPromotionErrors(promotion) {
    let data = {
        errors: {}
    };

    if (promotion.minimumPrice && (isNaN(promotion.minimumPrice) || parseFloat(promotion.minimumPrice) <= 0)) {
        data.errors["MinimumPrice"] = ["Invalid price!"];
    }

    if (!promotion.description || promotion.description.length < 5 || promotion.description.length > 50) {
        data.errors["Description"] = ["The description length must be at between 5 and 50!"];
    }

    if (!promotion.startDate) {
        data.errors["StartDate"] = ["Start Date is required!"];
    }

    if (promotion.discountAmount && (isNaN(promotion.discountAmount) || parseFloat(promotion.discountAmount) <= 0)) {
        data.errors["message"] = ["Invalid discount!"];
    }

    if (promotion.discountPercentage && (isNaN(promotion.discountPercentage) || parseFloat(promotion.discountPercentage) <= 0)) {
        data.errors["message"] = ["Invalid discount!"];
    }

    return data;
}