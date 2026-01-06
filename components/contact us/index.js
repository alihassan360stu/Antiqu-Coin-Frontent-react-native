import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View, Text, StyleSheet } from "react-native";
import { VStack, Center, useToast } from "native-base";
import { InputField, SubmitButton, toastMessage, TextAreaCustom } from "../../Common/Common_ui";
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import Axios from "axios";
import apiPaths from "../../serveces/apiPaths";

const errorState = {
  name: "",
  email: "",
  message: ""
};

const Register = () => {
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState(errorState);
  const responceLoading = useSelector(({ constant }) => constant.isLoading);

  useEffect(() => setErrors(errorState), [email, message, name]);

  const checkValidation = () => {
    if (name.trim().length < 1) return setErrors({ ...errors, name: "Name is required*" }), false;
    if (email.trim().length < 1) return setErrors({ ...errors, email: "Email is required*" }), false;
    if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(email)) return setErrors({ ...errors, email: "Invalid email" }), false;
    if (message.trim().length < 1) return setErrors({ ...errors, message: "Message is required*" }), false;
    return true;
  };

  const apiCalled = (data) => Axios.post(apiPaths.register(), data)
    .then(res => res.data)
    .catch(e => { console.log(e); throw new Error("API error"); });

  const onChange = async () => {
    if (!checkValidation()) return;
    const user = { name, email, message };
    try {
      const data = await apiCalled(user);
      if (!data.status) {
        toastMessage({ isClosable: true, toast, title: "Error", message: data.message });
      } else {
        toastMessage({ isClosable: true, toast, title: "Success", message: data.message, type: "success" });
        setName(""); setEmail(""); setMessage(""); // Clear form
      }
    } catch (e) {
      toastMessage({ isClosable: true, toast, title: "Error", message: "Something went wrong, try again" });
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Contact Us</Text>
        <Text style={styles.subHeader}>We’d love to hear from you! Fill out the form below.</Text>

        <VStack space={4} style={styles.formWrapper}>
          <InputField
            label="Your Name"
            isDisabled={responceLoading}
            onChangeText={setName}
            inValid={errors.name !== ""}
            leftIcon={<Icon1 name="adduser" size={20} style={styles.iconStyle} />}
            errorMessage={errors.name}
            value={name}
            backgroundColor="#ffffff"
          />

          <InputField
            label="Your Email ID"
            isDisabled={responceLoading}
            onChangeText={setEmail}
            inValid={errors.email !== ""}
            leftIcon={<Icon4 name="email" size={20} style={styles.iconStyle} />}
            errorMessage={errors.email}
            value={email}
            placeholder="your_email@gmail.com"
            backgroundColor="#ffffff"
          />

          <TextAreaCustom
            label="Message"
            placeholder="Type your message here..."
            backgroundColor="#ffffff"
            inValid={errors.message !== ""}
            errorMessage={errors.message}
            value={message}
            onChangeText={setMessage}
            numberOfLines={6}
          />

          <Center mt={5}>
            <SubmitButton
              label="Submit"
              onChange={onChange}
              loading={responceLoading}
              spinnerPlacement="end"
              disabled={responceLoading}
              backgroundColor="#00796B"
            />
          </Center>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F2F1", // modern soft teal background
    paddingTop: 20
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#004D40",
    textAlign: "center",
    marginBottom: 5
  },
  subHeader: {
    fontSize: 14,
    color: "#00695C",
    textAlign: "center",
    marginBottom: 20
  },
  formWrapper: {
    width: "100%",
  },
  iconStyle: {
    marginLeft: 10,
    color: "#00796B"
  }
});

export default Register;
