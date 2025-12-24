import axios from "axios";

/**
 * @author VAMPETA
 * @brief CONFIGURA O AXIOS
*/
export default function config_axios() {
	axios.defaults.validateStatus = () => true;
}