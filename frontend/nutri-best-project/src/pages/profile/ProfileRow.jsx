/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import { getDate } from "../../utils/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProfileRow({ profile, isAdmin, handleGrant }) {
    return <motion.tr className="">
        <td>{profile.profileId}</td>
        <td>{getDate(profile.madeOn)}</td>
        <td>{profile.email}</td>
        <td>{profile.name || <strong>-</strong>}</td>
        <td>{profile.phoneNumber || <strong>-</strong>}</td>
        <td>{profile.totalOrders || <strong>-</strong>}</td>
        <td>{(profile.totalSpent && `${profile.totalSpent} BGN`) || <strong>-</strong>}</td>
        <td>{profile.roles || <strong>-</strong>}</td>
        {isAdmin ?
            <td className="p-md-3 p-1">
                <Link onClick={() => handleGrant(profile.profileId, profile.roles)} className={`${styles["btn"]} ${styles["delete"]} text-nowrap text-center me-1`}>Grant as</Link>
                <Link className={`${styles["btn"]} ${styles["details"]} text-center me-1`}>More...</Link>
            </td> :
            <td>None</td>}
    </motion.tr>;
}