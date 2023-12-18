import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/login";
import Register from "../auth/register";
import OTP from "../auth/Otp"
import Forgot from "../auth/ForgetPassword";


const AuthRoutes = ({ optionHeader }) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="login">
            <Stack.Screen
                options={({ navigation }) => ({
                    header: () => optionHeader("Login", navigation) // Use the custom header component
                })}
                name="login" component={Login} />
            <Stack.Screen
                options={({ navigation }) => ({
                    header: () => optionHeader("Register", navigation) // Use the custom header component
                })}
                name="register" component={Register} />
            <Stack.Screen
                options={({ navigation }) => ({
                    header: () => optionHeader("Forgot", navigation) // Use the custom header component
                })}
                name="forgot" component={Forgot} />
            <Stack.Screen
                options={({ navigation }) => ({
                    header: () => optionHeader("Verify Otp", navigation) // Use the custom header component
                })}
                name="verify" component={OTP} />
        </Stack.Navigator>
    );
};

export default AuthRoutes;
