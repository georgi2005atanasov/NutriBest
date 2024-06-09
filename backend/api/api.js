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
    getCurrentProductPrice
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
    getProfileDetailsById
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
    getProductsOfPromotion
}
    from "./promotions";

import {
    allBrands,
    addBrand,
    getImageByBrandName,
    deleteBrandByName
}
    from "./brands";
import {
    addCategory,
    deleteCategory
}
    from "./categories";
import {
    allPackages,
    addPackage,
    deletePackage
}
    from "./packages";
import {
    allFlavours,
    addFlavour,
    deleteFlavour
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
    createPromoCodes
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
    getUserOrders
}
    from "./orders";
import {
    sendConfirmOrderMessage,
    sendForgottenPasswordMessage,
    sendPromoCode
}
    from "./email";
import {
    createShippingDiscount,
    allShippingDiscounts,
    deleteShippingDiscount
}
    from "./shippingDiscount";

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

export { getProfileDetails };
export { editUser };
export { deleteUser };
export { getUserAddress };
export { setUserAddress };
export { allProfiles };
export { getProfileDetailsById };

export { allPromotions };
export { changeProductPromotion };
export { changeStatus };
export { deletePromotion };
export { addPromotion };
export { getPromotionById };
export { editPromotion };
export { getProductsOfPromotion };

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

export { allCitiesWithCountries };
export { allPaymentMethods };

export { createGuestOrder };
export { createUserOrder };
export { getOrderById };
export { changeOrderStatuses };
export { deleteOrder };
export { getUserOrders };

export { sendConfirmOrderMessage };
export { confirmOrder };
export { sendForgottenPasswordMessage };
export { sendPromoCode };
export { allOrders };

export { createShippingDiscount };
export { allShippingDiscounts };
export { deleteShippingDiscount };