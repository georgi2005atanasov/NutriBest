/* eslint-disable react/prop-types */
import styles from "../../Form/css/SelectBrand.module.css";
import selected from "../css/SideBar.module.css";
import DropdownMenu from "../../Dropdown/DropdownMenu"
import { motion } from "framer-motion"
import { useSubmit } from "react-router-dom";

export default function BrandFilter({ brands }) {
    const submit = useSubmit();

    function handleSelect(brand) {
        sessionStorage.setItem("brand", brand);

        submit(null, {action: "", method: "GET"});
    }

    return <DropdownMenu filtersNumber={sessionStorage.getItem("brand") ? 1 : 0} text={"Brand"}>
        <motion.ul
            className={styles["dropdown-list"]}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            {brands.map(b => (
                <motion.li
                    key={b.name}
                    className={`${styles["dropdown-item"]} 
                    ${sessionStorage.getItem("brand") === b.name ? selected["selected-filter"] : null} text-center`}
                    onClick={() => handleSelect(b.name)}
                    whileTap={{ scale: 1.0 }}
                >
                    {b.name}
                </motion.li>
            ))}
        </motion.ul>
    </DropdownMenu>
}