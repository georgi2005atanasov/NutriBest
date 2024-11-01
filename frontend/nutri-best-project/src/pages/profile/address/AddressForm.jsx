import styles from "../css/Profile.module.css";
import TextInput from "../../../components/UI/MUI Form Fields/TextInput";
import AutoCompleteInput from "../../../components/UI/MUI Form Fields/AutoCompleteInput";
import { allCitiesWithCountries, getUserAddress, setUserAddress } from "../../../../../../backend/api/api";
import { redirect, useLoaderData } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProfileSideBar from "../../../components/Profile/ProfileSideBar";
import { getAuthToken } from "../../../utils/auth";
import useAuth from "../../../hooks/useAuth";

export default function AddressForm() {
    const token = getAuthToken();
    const { isAuthenticated } = useAuth(token);
    const { address, allCitiesCountries } = useLoaderData();
    const [message, setMessage] = useState({
        text: "",
        type: ""
    });
    const isChanging = useRef(false);

    const [newAddress, setNewAddress] = useState({
        country: address && address.country || "",
        city: address && address.city || "",
        postalCode: address && address.postalCode || "",
        street: address && address.street || "",
        streetNumber: address && address.streetNumber || "",
    });

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const uniqueCountries = allCitiesCountries.map((x, index) => ({ country: x.country, id: `country-${index}` }));
        setCountries(uniqueCountries);
    }, [allCitiesCountries]);

    useEffect(() => {
        const selectedCountry = allCitiesCountries.find(x => x.country === newAddress.country);
        if (selectedCountry) {
            setCities(selectedCountry.cities.map((y, index) => ({
                cityName: y.cityName,
                id: `${selectedCountry.country}-${y.cityName}-${index}`
            })));
        } else {
            setCities([]);
        }
    }, [newAddress.country, allCitiesCountries]);

    if (!isAuthenticated) {
        redirect("/message=Page Not Found&type=danger");
    }

    const handleCountryChange = (event, newValue) => {
        const country = newValue ? newValue.country : '';
        handleChange("country", country);
        handleChange("city", '');
    };

    const handleCityChange = (event, newValue) => {
        const city = newValue ? newValue.cityName : '';
        handleChange("city", city);
    };

    const defaultCountry = countries.find(country => country.country === newAddress.country) || null;

    const defaultCity = cities.find(city => city.cityName === newAddress.city) || null;

    function handleChange(identifier, value) {
        setNewAddress(prev => ({
            ...prev,
            [identifier]: value
        }));
        isChanging.current = true;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await setUserAddress(newAddress);

        if (!response.ok) {
            const data = await response.json();

            if (data.message) {
                setMessage({
                    text: data.message,
                    type: "danger"
                });
                return;
            }

            setMessage({
                text: "Invalid data!",
                type: "danger"
            });
            return;
        }

        if (message) {
            setMessage({
                text: "Successfully Updated the Current Address!",
                type: "success"
            });
        }

        isChanging.current = false;
    }

    return (<>
        <motion.div
            className="d-flex flex-column justify-content-center align-items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <ProfileSideBar />
            <hr className={styles["profile-info-line"]} />
            <h2 className="d-flex justify-content-center mt-3 mb-3">Address</h2>
            {message && <span className={message.type == "success" ? "text-success" : "text-danger"}>{message.text}</span>}
            <form onSubmit={handleSubmit} method="post" className="w-75 ms-3">
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
                        value={newAddress.postalCode}
                        styles="w-25 ms-2"
                        onChange={(event) => handleChange("postalCode", event.target.value)}
                    />
                </div>

                <TextInput
                    id="street"
                    label="Street"
                    value={newAddress.street}
                    styles="w-100"
                    onChange={(event) => handleChange("street", event.target.value)}
                />

                <TextInput
                    id="streetNumber"
                    label="Street Number"
                    value={newAddress.streetNumber}
                    styles="w-100"
                    onChange={(event) => handleChange("streetNumber", event.target.value)}
                />

                <div className="mb-2"></div>

                {isChanging.current && <div className="d-flex justify-content-center align-items-center">
                    <button className={`${styles["set-address-button"]} 
                            d-flex justify-content-center align-items-center`}>
                        Set Address
                    </button>
                </div>}
            </form>
        </motion.div>
    </>);
}

export async function loader({ request, params }) {
    try {
        const response = await getUserAddress();
        const allCitiesCountries = await allCitiesWithCountries();

        if (!response.ok) {
            return {
                address: "",
                allCitiesCountries: ""
            };
        }

        return {
            address: await response.json(),
            allCitiesCountries
        }
    } catch (message) {
        return {
            address: "",
            allCitiesCountries: ""
        };
    }
}