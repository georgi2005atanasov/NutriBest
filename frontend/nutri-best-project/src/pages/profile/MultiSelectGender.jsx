// eslint-disable-next-line react/prop-types
export default function MultiSelectGender({styles, handleChange, handleFocus}) {
    return <menu className={`${styles} p-0`}>
        <label htmlFor="gender" className="mx-3">Gender:</label>
        <select onFocus={handleFocus}
            onChange={handleChange} name="gender" id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unspecified">Unspecified</option>
        </select>
    </menu>;
}