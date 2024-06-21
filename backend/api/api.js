import {
    addProduct,
    getProductById,
    allProducts,
    editProduct,
    deleteProduct,
    getIdentifiers,
    getImageByProductId,
    getProductsByCategories,
    getProductsByQuantity,
    getProductsByBrand,
    getProductDetailsByIdAndName,
    setProductDetailsById,
    getProductSpecs,
    partialEditProduct,
    getRelated,
    getCurrentProductPrice,
    exportProducts
}
    from "./products";

import {
    getFormFile
}
    from "./images";

import {
    getProfileDetails,
    editUser,
    deleteUser,
    getUserAddress,
    setUserAddress,
    allProfiles,
    getProfileDetailsById,
    exportProfiles
}
    from "./profile";

import {
    allPromotions,
    changeProductPromotion,
    changeStatus,
    deletePromotion,
    addPromotion,
    editPromotion,
    getPromotionById,
    getProductsOfPromotion,
    exportPromotions
}
    from "./promotions";

import {
    allBrands,
    addBrand,
    getImageByBrandName,
    deleteBrandByName,
    exportBrands
}
    from "./brands";
import {
    addCategory,
    deleteCategory,
    exportCategories
}
    from "./categories";
import {
    allPackages,
    addPackage,
    deletePackage,
    exportPackages
}
    from "./packages";
import {
    allFlavours,
    addFlavour,
    deleteFlavour,
    exportFlavours
}
    from "./flavours";
import {
    getNutritionFactsByProductIdAndName,
    setNutritionFactsByProductId
}
    from "./nutritionFacts";
import {
    addToCart,
    getCart,
    cleanCart,
    removeFromCart,
    setProductInCart,
    applyPromoCode,
    removePromoCode
}
    from "./cart";
import {
    allPromoCodes,
    deletePromoCodes,
    createPromoCodes,
    exportPromoCodes
}
    from "./promoCodes";
import {
    allCitiesWithCountries
}
    from "./cities";
import {
    allPaymentMethods
}
    from "./paymentMethods";
import {
    createGuestOrder,
    createUserOrder,
    getOrderById,
    confirmOrder,
    allOrders,
    changeOrderStatuses,
    deleteOrder,
    getUserOrders,
    getOrderRelatedProducts,
    exportOrders,
    exportOrdersSummary
}
    from "./orders";
import {
    sendConfirmOrderMessage,
    sendForgottenPasswordMessage,
    sendPromoCode,
    sendOrderToAdmin,
    sendConfirmedOrderToAdmin,
    sendJoinedToNewsletter,
    sendMessageToSubscribers,
    sendPromoCodeToSubscribers
}
    from "./email";
import {
    createShippingDiscount,
    allShippingDiscounts,
    deleteShippingDiscount,
    exportShippingDiscounts
}
    from "./shippingDiscount";
import {
    addToNewsletter,
    subscribedToNewsletter,
    removeFromNewsletterByAdmin,
    unsubscribeFromNewsletter,
    exportNewsletter
}
    from "./newsletter";

export { addProduct };
export { getProductById };
export { allProducts };
export { editProduct };
export { partialEditProduct };
export { deleteProduct };
export { getProductsByCategories };
export { getProductsByQuantity };
export { getProductsByBrand };
export { getProductDetailsByIdAndName };
export { setProductDetailsById };
export { getRelated };
export { getImageByProductId };
export { getProductSpecs };
export { getCurrentProductPrice };
export { getIdentifiers };
export { getFormFile };
export { exportProducts };
export { exportCategories };
export { exportBrands };

export { getProfileDetails };
export { editUser };
export { deleteUser };
export { getUserAddress };
export { setUserAddress };
export { allProfiles };
export { getProfileDetailsById };
export { exportProfiles }

export { allPromotions };
export { changeProductPromotion };
export { changeStatus };
export { deletePromotion };
export { addPromotion };
export { getPromotionById };
export { editPromotion };
export { getProductsOfPromotion };
export { exportPromotions };

export { allBrands };
export { addCategory };
export { deleteCategory };
export { addBrand };
export { deleteBrandByName };
export { getImageByBrandName };
export { allPackages };
export { addPackage };
export { deletePackage };
export { allFlavours };
export { addFlavour };
export { deleteFlavour };
export { getNutritionFactsByProductIdAndName };
export { setNutritionFactsByProductId };
export { exportFlavours };
export { exportPackages }

export { addToCart };
export { getCart };
export { cleanCart };
export { removeFromCart };
export { setProductInCart };
export { applyPromoCode };
export { removePromoCode };

export { allPromoCodes };
export { deletePromoCodes };
export { createPromoCodes };
export { exportPromoCodes };

export { allCitiesWithCountries };
export { allPaymentMethods };

export { createGuestOrder };
export { createUserOrder };
export { getOrderById };
export { changeOrderStatuses };
export { deleteOrder };
export { getUserOrders };
export { getOrderRelatedProducts };
export { exportOrders };
export { exportOrdersSummary };

export { sendConfirmOrderMessage };
export { confirmOrder };
export { sendForgottenPasswordMessage };
export { sendPromoCode };
export { allOrders };
export { sendOrderToAdmin };
export { sendConfirmedOrderToAdmin };
export { sendJoinedToNewsletter };
export { sendMessageToSubscribers };
export { sendPromoCodeToSubscribers };

export { createShippingDiscount };
export { allShippingDiscounts };
export { deleteShippingDiscount };
export { exportShippingDiscounts };

export { addToNewsletter };
export { subscribedToNewsletter };
export { removeFromNewsletterByAdmin };
export { unsubscribeFromNewsletter };
export { exportNewsletter };