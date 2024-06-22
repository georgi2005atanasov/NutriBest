/* eslint-disable react/prop-types */
import DescriptionBox from "./DescriptionBox";
import HowToUseBox from "./HowToUseBox";
import WhyChooseBox from "./WhyChooseBox";
import IngredientsBox from "./IngredientsBox";

export default function DetailsWrapper({product, isVerified}) {
    return <>
        <DescriptionBox product={product} isVerified={isVerified} />
        <HowToUseBox product={product} isVerified={isVerified} />
        <WhyChooseBox product={product} isVerified={isVerified} />
        <IngredientsBox product={product} isVerified={isVerified} />
        <hr className="mt-3" />
    </>
}