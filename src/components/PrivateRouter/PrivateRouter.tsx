import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentUserRole } from '../../store/user/selectors';

interface PrivateRouterProps {
	children?: React.ReactNode;
}

// It`s not routeR, like in task description, but just route, so i call it PrivateRoute
const PrivateRoute: React.FC<PrivateRouterProps> = ({ children }) => {
	const userRole = useSelector(selectCurrentUserRole);

	if (userRole === 'admin') {
		return <>{children}</>;
	} else {
		return <Navigate to={'/courses'} />;
	}
};

export default PrivateRoute;
