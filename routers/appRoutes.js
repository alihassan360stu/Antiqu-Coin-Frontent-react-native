import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/header/Header"



const Routes = ({optionHeader}) => {
    const Stack = createNativeStackNavigator();
    return (

        <Stack.Navigator initialRouteName="home">
            <Stack.Screen options={optionHeader("Home")} name="home" component={Home} />
        </Stack.Navigator>

    );
};

export default Routes;
