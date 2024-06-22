/* eslint-disable react/prop-types */
import AddToCartButton from "../../../components/UI/Buttons/Products/AddToCartButton";
import BuyNowButton from "../../../components/UI/Buttons/Products/BuyNowButton";
import EditProductButton from "../../../components/UI/Buttons/Products/EditProductButton";
import DeleteProductButton from "../../../components/UI/Buttons/Products/DeleteProductButton";

export default function DetailsButtons({ productId, isVerified, promotion }) {
    return <>
        {!isVerified ?
            <div className="d-flex justify-content-md-evenly flex-lg-row flex-column">
                <AddToCartButton
                    productId={productId}
                    isValidPromotion={promotion != null}
                    wrapperStyles="mt-3"
                    linkStyles="px-4 py-4" />
                <BuyNowButton
                    productId={productId}
                    wrapperStyles="mt-3"
                    linkStyles="px-4 py-4" />
            </div> :
            <div className="mt-3 d-flex flex-column align-items-center">
                <EditProductButton productId={productId} />
                <DeleteProductButton productId={productId} />
            </div>}
    </>
}