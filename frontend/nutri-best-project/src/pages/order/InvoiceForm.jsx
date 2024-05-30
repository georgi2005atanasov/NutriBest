/* eslint-disable react/prop-types */
import TextInput from "../../components/UI/MUI Form Fields/TextInput"

export default function InvoiceForm({ invoice, setInvoice, errors }) {
    return <div>
        <TextInput
            id="firstName"
            label="First Name"
            value={invoice.firstName}
            onChange={(event) => setInvoice("firstName", event.target.value)}
            error={errors && errors["Invoice.FirstName"]}
        />

        <TextInput
            id="lastName"
            label="Last Name"
            value={invoice.lastName}
            onChange={(event) => setInvoice("lastName", event.target.value)}
            error={errors && errors["Invoice.LastName"]}
        />

        <TextInput
            id="companyName"
            label="Company Name"
            value={invoice.companyName}
            onChange={(event) => setInvoice("companyName", event.target.value)}
            error={errors && errors["Invoice.CompanyName"]}
        />

        <TextInput
            id="phoneNumber"
            label="Phone Number"
            value={invoice.phoneNumber}
            onChange={(event) => setInvoice("phoneNumber", event.target.value)}
            error={errors && errors["Invoice.PhoneNumber"]}
        />

        <TextInput
            id="bullstat"
            label="Bullstat"
            value={invoice.bullstat}
            onChange={(event) => setInvoice("bullstat", event.target.value)}
            error={errors && errors["Invoice.Bullstat"]}
        />

        <TextInput
            id="personInCharge"
            label="Person In Charge"
            value={invoice.personInCharge}
            onChange={(event) => setInvoice("personInCharge", event.target.value)}
            error={errors && errors["Invoice.PersonInCharge"]}
        />

        <TextInput
            id="VAT"
            label="VAT"
            value={invoice.VAT}
            onChange={(event) => setInvoice("VAT", event.target.value)}
            error={errors && errors["Invoice.VAT"]}
        />
    </div>
}