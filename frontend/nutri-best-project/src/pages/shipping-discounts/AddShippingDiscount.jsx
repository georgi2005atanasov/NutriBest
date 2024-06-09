import styles from "./css/AddShippingDiscount.module.css";
import Header from "../../components/UI/Shared/Header";
import TextInput from "../../components/UI/MUI Form Fields/TextInput";
import AutoCompleteInput from "../../components/UI/MUI Form Fields/AutoCompleteInput";
import FormButton from "../../components/UI/Form/FormButton";
import { allCitiesWithCountries } from "../../../../../backend/api/cities";
import { motion } from "framer-motion";
import { useLoaderData, useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import DateTimeField from "./DateTimeField";
import dayjs from 'dayjs';
import { createShippingDiscount } from "../../../../../backend/api/shippingDiscount";

export default function AddShippingDiscount() {
    const { allCitiesCountries } = useLoaderData();
    const [shippingDiscount, setShippingDiscount] = useState({
        description: "",
        discountPercentage: "",
        countryName: "",
        endDate: dayjs(),
        minimumPrice: ""
    });
    const [countries, setCountries] = useState();
    const [errors, setErrors] = useState();
    const defaultCountry = countries && countries.find(c => c.country === c.country) || null;
    const submit = useSubmit();

    useEffect(() => {
        const uniqueCountries = allCitiesCountries && allCitiesCountries.map((x, index) => ({ country: x.country, id: `country-${index}` }));
        setCountries(uniqueCountries);
    }, [allCitiesCountries]);

    function handleChange(identifier, value) {
        setShippingDiscount(prev => ({
            ...prev,
            [identifier]: value
        }));
    }

    const handleCountryChange = (event, newValue) => {
        const country = newValue ? newValue.country : '';
        handleChange("countryName", country);
    };

    const handleDateChange = (newValue) => {
        handleChange("endDate", newValue.toDate());
    }

    async function handleSubmit() {
        const result = await createShippingDiscount(shippingDiscount);
        console.log(result);
        if (result.id) {
            return submit("message=Successfully Added Shipping Discount!&type=success", {
                action: "/shipping-discounts/all",
                method: "GET"
            });
        }
        setErrors(result);
    }

    return <motion.div
        className="w-100 mt-0"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
    >
        <Header text="Add Shipping Discount" />
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-12">
                    <div className="d-flex justify-content-center">
                        <TextInput
                            id="Discount Percentage"
                            label="Discount Percentage"
                            styles="w-50"
                            value={shippingDiscount.discountPercentage}
                            onChange={(event) => handleChange("discountPercentage", event.target.value)}
                            error={errors && errors.key && errors.key == "DiscountPercentage"}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <TextInput
                            id="Minimum Cart Price"
                            label="Minimum Cart Price (optional)"
                            styles="w-50"
                            value={shippingDiscount.minimumPrice}
                            onChange={(event) => handleChange("minimumPrice", event.target.value)}
                            error={errors && errors.key && errors.key == "MinimumPrice"}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <AutoCompleteInput
                            id="country"
                            label="Country"
                            options={countries ? countries : []}
                            getOptionLabel={(option) => option.country}
                            defaultValue={defaultCountry}
                            width="50"
                            isOptionEqualToValue={(option, value) => option.country === value?.country}
                            renderOption={(props, option) => (
                                <li {...props} key={option.id}>
                                    {option.country}
                                </li>
                            )}
                            onChange={handleCountryChange}
                            error={errors && errors.message}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <TextInput
                            id="outlined-multiline-static"
                            label="Description"
                            rows={4}
                            value={shippingDiscount.description}
                            onChange={(event) => handleChange("description", event.target.value)}
                            variant="outlined"
                            styles="w-50"
                            multiline
                            error={errors && errors.errors && errors.errors.Description}
                        />
                    </div>

                    <div className="d-flex justify-content-center mt-3 w-100">
                        <DateTimeField
                            setEndDate={handleDateChange}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <FormButton
                            text="Add Shipping Discount"
                            wrapperStyles={`${styles["discount"]} w-50`}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
}

export async function loader() {
    const allCitiesCountries = await allCitiesWithCountries();

    return {
        allCitiesCountries
    }
}