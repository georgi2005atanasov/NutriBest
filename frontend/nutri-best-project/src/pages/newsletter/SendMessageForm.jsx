import styles from "./css/SendMessageForm.module.css";
import Header from "../../components/UI/Shared/Header";
import TextInput from "../../components/UI/MUI Form Fields/TextInput";
import { getFormData } from "../../utils/utils";
import { sendMessageToSubscribers } from "../../../../../backend/api/email";
import { motion } from "framer-motion";
import { Form, redirect, useActionData, useSubmit } from "react-router-dom";
import { useEffect } from "react";

export default function SendMessageForm({ groupType }) {
    const submit = useSubmit();

    const groups = {
        "all": "All Subscribers",
        "guests": "Guests",
        "users": "Users",
        "withOrders": "Subscribers With Orders",
        "withoutOrders": "Subscribers Without Orders"
    };

    const dataModel = useActionData();

    useEffect(() => {
        async function sendMessages() {
            await sendMessageToSubscribers(dataModel.data.subject, dataModel.data.body, dataModel.data.groupType);
        }

        if (dataModel) {
            sendMessages();
            submit(null, {
                action: "/newsletter/list",
                method: "GET"
            });
        }
    }, [dataModel, submit]);

    return <motion.div
        className="w-100 mt-0"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
    >
        <Header text={`Send Message to: ${groups[sessionStorage.getItem("newsletter-group-type")]}`} />
        <Form method="post">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-12">
                        <TextInput
                            id="subject"
                            label="Subject"
                        />

                        <TextInput
                            id="body"
                            label="Additional Comment"
                            rows={4}
                            variant="outlined"
                            multiline
                        />

                        <input type="hidden" id="groupType" name="groupType" value={groups[sessionStorage.getItem("newsletter-group-type")]} />

                        <div className="d-flex justify-content-center">
                            <button className={styles["send-message-btn"]}>Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </motion.div>
}

export async function action({ request, params }) {
    try {
        const data = await getFormData(request);
        return {
            data
        };
    } catch (error) {
        return redirect("/?message=Something Went Wrong!&type=danger");
    }
}