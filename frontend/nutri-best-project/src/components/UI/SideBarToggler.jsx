// eslint-disable-next-line react/prop-types
export default function SideBarToggler({ toggleSidebar }) {
    return <button onClick={toggleSidebar} className="d-block d-md-none">
        {/* You can add an icon or text for the toggler here */}
        Menu
    </button>
}