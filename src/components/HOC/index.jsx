import { Navigate } from "react-router-dom";

export const PrivateComponents = (Component) => (props) => {
    const token = localStorage.getItem("token");
    return token ? (<Component />) : <div>hello</div>
}
export default PrivateComponents