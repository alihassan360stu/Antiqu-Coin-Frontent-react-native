import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./authRouters"
import { useEffect, useState } from "react";
import InitialLoad from "./initialLoad"
import { useSelector, useDispatch } from 'react-redux';
import { initialLoadProgress, sign_in } from "../redux/action/auth"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Home from "../components/index"
import Icon3 from 'react-native-vector-icons/AntDesign';

const optionHeader = (title, nav) => {
    return <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={{ height: 50, display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: 10 }}
        colors={['#FFB534', '#FFB534', '#FFB534']} 
    >
        {title !== "Login" && <TouchableHighlight
            activeOpacity={0.9}
            underlayColor="#DDDDDD"
            onPress={() => nav.goBack()}>
            <Icon3 name="back" size={20} color="black" />
        </TouchableHighlight>}
        <Text style={{ marginLeft: 15 }} >{title}</Text>
    </LinearGradient>
}


const Routes = () => {
    const dispatch = useDispatch()
    const [isAuthority, setIsAuthority] = useState(false)
    const prograss = useSelector(({ auth }) => auth.progress)

    const isValid = useSelector(({ auth }) => auth.isAuthority)
    const checlIsUserLogin = async () => {
        try {
            let user = await AsyncStorage.getItem("user");
            let token = await AsyncStorage.getItem("token");
            if (user && token) {
                dispatch(sign_in({ user: JSON.parse(user), token }))
            } else {
            }
        }
        catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if (prograss < 100) {
            setTimeout(() => {
                dispatch(initialLoadProgress(prograss + 10))
            }, 100)
        }
    }, [prograss])

    useEffect(() => {
        checlIsUserLogin()
    }, [])

    useEffect(() => {
        setIsAuthority(isValid)
    }, [isValid])


    return (
        <>
            {
                prograss < 100 ? <InitialLoad  setProgress={prograss} /> :

                    !isAuthority ?
                        <NavigationContainer>
                            <AuthRoutes setIsAuthority={setIsAuthority} optionHeader={optionHeader} />
                        </NavigationContainer> :
                        <Home />

            }
        </>
    );
};

export default Routes;
