import styles from "../profile/css/Profile.module.css";
import { FormControlLabel, Checkbox } from "@mui/material";
import TextInput from "../../components/UI/MUI Form Fields/TextInput";
import AutoCompleteInput from "../../components/UI/MUI Form Fields/AutoCompleteInput";
import { getProfileDetails, getUserAddress, allCitiesWithCountries, setUserAddress, allPaymentMethods } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ListOrder from "./ListOrder";
import InvoiceForm from "./InvoiceForm";

export default function OrderForm() {
    const { address, userDetails, allCitiesCountries, paymentMethods } = useLoaderData();

    const [message, setMessage] = useState({
        text: "",
        type: ""
    });

    const isChanging = useRef(false);

    const [order, setOrder] = useState({
        country: address && address.country || "",
        city: address && address.city || "",
        postalCode: address && address.postalCode || "",
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

    console.log(order);

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

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

    const defaultCountry = countries && countries.find(country => country.country === order.country) || null;

    const defaultCity = cities && cities.find(city => city.cityName === order.city) || null;

    function handleChange(identifier, value) {
        setOrder(prev => ({
            ...prev,
            [identifier]: value
        }));
        isChanging.current = true;
    }

    function handleInvoice(identifier, value) {
        setOrder(prevOrder => ({
            ...prevOrder,
            invoice: {
                ...prevOrder.invoice,
                [identifier]: value
            }
        }));
        isChanging.current = true;
    }

    function handleSubmit() {

    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-4">
            <div className="row w-100">
                <motion.div
                    className="px-0 pb-3 card col-md-5 d-flex flex-column justify-content-center align-items-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="d-flex justify-content-center mt-2 mb-1">Create Order</h2>
                    {message && <span className={message.type === "success" ? "text-success" : "text-danger"}>{message.text}</span>}
                    <form onSubmit={handleSubmit} method="post" className="w-75 ms-3">
                        <TextInput
                            id="name"
                            label="Full Name"
                            value={order.name}
                            styles="100"
                            onChange={(event) => handleChange("name", event.target.value)}
                        />

                        <TextInput
                            id="email"
                            label="Email"
                            type="email"
                            value={order.email}
                            styles="100"
                            onChange={(event) => handleChange("email", event.target.value)}
                        />

                        <TextInput
                            id="phoneNumber"
                            label="Phone Number"
                            value={order.phoneNumber}
                            styles="w-100"
                            onChange={(event) => handleChange("phoneNumber", event.target.value)}
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
                            />

                            <TextInput
                                id="postalCode"
                                label="Postal Code"
                                value={order.postalCode}
                                styles="w-25 ms-3"
                                onChange={(event) => handleChange("postalCode", event.target.value.replace(" ", ""))}
                            />
                        </div>

                        <TextInput
                            id="street"
                            label="Street"
                            value={order.street}
                            onChange={(event) => handleChange("street", event.target.value)}
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

                            {order.hasInvoice && <InvoiceForm invoice={order.invoice} setInvoice={handleInvoice} />}

                            <AutoCompleteInput
                                id="paymentMethod"
                                label="Payment Method"
                                options={paymentMethods}
                                getOptionLabel={(option) => option}
                                value={order.paymentMethod}
                                width="100"
                                onChange={handlePaymentChange}
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
                    </form>
                </motion.div>
                <div className={`col-md-7 d-flex flex-column`}>
                    <ListOrder />
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

function splitPascalCase(words) {
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
