import { Box, Text, Heading, VStack, Pressable, ScrollView, HStack, Center, useToast } from "native-base";
import { Logo, InputField, SubmitButton, toastMessage, Popup,TouchableWrapper } from "../Common/Common_ui";
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { userRegister } from "../redux/action/auth";
import Axios from "axios";
import apiPaths from "../serveces/apiPaths";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native"
import { useRef } from "react"


const errorState = {
  name: "",
  password: "",
  confirm: "",
  email: "",
}
const Register = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState(errorState);
  const [popup, setPopup] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const responceLoading = useSelector(({ constant }) => constant.isLoading)

  const onAfterSubmit = () => {
    navigation.navigate("verify")
  }

  const onChageShowPassword = () => {
    if (showPassword) setShowPassword(false)
    else setShowPassword(true)
  }

  const onChageShowConfirm = () => {
    if (showConfirm) setShowConfirm(false)
    else setShowConfirm(true)
  }

  useEffect(() => {
    setErrors(errorState)
  }, [email, password, confirm, name])

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

    if (password.trim().length < 1) {
      setErrors({ ...errors, "password": "password filed is required*" })
      return false
    }
    if (confirm.trim().length < 1) {
      setErrors({ ...errors, "confirm": "confirm password filed is required*" })
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
        password: password,
        confirm: confirm
      };
      var data;
      try {
        data = await apiCalled(user)

        console.log("data ", data)

        if (!data.status) {
          toastMessage({ isClosable: true, toast: toast, title: "Error", message: data.message })
        }
        else {
          setPopup(true)
          // dispatch(userRegister(data)) //
          toastMessage({ isClosable: true, toast: toast, title: "Created", message: data.message, type: "success" })
          // toastMessage("success", "Register Successfull!", "We Have Send You Verification Otp To Your Email.Otp Will Be Expire After 3 Minutes")
        }
      } catch (e) {
        toastMessage({ isClosable: true, toast: toast, title: "Error", message: "something went wrong please try again" })
        console.log(e)
      }
    }
  }

  return <KeyboardAvoidingView style={{ flex: 1 }}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Box marginTop={-5} marginLeft={-10}  >
        <Logo />
      </Box>
      <Box marginX="10" >
        <Heading size="xl" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          Register
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Register Your Self With US!
        </Heading>
      </Box>
      <VStack paddingLeft="10" paddingRight="10" mt="5" space={3}  >
        <InputField
          label="User Name"
          isDisabled={responceLoading}
          onChangeText={(e) => { setName(e) }}
          inValid={errors.name !== ""}
          leftIcon={<Icon1 name="adduser" size={20} style={{ marginLeft: 10 }} />}
          errorMessage={errors.name}
          value={name}
        />

        <InputField
          onChangeText={(e) => { setEmail(e) }}
          label="Email ID"
          isDisabled={responceLoading}
          inValid={errors.email !== ""}
          leftIcon={<Icon4 name="email" size={20} style={{ marginLeft: 10 }} />}
          errorMessage={errors.email}
          value={email}
          placeholder="your_email@gmail.com"

        />

        <InputField
          label="Password"
          isDisabled={responceLoading}
          inValid={errors.password !== ""}
          placeholder="min password 8 digits"
          rightIcon={
            <Pressable
              onPress={onChageShowPassword}>
              <Icon3 name={showPassword ? "eye" : "eye-off"} size={25} style={{ marginRight: 10 }} />
            </Pressable>
          }
          errorMessage={errors.password}
          type={!showPassword ? "password" : "text"}
          onChangeText={(e) => { setPassword(e) }}
          value={password}
        />

        <InputField
          label="Confirm Password"
          isDisabled={responceLoading}
          inValid={errors.confirm !== ""}
          rightIcon={
            <Pressable
              onPress={onChageShowConfirm}>
              <Icon3 name={showConfirm ? "eye" : "eye-off"} size={25} style={{ marginRight: 10 }} />
            </Pressable>
          }
          errorMessage={errors.confirm}
          value={confirm}
          type={!showConfirm ? "password" : "text"}
          placeholder="please re-enter password"
          onChangeText={(e) => { setConfirm(e) }}
        />
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <TouchableWrapper
            label="verify account"
            onChange={() => { navigation.navigate("verify") }}
            color="#ed9121"
            fontSize={12}
            fontWeight={400}
            width="48%"
          />
          <TouchableWrapper
            label="Forget Password?"
            onChange={() => { navigation.navigate("forgot")}}
            color="#ed9121"
            fontSize={12}
            fontWeight={400}
            width="48%"
          />
        </Box>
      </VStack>

      <Center mt="8" w="100%">
        <SubmitButton
          label="Register"
          onChange={onChange}
          loading={responceLoading}
          spinnerPlacement="end"
          disabled={responceLoading}
          loadingMessage="loading..."
        />
        <HStack mt="6" justifyContent="center">
          <Text style={{ marginRight: 10 }} fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            i am already register
            {/* I'm a new user. */}
          </Text>
          <TouchableWrapper
            label="Login"
            onChange={() => { navigation.navigate("login") }}
            color="#ed9121"
            fontSize={15}
            fontWeight={800}
            width="16%"
          />
        </HStack>
        <Popup
          title="Register Successfull!"
          description="We Have Send You Verification Otp To Your Email.Otp Will Be Expire After 3 Minutes"
          useRef={useRef}
          setIsOpen={setPopup}
          isOpen={popup}
          onAfterSubmit={onAfterSubmit}
        />
      </Center>
    </ScrollView>
  </KeyboardAvoidingView>

};

export default Register;