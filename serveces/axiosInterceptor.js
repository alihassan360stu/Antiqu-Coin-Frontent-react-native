import axios from 'axios';
import baseUrl from "./baseUrl"
import { apiLoading } from "../redux/action/constant"
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../redux/action/auth"

const AxiosInterceptor = ({ props }) => {
    const token = useSelector(({ auth }) => auth.token)
    const dispatch = useDispatch()
    axios.defaults.baseURL = baseUrl.api;
    axios.interceptors.request.use(function (config) {
        if (config) {
            dispatch(apiLoading(true))
            var headers = {
                ...config.headers, Authorization: `Bearer ${token}`
            }
            return { ...config, headers }
        }

    }, function (error) {
        if (error) {
            dispatch(apiLoading(true))
        }
        return Promise.reject(error);
    });


    // editing responce (handle loading , error )
    axios.interceptors.response.use(async function (response) {
        if (response) {
            dispatch(apiLoading(false))
            let result = response.data;
            if (result?.status === false && (result?.code === 1001 || result?.message === "Unauthorize")) {
                try {
                    await AsyncStorage.removeItem("user")
                    await AsyncStorage.removeItem("token")
                    dispatch(logout())
                } catch (e) {

                }
            }
        }

        return response;
    }, function (error) {
        if (error) {
            dispatch(apiLoading(false))
        }
        return Promise.reject(error);
    });


    return <>
    </>
}

export default AxiosInterceptor;

