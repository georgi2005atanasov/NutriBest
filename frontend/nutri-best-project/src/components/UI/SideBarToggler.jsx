// eslint-disable-next-line react/prop-types
export default function SideBarToggler({ toggleSidebar }) {
    return <div className="toggler">
        <button onClick={toggleSidebar} className="d-flex d-md-none">
            {/* You can add an icon or text for the toggler here */}
            Menu
        </button>
    </div>
}