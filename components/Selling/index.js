import { SubmitButton, InputField, TextAreaCustom } from "../../Common/Common_ui";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/Ionicons';
import Icon7 from 'react-native-vector-icons/Fontisto';
import React from "react";

const initialState = {
    name: "",
    email: "",
    contact: "",
    cnic: "",
    r_name: "",
    r_cnic: "",
    r_email: "",
    r_contact: "",
    coin_title: "",
    quantity: "",
    expected_rates: "",
    why_selling: "",
    contry: "",
    code: "",
    address: "",
    actual_address: "",
}


const Index = () => {
    const [state, setState] = React.useState(initialState)
    const [errorState, setErrorState] = React.useState(initialState)
    const onChange = (name, value) => {
        setErrorState(initialState)
        setState({ ...state, [name]: value })
    }
    const pick = async () => {
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(async image => {

                console.log("file name ?" , image.filename)
                console.log("file name ?" , image.mime)

            }).catch((e) => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const validation = () => {

        if (state.coin_title.trim().length < 1) {
            setErrorState({ ...errorState, coin_title: "coin_title required please fill it." });
            return false
        }
        if (state.quantity.trim().length < 1) {
            setErrorState({ ...errorState, quantity: "quantity required please fill it." });
            return false
        }
        if (state.expected_rates.trim().length < 1) {
            setErrorState({ ...errorState, expected_rates: "expected_rates required please fill it." });
            return false
        }
        if (state.why_selling.trim().length < 1) {
            setErrorState({ ...errorState, why_selling: "why_selling required please fill it." });
            return false
        }

        if (state.name.trim().length < 1) {
            setErrorState({ ...errorState, name: "name required please fill it." });
            return false
        }
        if (state.email.trim().length < 1) {
            setErrorState({ ...errorState, email: "email required please fill it." });
            return false
        }
        if (state.contact.trim().length < 1) {
            setErrorState({ ...errorState, contact: "contact required please fill it." });
            return false
        }
        if (state.cnic.trim().length < 1) {
            setErrorState({ ...errorState, cnic: "cnic required please fill it." });
            return false
        }


        if (state.r_name.trim().length < 1) {
            setErrorState({ ...errorState, r_name: "relative name required please fill it." });
            return false
        }
        if (state.r_email.trim().length < 1) {
            setErrorState({ ...errorState, r_email: "relative email required please fill it." });
            return false
        }
        if (state.r_contact.trim().length < 1) {
            setErrorState({ ...errorState, r_contact: "relative contact required please fill it." });
            return false
        }
        if (state.r_cnic.trim().length < 1) {
            setErrorState({ ...errorState, r_cnic: "relative cnic required please fill it." });
            return false
        }

        if (state.contry.trim().length < 1) {
            setErrorState({ ...errorState, contry: "contry required please fill it." });
            return false
        }

        if (state.code.trim().length < 1) {
            setErrorState({ ...errorState, code: "code required please fill it." });
            return false
        }
        if (state.address.trim().length < 1) {
            setErrorState({ ...errorState, address: "address required please fill it." });
            return false
        }
        if (state.actual_address.trim().length < 1) {
            setErrorState({ ...errorState, actual_address: "actual_address required please fill it." });
            return false
        }
        return true
    }
    const openCamera = async () => {
        try {
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(async image => {
                // console.log(image);

            }).catch((e) => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const submit = () => {
        if (validation()) {
            try {

            } catch (e) {

                console.log("error", e)
            }
        }
    }


    return (
        <ScrollView style={style.container}>
            <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, marginTop: 20 }}>
                Coins Details
            </Text>
            <View style={style.ViewStyle}>
                <View style={style.directionRow}>
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        onChangeText={(e) => { onChange("coin_title", e) }}
                        label="Title"
                        placeholder="Title..."
                        leftIcon={<Icon5 name="title" size={20} />}
                        value={state.coin_title}
                        inValid={errorState.coin_title !== ""}
                        errorMessage={errorState.coin_title}
                    />
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        label="Quantity"
                        onChangeText={(e) => { onChange("quantity", e) }}
                        type="number"
                        placeholder="100"
                        leftIcon={<Icon6 name="warning-sharp" size={20} />}
                        value={state.quantity}
                        inValid={errorState.quantity !== ""}
                        errorMessage={errorState.quantity}
                    />
                </View>
                <View style={style.directionRow}>
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        onChangeText={(e) => { onChange("expected_rates", e) }}
                        label="Expected Rates"
                        placeholder="500$"
                        leftIcon={<Icon5 name="price-check" size={15} />}
                        value={state.expected_rates}
                        inValid={errorState.expected_rates !== ""}
                        errorMessage={errorState.expected_rates}
                    />
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        label="Why Selling"
                        onChangeText={(e) => { onChange("why_selling", e) }}
                        placeholder="i have to much"
                        leftIcon={<Icon5 name="question-mark" size={15} />}
                        value={state.why_selling}
                        inValid={errorState.why_selling !== ""}
                        errorMessage={errorState.why_selling}
                    />
                </View>
                <View style={{ marginTop: 20, paddingLeft: 5 }}>
                    <Text >
                        Upload Coin Pictue
                    </Text>
                    <View style={{ padding: 5, justifyContent: "center", flexDirection: "row", width: "45%", borderRadius: 5, marginTop: 2 }}>
                        <Pressable onPress={openCamera}>
                            <Icon4 name="camera" size={30} />
                        </Pressable>
                        <View style={{ width: 30 }} ></View>
                        <Pressable onPress={pick}>
                            <Icon3 name="upload" size={30} />
                        </Pressable>
                    </View>
                </View>
            </View>

            <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, marginTop: 20 }}>
                Personal Info
            </Text>
            <View style={style.ViewStyle}>

                <View style={style.directionRow}>
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        onChangeText={(e) => { onChange("name", e) }}
                        label="Name"
                        placeholder="name..."
                        leftIcon={<Icon5 name="title" size={15} />}
                        value={state.name}
                        inValid={errorState.name !== ""}
                        errorMessage={errorState.name}
                    />
                    <InputField
                        width="45%"
                        fontSize={15}
                        onChangeText={(e) => { onChange("email", e) }}
                        fontWeight={500}
                        label="Email"
                        type="text"
                        placeholder="ali.hassan@gmail.com"
                        leftIcon={<Icon7 name="email" size={15} />}
                        value={state.email}
                        inValid={errorState.email !== ""}
                        errorMessage={errorState.email}
                    />
                </View>
                <View style={style.directionRow}>
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        label="Contact"
                        placeholder="021-x-x-x-x"
                        onChangeText={(e) => { onChange("contact", e) }}
                        value={state.contact}
                        leftIcon={<Icon5 name="numbers" size={15} />}
                        inValid={errorState.contact !== ""}
                        errorMessage={errorState.contact}
                    />
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        value={state.cnic}
                        onChangeText={(e) => { onChange("cnic", e) }}
                        label="CNIC"
                        placeholder="14101-x-x-x-x"
                        leftIcon={<Icon5 name="numbers" size={15} />}
                        inValid={errorState.cnic !== ""}
                        errorMessage={errorState.cnic}
                    />
                </View>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, marginTop: 20 }}>
                Any Relative Details
            </Text>

            <View style={style.ViewStyle}>
                <View style={style.directionRow}>
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        label="Name"
                        onChangeText={(e) => { onChange("r_name", e) }}
                        placeholder="name..."
                        leftIcon={<Icon5 name="title" size={15} />}
                        value={state.r_name}
                        inValid={errorState.r_name !== ""}
                        errorMessage={errorState.r_name}
                    />
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        label="Email"
                        type="text"
                        placeholder="ali.hassan@gmail.com"
                        leftIcon={<Icon7 name="email" size={15} />}
                        value={state.r_email}
                        onChangeText={(e) => { onChange("r_email", e) }}
                        inValid={errorState.r_email !== ""}
                        errorMessage={errorState.r_email}
                    />
                </View>
                <View style={style.directionRow}>
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        label="Contact"
                        placeholder="021-x-x-x-x"
                        leftIcon={<Icon5 name="numbers" size={15} />}
                        value={state.r_contact}
                        onChangeText={(e) => { onChange("r_contact", e) }}
                        inValid={errorState.r_contact !== ""}
                        errorMessage={errorState.r_contact}
                    />
                    <InputField
                        width="45%"
                        fontSize={15}
                        fontWeight={500}
                        label="CNIC"
                        placeholder="14101-x-x-x-x"
                        value={state.r_cnic}
                        onChangeText={(e) => { onChange("r_cnic", e) }}
                        leftIcon={<Icon5 name="numbers" size={15} />}
                        inValid={errorState.r_cnic !== ""}
                        errorMessage={errorState.r_cnic}
                    />
                </View>
            </View>

            <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, marginTop: 20 }}>
                Address Details
            </Text>
            <View style={style.ViewStyle}>
                <View style={style.directionRow}>
                    <InputField
                        width="45%"
                        backgroundColor="white"
                        fontSize={15}
                        fontWeight={500}
                        label="Country"
                        onChangeText={(e) => { onChange("contry", e) }}
                        placeholder="pakistan"
                        leftIcon={<Icon5 name="title" size={15} />}
                        value={state.contry}
                        inValid={errorState.contry !== ""}
                        errorMessage={errorState.contry}
                    />
                    <InputField
                        width="45%"
                        backgroundColor="white"
                        fontSize={15}
                        fontWeight={500}
                        value={state.code}
                        label="Code"
                        type="text"
                        onChangeText={(e) => { onChange("code", e) }}
                        placeholder="92"
                        leftIcon={<Icon5 name="numbers" size={15} />}
                        inValid={errorState.code !== ""}
                        errorMessage={errorState.code}
                    />
                </View>
                <View style={style.directionRow}>
                    <InputField
                        width="45%"
                        backgroundColor="white"
                        fontSize={15}
                        fontWeight={500}
                        label="Address"
                        placeholder="kpk/hangu"
                        value={state.address}
                        onChangeText={(e) => { onChange("address", e) }}
                        leftIcon={<Icon4 name="address" size={15} />}
                        inValid={errorState.address !== ""}
                        errorMessage={errorState.address}
                    />
                    <InputField
                        width="45%"
                        backgroundColor="white"
                        fontSize={15}
                        fontWeight={500}
                        label="Actual Address"
                        placeholder="gulshan/iqbal/block/10"
                        leftIcon={<Icon4 name="address" size={15} />}
                        value={state.actual_address}
                        onChangeText={(e) => { onChange("actual_address", e) }}
                        inValid={errorState.actual_address !== ""}
                        errorMessage={errorState.actual_address}
                    />
                </View>
            </View>
            <View style={{ marginBottom: 20, marginTop: 20 }}>
                <SubmitButton onChange={submit} label="Submit" backgroundColor="#3AA6B9" width="100%" />
            </View>
        </ScrollView>
    )

}
const style = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
    },
    ViewStyle: {
        width: "100%",
        backgroundColor: "#F9F9F9",
        padding: 10,
        paddingBottom: 20,
        borderRadius: 10
    },
    directionRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 10
    }
})

export default Index;