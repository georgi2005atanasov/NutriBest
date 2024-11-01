/* eslint-disable no-constant-condition */
import styles from "./css/ListOrder.module.css";
import ListOrder from "./ListOrder";
import InvoiceForm from "./InvoiceForm";
import Loader from "../../components/UI/Shared/Loader";
import { FormControlLabel, Checkbox } from "@mui/material";
import TextInput from "../../components/UI/MUI Form Fields/TextInput";
import AutoCompleteInput from "../../components/UI/MUI Form Fields/AutoCompleteInput";
import { CartContext } from "../../store/CartContext";
import { getCart, getImageByProductId, getProfileDetails, getUserAddress, allCitiesWithCountries, allPaymentMethods, createGuestOrder, createUserOrder, sendConfirmOrderMessage, sendOrderToAdmin } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { useNavigation, useLoaderData, useSubmit } from "react-router-dom";
import { useState, useEffect, Suspense, useContext, useCallback } from "react";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import OrderRelatedProducts from "../../components/Order/OrderRelatedProducts";

export default function OrderForm() {
    const token = getAuthToken();
    const { isAuthenticated } = useAuth(token);
    const submit = useSubmit();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState([]);
    const { cart, setCart } = useContext(CartContext);

    const { address, userDetails, allCitiesCountries, paymentMethods } = useLoaderData();

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    const [order, setOrder] = useState({
        country: address && address.country || "",
        city: address && address.city || "",
        postalCode: address && address.postalCode && address.postalCode.toString() || "",
        street: address && address.street || "",
        streetNumber: address && address.streetNumber || "",
        name: userDetails && userDetails.name || "",
        email: userDetails && userDetails.email || "",
        phoneNumber: "",
        hasInvoice: false,
        invoice: {
            firstName: "",
            lastName: "",
            companyName: "",
            phoneNumber: "",
            bullstat: "",
            personInCharge: "",
            VAT: ""
        },
        paymentMethod: paymentMethods && paymentMethods[0],
        comment: ""
    });

    const defaultCountry = countries && countries.find(country => country.country === order.country) || null;
    const defaultCity = cities && cities.find(city => city.cityName === order.city) || null;
    const shippingPrice = allCitiesCountries &&
        allCitiesCountries
            .filter(x => x.country == order.country)
            .map(x => x.shippingPrice)[0];
    const shippingPriceWithDiscount = allCitiesCountries &&
        allCitiesCountries
            .filter(x => x.country == order.country)
            .map(x => x.shippingPriceWithDiscount)[0];
    const minimumPriceForDiscount = allCitiesCountries &&
        allCitiesCountries
            .filter(x => x.country == order.country)
            .map(x => x.minimumPriceForDiscount)[0];

    const getCartProducts = useCallback(async function getCartProducts() {
        const cartData = await getCart();

        for (const { product } of cartData.cartProducts) {
            product.image = await getImageByProductId(product.productId);
        }

        setCart(cartData);
    }, [setCart]);

    useEffect(() => {
        const uniqueCountries = allCitiesCountries && allCitiesCountries.map((x, index) => ({ country: x.country, id: `country-${index}` }));
        setCountries(uniqueCountries);
    }, [allCitiesCountries]);

    useEffect(() => {
        const selectedCountry = allCitiesCountries && allCitiesCountries.find(x => x.country === order.country);
        if (selectedCountry) {
            setCities(selectedCountry.cities.map((y, index) => ({
                cityName: y.cityName,
                id: `${selectedCountry.country}-${y.cityName}-${index}`
            })));
        } else {
            setCities([]);
        }
    }, [order.country, allCitiesCountries]);

    const handleCountryChange = (event, newValue) => {
        const country = newValue ? newValue.country : '';
        handleChange("country", country);
        handleChange("city", '');
    };

    const handleCityChange = (event, newValue) => {
        const city = newValue ? newValue.cityName : '';
        handleChange("city", city);
    };

    const handlePaymentChange = (event, newValue) => {
        const paymentMethod = newValue ? newValue : '';
        handleChange("paymentMethod", paymentMethod);
    };

    function handleChange(identifier, value) {
        setOrder(prev => ({
            ...prev,
            [identifier]: value
        }));
    }

    function handleInvoice(identifier, value) {
        setOrder(prevOrder => ({
            ...prevOrder,
            invoice: {
                ...prevOrder.invoice,
                [identifier]: value
            }
        }));
    }

    async function handleSubmit() {
        const data = JSON.parse(JSON.stringify(order));

        if (!order.hasInvoice) {
            delete data.invoice;
        }

        if (cart.cartProducts.length == 0) {
            return submit("message=Your Cart is Empty&type=danger",
                { action: "/", method: "GET" }
            );
        }

        data.paymentMethod = data.paymentMethod.replaceAll(" ", "");

        if (!isAuthenticated) {
            const result = await createGuestOrder(data);

            if (result.errors) {
                setErrors(result.errors);
                return;
            }
            if (result.message) {
                setErrors({ message: result.message });
                return;
            }
            if (result.status && result.status == "400") {
                return;
            }

            window.scrollTo({
                top: 200,
                left: 0,
                behavior: 'smooth'
            });

            const totalPrice = cart.totalProducts;

            await getCartProducts();

            submit(`orderId=000000${result.id}`, { action: `/order/finished`, method: "GET" });

            const confirmOrderResponse = sendConfirmOrderMessage(
                order.email,
                order.name,
                result.id,
                `http://localhost:5173/order/confirm?orderId=${result.id}`
            );
            
            const sendToAdminResponse = sendOrderToAdmin(
                order.email,
                order.name,
                order.email,
                order.phoneNumber,
                result.id,
                `http://localhost:5173/order/finished?orderId=${result.id}`,
                totalPrice
            );
            
            Promise.all([confirmOrderResponse, sendToAdminResponse])
        } else {
            const result = await createUserOrder(data);

            if (result.errors) {
                setErrors(result.errors);
                return;
            }
            if (result.message) {
                setErrors({ message: result.message });
                return;
            }
            if (result.status && result.status == "400") {
                return;
            }

            window.scrollTo({
                top: 200,
                left: 0,
                behavior: 'smooth'
            });

            const totalPrice = cart.totalProducts;

            await getCartProducts();

            submit(`orderId=000000${result.id}`, { action: `/order/finished`, method: "GET" });

            const confirmOrderResponse = sendConfirmOrderMessage(
                order.email,
                order.name,
                result.id,
                `http://localhost:5173/order/confirm?orderId=${result.id}`
            );
            
            const sendToAdminResponse = sendOrderToAdmin(
                order.email,
                order.name,
                order.email,
                order.phoneNumber,
                result.id,
                `http://localhost:5173/order/finished?orderId=${result.id}`,
                totalPrice
            );
            
            Promise.all([confirmOrderResponse, sendToAdminResponse])
        }
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-4">
            {isSubmitting && <Loader />}
            <div className="row w-100">
                <motion.div
                    className="px-0 pb-3 card col-md-5 d-flex flex-column justify-content-center align-items-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="d-flex justify-content-center mt-2 mb-1">Create Order</h2>
                    <form onSubmit={handleSubmit} method="post" className="w-75 ms-3">
                        <TextInput
                            id="name"
                            label="Full Name"
                            value={order.name}
                            styles="100"
                            onChange={(event) => handleChange("name", event.target.value)}
                            error={errors && errors.Name}
                        />

                        <TextInput
                            id="email"
                            label="Email"
                            type="email"
                            value={order.email}
                            styles="100"
                            onChange={(event) => handleChange("email", event.target.value)}
                            error={errors && errors.Email}
                        />

                        <TextInput
                            id="phoneNumber"
                            label="Phone Number"
                            value={order.phoneNumber}
                            styles="w-100"
                            onChange={(event) => handleChange("phoneNumber", event.target.value)}
                            error={errors && errors.PhoneNumber}
                        />

                        <AutoCompleteInput
                            id="country"
                            label="Country"
                            options={countries}
                            getOptionLabel={(option) => option.country}
                            value={defaultCountry}
                            width="100"
                            isOptionEqualToValue={(option, value) => option.country === value?.country}
                            renderOption={(props, option) => (
                                <li {...props} key={option.id}>
                                    {option.country}
                                </li>
                            )}
                            onChange={handleCountryChange}
                            error={errors && errors.CountryName}
                        />

                        <div className="d-flex w-100">
                            <AutoCompleteInput
                                id="city"
                                label="City"
                                options={cities}
                                getOptionLabel={(option) => option.cityName}
                                value={defaultCity}
                                width="75"
                                isOptionEqualToValue={(option, value) => option.cityName === value?.cityName}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.id}>
                                        {option.cityName}
                                    </li>
                                )}
                                onChange={handleCityChange}
                                error={errors && errors.City}
                            />

                            <TextInput
                                id="postalCode"
                                label="Postal Code"
                                value={order.postalCode}
                                styles="w-25 ms-3"
                                onChange={(event) => handleChange("postalCode", event.target.value.replace(" ", ""))}
                                error={errors && errors.PostalCode}
                                type="number"
                            />
                        </div>

                        <TextInput
                            id="street"
                            label="Street"
                            value={order.street}
                            onChange={(event) => handleChange("street", event.target.value)}
                            error={errors && errors.Street}
                        />

                        <TextInput
                            id="streetNumber"
                            label="Street Number"
                            value={order.streetNumber}
                            onChange={(event) => handleChange("streetNumber", event.target.value)}
                        />

                        <div className="d-flex flex-column">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(event) => handleChange("hasInvoice", event.target.checked)}
                                        defaultValue={order.hasInvoice}
                                        name="hasInvoice"
                                        color="primary"
                                    />
                                }
                                label="I want an invoice"
                            />

                            {order.hasInvoice && <InvoiceForm errors={errors} invoice={order.invoice} setInvoice={handleInvoice} />}

                            <AutoCompleteInput
                                id="paymentMethod"
                                label="Payment Method"
                                options={paymentMethods}
                                getOptionLabel={(option) => option}
                                value={order.paymentMethod}
                                width="100"
                                onChange={handlePaymentChange}
                                error={errors && errors.PaymentMethod}
                            />

                            <TextInput
                                id="outlined-multiline-static"
                                label="Additional Comment"
                                rows={4}
                                value={order.comment}
                                onChange={(event) => handleChange("comment", event.target.value)}
                                variant="outlined"
                                multiline
                            />
                        </div>

                        <div className="mb-2"></div>
                        {errors && errors.message && <span className="text-danger">{errors.message}</span>}
                    </form>
                </motion.div>
                <div className={`col-md-7 d-flex flex-column`}>
                    <div className="d-flex flex-column">
                        <Suspense fallback={<Loader />}>
                            <ListOrder
                                shippingPrice={shippingPrice}
                                shippingPriceWithDiscount={shippingPriceWithDiscount}
                                minimumPrice={minimumPriceForDiscount}
                            />
                        </Suspense>
                        <button onClick={!isSubmitting ? handleSubmit : () => { }} className={styles["button-confirm-order"]}>Confirm Order</button>
                        <div className="position-relative">
                            <OrderRelatedProducts
                                totalProducts={cart && cart.totalProducts}
                                shippingPrice={shippingPrice}
                                shippingPriceWithDiscount={shippingPriceWithDiscount}
                                minimumPrice={minimumPriceForDiscount} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function loader({ request, params }) {
    try {
        const addressRes = await getUserAddress();
        const userDetailsRes = await getProfileDetails();
        const allCitiesCountries = await allCitiesWithCountries();
        const paymentMethodsResult = await allPaymentMethods();

        let paymentMethods = splitPascalCase(paymentMethodsResult);

        if (!addressRes || !userDetailsRes || addressRes.ok === false || userDetailsRes.ok === false) {
            return {
                address: null,
                userDetails: null,
                allCitiesCountries,
                paymentMethods
            }
        }

        const address = await addressRes.json();
        const userDetails = await userDetailsRes.json();

        return {
            address,
            userDetails,
            allCitiesCountries,
            paymentMethods
        }
    } catch (error) {
        return {
            address: null,
            userDetails: null,
            allCitiesCountries: null,
            paymentMethods: null
        }
    }
}

export function splitPascalCase(words) {
    const paymentMethods = [];

    for (const word of words) {
        let result = [];
        let currentWord = '';

        for (let i = 0; i < word.length; i++) {
            if (word[i] === word[i].toUpperCase() && currentWord.length > 0) {
                result.push(currentWord);
                currentWord = word[i];
            } else {
                currentWord += word[i];
            }
        }
        result.push(currentWord);
        paymentMethods.push(result.join(" "));
    }

    return paymentMethods;
}
