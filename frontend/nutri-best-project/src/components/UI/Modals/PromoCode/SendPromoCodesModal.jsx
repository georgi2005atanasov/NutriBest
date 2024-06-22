/* eslint-disable react/prop-types */
import Modal from "../Modal";
import SubscribersPromoCodeSelector from "../Profile/SubscribersPromoCodeSelector";
import { Button } from "@mui/material";
import { allPromoCodes } from "../../../../../../../backend/api/promoCodes";
import { sendPromoCodeToSubscribers } from "../../../../../../../backend/api/email";
import { useSubmit } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types, no-empty-pattern
const SendPromoCodesModal = forwardRef(function SendPromoCodesModal({}, ref) {
    const [promoCodes, setPromoCodes] = useState();
    const [chosenPromo, setChosenPromo] = useState();
    const submit = useSubmit();

    useEffect(() => {
        async function handlePromoCodes() {
            const response = await allPromoCodes();

            if (!response.ok) {
                return;
            }

            const promoCodesResult = await response.json();
            console.log(promoCodesResult);

            setPromoCodes(promoCodesResult);
        }

        handlePromoCodes();
    }, []);

    function handleClose(event) {
        event.stopPropagation();
        ref.current.close();
    }

    async function handleSend() {
        ref.current.close();
        const result = await sendPromoCodeToSubscribers("Newsletter Promo Code!",
            sessionStorage.getItem("newsletter-group-type"),
            chosenPromo);

        if (result.message) {
            submit(`message=${result.message}&type=danger`, {
                action: "/newsletter/list",
                method: "GET"
            })
        }
    }

    return <>
        <Modal ref={ref}>
            {promoCodes && <SubscribersPromoCodeSelector
                promoCodes={promoCodes}
                handleSelect={setChosenPromo}
                handleClose={handleClose} />}
            <div className="d-flex justify-content-center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                    sx={{ padding: '10px 20px' }}>
                    Send Promo Code
                </Button>
            </div>
        </Modal>
    </>;
});

export default SendPromoCodesModal;