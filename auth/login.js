import { Box, Text, Heading, VStack, Pressable, ScrollView, Link, HStack, Center, useToast } from "native-base";
import { Logo, InputField, SubmitButton, toastMessage, TouchableWrapper } from "../Common/Common_ui";
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import apiPaths from "../serveces/apiPaths";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sign_in } from "../redux/action/auth";
let errorState = {
  email: "",
  password: ""
}
const Login = ({ setIsAuth }) => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(errorState);
  const responceLoading = useSelector(({ constant }) => constant.isLoading)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onChageShowPassword = () => {
    if (showPassword) setShowPassword(false)
    else setShowPassword(true)
  }
  useEffect(() => {
    setErrors(errorState)
  }, [email, password])

  const validation = () => {
    if (email.trim().length < 1) {
      setErrors({ ...errors, "email": "email is required*" })
      return false
    }
    if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(email)) {
      setErrors({ ...errors, "email": "invalid email address" })
      return false
    }
    if (password.trim().length < 1) {
      setErrors({ ...errors, "password": "password is required*" })
      return false
    }
    return true
  }

  const apiCalled = (data) => {
    return axios.post(apiPaths.login(), data).then((result) => {
      return result.data;
    })
  }
  const onChange = async () => {
    if (validation()) {
      try {
        let data = {
          email: email,
          password: password
        }
        let loginResponse = await apiCalled(data)
        if (loginResponse.status) {
          let { data, token } = loginResponse;
          await AsyncStorage.setItem('user', JSON.stringify(data));
          await AsyncStorage.setItem('token', token);
          toastMessage({ isClosable: true, toast: toast, title: "Created", message: loginResponse.message, type: "success" })
          dispatch(sign_in({ token, user: data }))
        } else {
          toastMessage({ isClosable: true, toast: toast, title: "Error", message: loginResponse.message, type: "error" })
        }
      } catch (e) {
        console.log(e)
        toastMessage({ isClosable: true, toast: toast, title: "Error", message: "something went wrong please try again" })
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
          Login
        </Heading>
        <Heading mt="5" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Welcome to Antique coin – Your Gateway to Numismatic Splendors!
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

        <TouchableWrapper
          label="Forgot Password"
          onChange={() => { navigation.navigate("forgot") }}
          color="#ed9121"
          fontSize={12}
          fontWeight={400}
          width="40%"
        />
      </VStack>

      <Center mt="8" w="100%">
        <SubmitButton
          label="Login"
          onChange={onChange}
          loading={responceLoading}
          spinnerPlacement="end"
          disabled={responceLoading}
          loadingMessage="loading..."
        />
        <HStack mt="3" justifyContent="center">
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
          width="17%"
          />
        </HStack>
      </Center>
    </ScrollView>
  </KeyboardAvoidingView>

};

export default Login;