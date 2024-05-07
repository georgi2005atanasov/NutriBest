export function getPromotionForm(promotion) {
    const formData = new FormData();

    if (promotion.minumumPrice) {
        formData.append("minimumPrice", promotion.minimumPrice);
    }
    
    formData.append("description", promotion.description);
    formData.append("startDate", promotion.startDate);

    if (promotion.discountAmount) {
        formData.append("discountAmount", promotion.discountAmount);
    }

    if (promotion.discountPercentage) {
        formData.append("discountPercentage", promotion.discountPercentage);
    }

    if (promotion.endDate) {
        formData.append("endDate", promotion.endDate);
    }

    if (promotion.category) {
        formData.append("category", promotion.category);
    }

    if (promotion.brand) {
        formData.append("brand", promotion.brand);
    }

    return formData;
}