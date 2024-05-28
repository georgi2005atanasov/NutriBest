import styles from "../css/Profile.module.css";
import { FormControl, TextField, Autocomplete } from "@mui/material";
import { allCitiesWithCountries, getUserAddress } from "../../../../../../backend/api/api";
import { redirect, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileSideBar from "../ProfileSideBar";
import { getAuthToken } from "../../../utils/auth";
import useAuth from "../../../hooks/useAuth";

export default function AddressForm() {
    const token = getAuthToken();
    const { isAuthenticated } = useAuth(token);
    const { address, allCitiesCountries } = useLoaderData();

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
        setNewAddress(prevState => ({ ...prevState, country, city: '' }));
        handleChange("country", country);
        handleChange("city", '');
    };

    const handleCityChange = (event, newValue) => {
        const city = newValue ? newValue.cityName : '';
        setNewAddress(prevState => ({ ...prevState, city }));
        handleChange("city", city);
    };

    const defaultCountry = countries.find(country => country.country === newAddress.country) || null;

    const defaultCity = cities.find(city => city.cityName === newAddress.city) || null;


    function handleChange(identifier, value) {
        setNewAddress(prev => ({
            ...prev,
            [identifier]: value
        }));
    }

    function handleSubmit() {
        console.log(123);
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
                    defaultValue={newAddress.postalCode}
                    onChange={(event) => handleChange("streetNumber", event.target.value)}
                />

                <button>Set Address</button>
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
    } catch (error) {
        return {
            address: "",
            allCitiesCountries: ""
        };
    }
}