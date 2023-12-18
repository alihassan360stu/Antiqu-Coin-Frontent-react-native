import { Box, Text, Heading, VStack, ScrollView, Link, HStack, Center, useToast } from "native-base";
import { Logo, InputField, SubmitButton, toastMessage, TouchableWrapper } from "../Common/Common_ui";
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { userRegister } from "../redux/action/auth";
import axios from "axios";
import apiPaths from "../serveces/apiPaths";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native"
import { useRef } from "react"


let errorState = {
  email: "",
  otp: ""
}

const Login = ({ setIsAuth }) => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState(errorState);
  const responceLoading = useSelector(({ constant }) => constant.isLoading)
  const navigation = useNavigation();
  const [reGenarateOtp, retReGenarateOtp] = useState(false)
  const dispatch = useDispatch();



  useEffect(() => {
    setErrors(errorState)
  }, [email, otp])

  const validation = () => {
    if (email.trim().length < 1) {
      setErrors({ ...errors, "email": "email is required*" })
      return false
    }
    if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(email)) {
      setErrors({ ...errors, "email": "invalid email address" })
      return false
    }
    if (otp.trim().length < 1) {
      setErrors({ ...errors, "otp": "otp is required*" })
      return false
    }
    return true
  }

  const apiCalled = (path, data) => {
    return axios.post(path, data).then((result) => {
      return result.data;
    })
  }

  const onChange = async () => {
    if (!reGenarateOtp) {
      if (validation()) {
        try {
          let data = {
            email: email,
            otp: otp
          }
          let response = await apiCalled(apiPaths.otpVerify(), data)
          if (response.status) {
            toastMessage({ isClosable: true, toast: toast, title: "Created", message: response.message, type: "success" })
            navigation.navigate("login")
            //
          } else {
            toastMessage({ isClosable: true, toast: toast, title: "Error", message: response.message, type: "error" })
          }
        } catch (e) {
          console.log(e)
          toastMessage({ isClosable: true, toast: toast, title: "Error", message: "something went wrong please try again" })
        }
      }
    } else {
      try {
        let response = await apiCalled(apiPaths.otpGenerate(), { email, updateRequest: true })
        if (response.status) {
          retReGenarateOtp(false)
          toastMessage({ isClosable: true, toast: toast, title: "Created", message: response.message, type: "success" })
        } else {
          toastMessage({ isClosable: true, toast: toast, title: "Error", message: response.message, type: "error" })
        }
      }
      catch (e) {
        toastMessage({ isClosable: true, toast: toast, title: "Error", message: "something went wrong please try again" })
        console.log(e)
      }
    }
  };


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
          Verify Your Account
        </Heading>
        <Heading mt="5" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          We have share OTP via gmail. The OPT will expire after 3 minutes. Please don,t share.
        </Heading>
      </Box>
      <VStack paddingLeft="10" paddingRight="10" mt="5" space={3}  >
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
        {
          !reGenarateOtp && <InputField
            label="Otp"
            isDisabled={responceLoading}
            inValid={errors.otp !== ""}
            placeholder="enter otp"
            leftIcon={<Icon3 name="warning-outline" size={20} style={{ marginLeft: 10 }} />}
            errorMessage={errors.otp}
            type={"text"}
            onChangeText={(e) => { setOtp(e) }}
            value={otp}
          />
        }

        <TouchableWrapper
          label={reGenarateOtp ? "Verify Your Self" : "Regenerate Otp"}
          onChange={
            () => {
              if (reGenarateOtp) retReGenarateOtp(false)
              else retReGenarateOtp(true)
            }
          }
          color="#ed9121"
          fontSize={15}
          fontWeight={300}
          width="45%"
        />
      </VStack>

      <Center mt="8" w="100%">
        <SubmitButton
          label={reGenarateOtp ? "Generate Otp" : "Verify"}
          onChange={onChange}
          loading={responceLoading}
          spinnerPlacement="end"
          disabled={responceLoading}
          loadingMessage={reGenarateOtp ? "Generating ..." : "Verifing..."}
        />
        <HStack mt="6" justifyContent="center">
          <Text style={{ marginRight: 10 }} fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            I'm a new user.
          </Text>
          <TouchableWrapper
            label="sign up"
            onChange={() => { navigation.navigate("register") }}
            color="#ed9121"
            fontSize={15}
            fontWeight={800}
            width="16%"
          />
        </HStack>
        <HStack justifyContent="center">
          <Text style={{ marginRight: 10 }} fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            want to login
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
      </Center>
    </ScrollView>
  </KeyboardAvoidingView>

};

export default Login;