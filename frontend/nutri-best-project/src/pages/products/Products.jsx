import { Outlet } from "react-router-dom"
import CategoryContextProvider from "../../store/CategoryContext"

export default function ProductsLayout() {
    return <CategoryContextProvider>
        <Outlet />
    </CategoryContextProvider>
}