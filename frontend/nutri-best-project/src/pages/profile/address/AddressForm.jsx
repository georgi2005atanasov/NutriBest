import styles from "../css/Profile.module.css";
import { FormControl, TextField, Autocomplete } from "@mui/material";
import { allCitiesWithCountries, getUserAddress, setUserAddress } from "../../../../../../backend/api/api";
import { redirect, useLoaderData } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProfileSideBar from "../ProfileSideBar";
import { getAuthToken } from "../../../utils/auth";
import useAuth from "../../../hooks/useAuth";
import Message from "../../../components/UI/Shared/Message";

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
                <FormControl fullWidth className="mt-4">
                    <Autocomplete
                        id="country"
                        options={countries}
                        getOptionLabel={(option) => option.country}
                        renderInput={(params) => <TextField {...params} label="Country" />}
                        value={defaultCountry}
                        isOptionEqualToValue={(option, value) => option.country === value?.country}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                {option.country}
                            </li>
                        )}
                        onChange={handleCountryChange}
                    />
                </FormControl>

                <FormControl fullWidth className="mt-4">
                    <Autocomplete
                        id="city"
                        options={cities}
                        getOptionLabel={(option) => option.cityName}
                        renderInput={(params) => <TextField {...params} label="City" />}
                        value={defaultCity}
                        isOptionEqualToValue={(option, value) => option.cityName === value?.cityName}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                {option.cityName}
                            </li>
                        )}
                        onChange={handleCityChange}
                    />
                </FormControl>

                <div className="mt-3"></div>

                <TextField
                    fullWidth
                    margin="normal"
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code"
                    defaultValue={newAddress.postalCode && newAddress.postalCode}
                    onChange={(event) => handleChange("postalCode", event.target.value)}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    id="street"
                    name="street"
                    label="Street"
                    defaultValue={newAddress.street && newAddress.street}
                    onChange={(event) => handleChange("street", event.target.value)}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    id="streetNumber"
                    name="streetNumber"
                    label="Street Number"
                    defaultValue={newAddress.streetNumber}
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