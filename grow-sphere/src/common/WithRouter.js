// Import necessary hooks from 'react-router-dom'.
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Define a higher-order component (HOC) named withRouter.
export const withRouter = (Component) => {
    // Define a new functional component that wraps the passed-in component.
    function ComponentWithRouterProp(props) {
        // useLocation hook to get the current location object which represents the current URL.
        let location = useLocation();
        // useNavigate hook to allow navigation to different routes programmatically.
        let navigate = useNavigate();
        // useParams hook to fetch URL parameters.
        let params = useParams();

        // Render the original component with the new 'router' prop, which includes location, navigate, and params.
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    // Return the new component that now has access to routing props.
    return ComponentWithRouterProp;
};
