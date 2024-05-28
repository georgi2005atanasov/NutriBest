import { Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import { allCitiesWithCountries, getUserAddress } from "../../../../../../backend/api/api";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { useState } from "react";

export default function AddressForm() {
    const { address, allCitiesCountries } = useLoaderData();

    const data = useActionData();

    const [newAddress, setNewAddress] = useState({
        country: address.country || "",
        city: address.city || "",
        postalCode: address.postalCode || "",
        street: address.street || "",
        streetNumber: address.streetNumber || "",
    });

    function handleChange(identifier, value) {
        setNewAddress(prev => ({
            ...prev,
            [identifier]: value
        }));
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <Form method="post" className="w-75">
                <FormControl fullWidth>
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select
                        labelId="country-select-label"
                        id="country"
                        defaultValue={address.country && address.country}
                        onChange={(event) => handleChange("country", event.target.value)}
                        label="Country"
                    >
                        {allCitiesCountries && allCitiesCountries.map((x, index) => (
                            <MenuItem key={index} value={x.country}>
                                {x.country}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth className="mt-4">
                    <InputLabel id="city-select-label">City</InputLabel>
                    <Select
                        labelId="city-select-label"
                        id="city"
                        defaultValue={address.city && address.city}
                        onChange={(event) => handleChange("city", event.target.value)}
                        label="City"
                    >
                        {allCitiesCountries && allCitiesCountries
                            .filter(x => x.country == newAddress.country)
                            .map((x, index) => (
                                x && x.cities && x.cities.map(y => <MenuItem key={index} value={y.cityName}>
                                    {y.cityName}
                                </MenuItem>)
                            ))}
                    </Select>
                </FormControl>

                <div className="mt-3"></div>

                <TextField
                    className="d-block"
                    margin="normal"
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code"
                    defaultValue={newAddress.postalCode && newAddress.postalCode}
                    onChange={(event) => handleChange("postalCode", event.target.value)}
                />

                <TextField
                    className="d-block"
                    margin="normal"
                    id="street"
                    name="street"
                    label="Street"
                    defaultValue={newAddress.street && newAddress.street}
                    onChange={(event) => handleChange("street", event.target.value)}
                />

                <TextField
                    className="d-block"
                    margin="normal"
                    id="streetNumber"
                    name="streetNumber"
                    label="Street Number"
                    defaultValue={newAddress.postalCode}
                    onChange={(event) => handleChange("streetNumber", event.target.value)}
                />
            </Form>
        </div>);
}

export async function loader({ request, params }) {
    try {
        const response = await getUserAddress();
        const allCitiesCountries = await allCitiesWithCountries();

        if (!response.ok) {
            return null;
        }

        return {
            address: await response.json(),
            allCitiesCountries
        }
    } catch (error) {
        return redirect("/error");
    }
}