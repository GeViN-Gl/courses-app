import React, { ComponentType } from 'react';
import { Navigate, Route } from 'react-router-dom';

interface PrivateRouteProps {
	path: string;
	isAuthenticated: boolean;
	component: ComponentType<any>;
}

const PrivateRouter: React.FC<PrivateRouteProps> = ({
	component: Component,
	isAuthenticated,
	...rest
}) => (
	<Route
		{...rest}
		element={
			isAuthenticated ? <Component /> : <Navigate to='/courses' replace />
		}
	/>
);
// When the replace prop is set to true, it replaces the current entry in the history stack
export default PrivateRouter;
