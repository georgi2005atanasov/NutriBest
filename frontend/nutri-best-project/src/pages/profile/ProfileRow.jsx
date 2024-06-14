/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProfileRow({ profile, isAdmin, handleGrant }) {
    return <motion.tr className="">
        <td>{profile.userName}</td>
        <td>{new Date(profile.madeOn).toLocaleDateString()}</td>
        <td>{profile.email}</td>
        <td>{profile.name || <strong>-</strong>}</td>
        <td>{profile.phoneNumber || <strong>-</strong>}</td>
        <td>{profile.totalOrders || <strong>-</strong>}</td>
        <td>{(profile.totalSpent && `${profile.totalSpent} BGN`) || <strong>-</strong>}</td>
        <td>{profile.roles || <strong>-</strong>}</td>
        {isAdmin ?
            <td className="p-md-3 p-1">
                <Link onClick={() => handleGrant(profile.name, profile.profileId, profile.roles)} className={`${styles["btn"]} ${styles["delete"]} text-nowrap text-center me-1`}>Grant as</Link>
                {/* be aware */}
                <Link to={profile.roles != "Administrator" ? `/profile/${profile.profileId}` : ``} className={`${styles["btn"]} ${styles["details"]} text-center me-1`}>More...</Link>
            </td> :
            <td>None</td>}
        <td className={profile.isDeleted ? "text-danger" : "text-success"}>{profile.isDeleted ? "Yes" : "No"}</td>
    </motion.tr>;
}