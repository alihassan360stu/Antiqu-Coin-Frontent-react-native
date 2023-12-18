import { VStack, ScrollView, Center, useToast } from "native-base";
import { InputField, SubmitButton, toastMessage, Popup, TextAreaCustom } from "../../Common/Common_ui";
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Entypo';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Axios from "axios";
import apiPaths from "../../serveces/apiPaths";
import { KeyboardAvoidingView } from "react-native"
import { Text, View } from "react-native"


const errorState = {
    name: "",
    email: "",
    message: ""
}
const Register = () => {
    const toast = useToast();
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState(errorState);
    const responceLoading = useSelector(({ constant }) => constant.isLoading)



    useEffect(() => {
        setErrors(errorState)
    }, [email, message, name])

    const checkValidation = () => {
        if (name.trim().length < 1) {
            setErrors({ ...errors, "name": "name filed is required*" })
            return false
        }
        if (email.trim().length < 1) {
            setErrors({ ...errors, "email": "email filed is required*" })
            return false
        }

        if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(email)) {
            setErrors({ ...errors, "email": "invalid email" })
            return false
        }
        if (message.trim().length < 1) {
            setErrors({ ...errors, "message": "message filed is required*" })
            return false
        }
        return true
    }

    const apiCalled = (data) => {
        return Axios.post(apiPaths.register(), data).then((result) => { return result.data }).catch((e) => {
            console.log(e)
            throw new Error("error")
        })
    }

    const onChange = async () => {
        if (checkValidation()) {
            const user = {
                name: name,
                email: email,
                message: message
            };
            var data;
            try {
                data = await apiCalled(user)
                if (!data.status) {
                    toastMessage({ isClosable: true, toast: toast, title: "Error", message: data.message })
                }
                else {
                    toastMessage({ isClosable: true, toast: toast, title: "Created", message: data.message, type: "success" })
                }
            } catch (e) {
                toastMessage({ isClosable: true, toast: toast, title: "Error", message: "something went wrong please try again" })
                console.log(e)
            }
        }
    }

    return <KeyboardAvoidingView style={{ flex: 1, marginTop: 50 }}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={{ width: "100%", alignItems: "center" }}>

                <Text style={{ fontSize: 20, fontWeight: 800, color: "white" }}>
                    Contact With Us
                </Text>
            </View>
            <VStack paddingLeft="10" paddingRight="10" mt="5" space={3}  >
                <InputField
                    label="Your Name"
                    isDisabled={responceLoading}
                    onChangeText={(e) => { setName(e) }}
                    inValid={errors.name !== ""}
                    leftIcon={<Icon1 name="adduser" size={20} style={{ marginLeft: 10 }} />}
                    errorMessage={errors.name}
                    value={name}
                    backgroundColor="white"
                    color="white"
                />

                <InputField
                    onChangeText={(e) => { setEmail(e) }}
                    label="Your Email ID"
                    isDisabled={responceLoading}
                    inValid={errors.email !== ""}
                    leftIcon={<Icon4 name="email" size={20} style={{ marginLeft: 10 }} />}
                    errorMessage={errors.email}
                    value={email}
                    placeholder="your_email@gmail.com"
                    backgroundColor="white"
                    color="white"

                />
                <TextAreaCustom
                    backgroundColor="white"
                    label="Message"
                    color="white"
                    placeholder="Type Your Message"
                    errorMessage={errors.message}
                    isRequired
                    inValid={errors.message !== ""}
                    value={message}
                    onChangeText={(e) => { setMessage(e) }}
                    numberOfLines={6}
                />
            </VStack>

            <Center mt="8" w="100%">
                <SubmitButton
                    label="Submit"
                    onChange={onChange}
                    loading={responceLoading}
                    spinnerPlacement="end"
                    disabled={responceLoading}
                    loadingMessage="loading..."
                    backgroundColor="#3AA6B9"
                />
            </Center>
        </ScrollView>
    </KeyboardAvoidingView>

};

export default Register;