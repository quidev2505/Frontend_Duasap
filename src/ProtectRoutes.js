import {Navigate, Outlet} from 'react-router';

const useAuth = () => {
    const local = localStorage.getItem('already_login');
    const user = { loggedIn: local === 'true'};
    return user&&user.loggedIn;
}

const ProtectRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/admin-duasap" />
}

export default ProtectRoutes;