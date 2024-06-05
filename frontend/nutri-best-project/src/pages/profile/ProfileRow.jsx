/* eslint-disable react/prop-types */
import { getDate } from "../../utils/utils";

export default function ProfileRow({ profile }) {
    return <tr>
        <td>{profile.profileId}</td>
        <td>{getDate(profile.madeOn)}</td>
        <td>{profile.email}</td>
        <td>{profile.name || <strong>-</strong>}</td>
        <td>{profile.city  || <strong>-</strong>}</td>
        <td>{profile.phoneNumber || <strong>-</strong>}</td>
        <td>{profile.totalOrders  || <strong>-</strong>}</td>
        <td className="d-flex justify-content-evenly align-items-center p-3">
            coming soon...
        </td>
    </tr>;
}