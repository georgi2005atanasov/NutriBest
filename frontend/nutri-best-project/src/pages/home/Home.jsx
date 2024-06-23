import HomeHeader from "./HomeHeader";
import Message from "../../components/UI/Shared/Message";
import Loader from "../../components/UI/Shared/Loader";
import ProductsList from "../products/ProductsList";
import { allProducts, getImageByProductId, allPromotions, getContactDetails } from "../../../../../backend/api/api";
import NewestProductsList from "./NewestProductsList";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import { useLoaderData, useSearchParams, defer, redirect, Await } from "react-router-dom";
import { useEffect, Suspense } from "react";

export default function HomePage() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { productsRows, contactDetails } = useLoaderData();

    const message = searchParams.get('message');
    const messageType = searchParams.get('type');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setSearchParams({});
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [message, setSearchParams]);

    return <>
        {message && <Message message={message} messageType={messageType} />}
        <HomeHeader />
        <AboutUs />
        <NewestProductsList />
        <div className="container mt-3 d-flex flex-column justify-content-center align-items-center">
            <Suspense fallback={
                <div className="d-flex justify-content-center align-items-center">
                    <Loader />
                </div>}>
                <Await resolve={productsRows}>
                    {resolvedRows =>
                        <ProductsList productsRows={resolvedRows} />}
                </Await>
            </Suspense>
        </div>

        <Suspense fallback={
            <div className="d-flex justify-content-center align-items-center">
                <Loader />
            </div>}>
            <Await resolve={contactDetails}>
                {resolvedData =>
                    <ContactUs contactDetails={resolvedData} />}
            </Await>
        </Suspense>
    </>;
}

async function loadProductsData(page, categories, price, alpha, productsView, search, priceRange, brand, quantities, flavours) {
    async function storeImages(productsRows) {
        const products = productsRows.flat();

        const imagePromises = products.map(async (p) => {
            await getImageByProductId(p.productId);
        });

        await Promise.all(imagePromises);
    }

    try {
        if (categories || price || alpha || brand || priceRange || quantities || flavours) {
            sessionStorage.setItem("page", 1);
        }

        let products = await allProducts(Number(page), categories, price, alpha, productsView, search, priceRange, brand, quantities, flavours);

        if (!products.ok) {
            sessionStorage.setItem("productsCount", 0);
            return redirect("/?message=Invalid Page!&type=danger");
        }

        const { productsRows, count, maxPrice } = await products.json();

        sessionStorage.setItem("productsCount", count);
        sessionStorage.setItem("productsView", productsView);
        sessionStorage.setItem("maxPrice", maxPrice);

        await storeImages(productsRows);

        return productsRows;
    } catch (error) {
        return redirect("/?message=Internal Server Error!&type=danger");
    }
}

async function getPromotions() {
    const result = await allPromotions();
    return result;
}

// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
    const page = Number(1);

    return defer({
        productsRows: loadProductsData(
            page, "", "", "", "all", "", "", "", "", ""),
        promotions: await getPromotions(),
        page,
        contactDetails: getContactDetails()
    })
}