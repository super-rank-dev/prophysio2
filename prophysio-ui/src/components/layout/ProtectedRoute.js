import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Status401 from "../status/Status401";

const ProtectedRoute = () => {

    const { isAuthenticated } = useSelector(({ auth }) => auth);

    return (
        <>
            {isAuthenticated ?
                (<Outlet />) :
                (<Status401 />)}
        </>
    );
}

export default ProtectedRoute;