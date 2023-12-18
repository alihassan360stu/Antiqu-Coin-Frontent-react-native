import { Box, Text, Heading, VStack, Pressable, ScrollView, Link, HStack, Center, useToast } from "native-base";
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
import { forgot } from "../redux/action/auth";


let errorState = {
  email: "",
  password: "",
  confirm: "",
  otp: ""
}

const Login = ({ setIsAuth }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirm, setConfirm] = useState("");
  const [genersteOtp, setGenerateOtp] = useState(false);
  const forgot_email = useSelector(({ auth }) => auth.forgot_email)
  const isOtpVerified = useSelector(({ auth }) => auth.isOtpVerified)
  const isEmailValid = useSelector(({ auth }) => auth.isEmailValid)


  const toast = useToast();
  const [errors, setErrors] = useState(errorState);
  const responceLoading = useSelector(({ constant }) => constant.isLoading)

  const onChageShowPassword = () => {
    if (showPassword) setShowPassword(false)
    else setShowPassword(true)
  }

  const onChageShowConfirm = () => {
    if (showConfirm) setShowConfirm(false)
    else setShowConfirm(true)
  }

  const otpValidation = () => {
    if (otp.trim().length < 1) {
      setErrors({ ...errors, "otp": "otp is required*" })
      return false
    }
    return true
  }

  const emailValidation = () => {
    if (forgot_email.trim().length < 1) {
      setErrors({ ...errors, "email": "email is required*" })
      return false
    }
    if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(forgot_email)) {
      setErrors({ ...errors, "email": "invalid email address" })
      return false
    }
    true
  }

  useEffect(() => {
    setErrors(errorState)
  }, [forgot_email, password, confirm, otp])

  const validation = () => {
    if (emailValidation() === false) return false
    if (otpValidation() === false) return false
    if (password.trim().length < 1) {
      setErrors({ ...errors, "password": "password is required*" })
      return false
    }

    if (confirm.trim().length < 1) {
      setErrors({ ...errors, "confirm": "confirm password is required*" })
      return false
    }
    return true
  }

  const apiCalled = (path, data) => {
    return axios.post(path, data).then((result) => {
      return result.data;
    })
  }

  const verifyEmail = async () => {
    try {
      let response = await apiCalled(apiPaths.isUserExist(), { email: forgot_email, updateRequest: true })
      if (response.status) {
        dispatch(forgot({ forgot_email, isOtpVerified, isEmailValid: true }))
      } else {
        toastMessage({ toast: toast, message: response.message })
      }
    } catch (e) {
      toastMessage({ toast: toast, message: "something went wrong please try again" })
      console.log(e)
    }
  }


  const verifyOtp = async () => {
    try {
      const data = { email: forgot_email, otp: otp }
      let response = await apiCalled(apiPaths.otpVerify(), data)
      if (response.status) {
        dispatch(forgot({ forgot_email, isOtpVerified, isEmailValid: true }))
      } else {
        toastMessage({ toast: toast, message: response.message })
      }
    } catch (e) {
      toastMessage({ toast: toast, message: "something went wrong please try again" })
      console.log(e)
    }
  }

  const onSubmit = () => {
    if (isEmailValid === true && isOtpVerified === true) validation() && changePassword()
    else if (isEmailValid && isOtpVerified === false) otpValidation() && verifyOtp()// verify otp
    else emailValidation() && verifyEmail()
  }

  const changePassword = async () => {
    if (validation()) {
      try {
        let data = {
          email: email,
          password: password,
          otp: opp,
          confirm: confirm,
        }
        let response = await apiCalled(apiPaths.recoverPassword(), data)
        if (loginResponse.status) {
          toastMessage({ isClosable: true, toast: toast, title: "Success", message: response.message, type: "success" })
          dispatch(forgot({ forgot_email, isOtpVerified: false, isEmailValid: false }))
          navigation.navigate("login");
        } else {
          toastMessage({ toast: toast, message: response.message })
        }
      } catch (e) {
        console.log(e)
        toastMessage({ toast: toast, message: "something went wrong please try again" })
      }
    }
  };

  const onGenerateOtp = async () => {
    if (emailValidation()) {
      try {
        let response = await apiCalled(apiPaths.otpGenerate(), { email, updateRequest: true })
        if (response.status) {
          toastMessage({ isClosable: true, toast: toast, title: "OTP Created", message: response.message, type: "success" })
          setGenerateOtp(false)
        } else {
          toastMessage({ toast: toast, message: response.message })
        }
      } catch (e) {
        toastMessage({ toast: toast, message: "something went wrong please try again" })
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
          Forget Password!
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          To Recover Your Password You Need To Very Your Email Via OTP. Not The OTP Will Expire AFter Tree Minutes.
        </Heading>
      </Box>
      <VStack paddingLeft="10" paddingRight="10" mt="5" space={3}  >
        <InputField
          onChangeText={(e) => {
            dispatch(forgot({ forgot_email: e, isOtpVerified, isEmailValid }))
          }}
          label="Email ID"
          isDisabled={responceLoading}
          inValid={errors.email !== ""}
          leftIcon={<Icon4 name="email" size={20} style={{ marginLeft: 10 }} />}
          errorMessage={errors.email}
          value={forgot_email}
          placeholder="your_email@gmail.com"
        />
        {
          isEmailValid && !genersteOtp && <InputField
            onChangeText={(e) => { setOtp(e) }}
            label="OTP"
            isDisabled={responceLoading}
            inValid={errors.otp !== ""}
            leftIcon={<Icon3 name="warning-outline" size={20} style={{ marginLeft: 10 }} />}
            errorMessage={errors.otp}
            value={otp}
            placeholder="Please enter valid otp"
          />

        }

        {
          isEmailValid && isOtpVerified && <Box>
            <InputField
              label="New Password"
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
              placeholder="min password 8 digits"
              rightIcon={
                <Pressable
                  onPress={onChageShowConfirm}>
                  <Icon3 name={showConfirm ? "eye" : "eye-off"} size={25} style={{ marginRight: 10 }} />
                </Pressable>
              }
              errorMessage={errors.confirm}
              type={!showConfirm ? "password" : "text"}
              onChangeText={(e) => { setConfirm(e) }}
              value={confirm}
            />
          </Box>
        }

        {
          isEmailValid !== false && isOtpVerified === false && <TouchableWrapper
            label={genersteOtp ? "Verify OTP" : "Regenerate Otp"}
            onChange={
              () => {
                if (genersteOtp) setGenerateOtp(false)
                else setGenerateOtp(true)
              }
            }
            color="#ed9121"
            fontSize={15}
            fontWeight={400}
            width="40%"
          />
        }

      </VStack>

      <Center mt="8" w="100%">
        {
          genersteOtp ? <SubmitButton
            label={"Generate Otp"}
            onChange={onGenerateOtp}
            loading={responceLoading}
            spinnerPlacement="end"
            disabled={responceLoading}
            loadingMessage="Generating..."
          /> :
            <SubmitButton
              label={isEmailValid ? "Verify Your Otp" : isEmailValid && isOtpVerified ? "Reset Password" : "Verify Your Email"}
              onChange={onSubmit}
              loading={responceLoading}
              spinnerPlacement="end"
              disabled={responceLoading}
              loadingMessage="loading..."
            />
        }
        <HStack mt="4" justifyContent="center">
          <Text style={{ marginRight: 10 }} fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            all ready account
          </Text>
          <TouchableWrapper
            label="Login"
            onChange={() => { navigation.navigate("login") }}
            color="#ed9121"
            fontSize={15}
            fontWeight={800}
            width="17%"
          />
        </HStack>
      </Center>
    </ScrollView>
  </KeyboardAvoidingView>

};

export default Login;