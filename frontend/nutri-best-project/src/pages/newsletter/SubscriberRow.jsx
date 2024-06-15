/* eslint-disable react/prop-types */

export default function SubscriberRow({ subscriber }) {
    return <tr>
        <td>{subscriber.email}</td>
        <td>
            {subscriber.isAnonymous ? "Yes" : "No"}
        </td>
        <td>
            {subscriber.totalOrders}
        </td>
        <td>{new Date(subscriber.registeredOn).toLocaleDateString()}</td>
        <td>
            {subscriber.name || <strong>-</strong>}
        </td>
    </tr>
}