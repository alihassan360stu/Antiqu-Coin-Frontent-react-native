import React from "react";
import { ScrollView, View, Text, StyleSheet, Pressable, Dimensions, Alert, Image } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";
import Icon3 from "react-native-vector-icons/Octicons";
import Icon4 from "react-native-vector-icons/Entypo";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/Ionicons";
import { SubmitButton, InputField } from "../../Common/Common_ui";
import baseUrl from "../../serveces/baseUrl";
import apiPaths from "../../serveces/apiPaths";
import { requestCameraPermission, requestGalleryPermission } from "../../utiles/permission";
import { toastMessage } from "../../Common/Common_ui";
import { useToast } from "native-base";
import { useSelector } from 'react-redux';




const initialState = {
    name: "", email: "", contact: "", cnic: "",
    coin_title: "", quantity:1, expected_rates: 600, why_selling: "",
    country: "",  address: "",
    file: null,
};

const Index = () => {
    const user = useSelector(({ auth }) => auth.user)
    const [state, setState] = React.useState({ ...initialState, name: user?.name || "", email: user?.email || "", user_id: user?.id || -1 });
    const [errorState, setErrorState] = React.useState({ general: "" });
    const [loading, setLoading] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");
    const toast = useToast();



    const onChange = (name, value) => {
        setState({ ...state, [name]: value });
        setErrorState({ general: "" }); // reset general error on change
    };

    // Camera
    const openCamera = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return;

        try {
            const img = await ImagePicker.openCamera({ width: 400, height: 400, cropping: true });
            setState({ ...state, file: img });
            setErrorState({ general: "" });
        } catch (e) {
            if (e.code !== "E_PICKER_CANCELLED") console.log("Camera Error:", e);
        }
    };

    // Gallery
    const pickImage = async () => {
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) return;

        try {
            const img = await ImagePicker.openPicker({ width: 400, height: 400, cropping: true });
            setState({ ...state, file: img });
            setErrorState({ general: "" });
        } catch (e) {
            if (e.code !== "E_PICKER_CANCELLED") console.log("Gallery Error:", e);
        }
    };

    // Form Validation (show only first error)
    const validateForm = () => {
        const errors = [];

        // if (!state.name.trim()) errors.push("Name is required");
        // else if (!state.email.trim() || !/^\S+@\S+\.\S+$/.test(state.email)) errors.push("Valid email is required");
        // else if (!state.contact.trim()) errors.push("Contact is required");
        // else if (!state.cnic.trim() || !/^\d{5}-\d{7}-\d{1}$/.test(state.cnic)) errors.push("CNIC must be 12345-1234567-1");
        // else if (!state.coin_title.trim()) errors.push("Coin title is required");
        // else if (!state.quantity || isNaN(state.quantity)) errors.push("Quantity must be a number");
        // else if (!state.expected_rates || isNaN(state.expected_rates)) errors.push("Expected rates must be a number");
        // else if (!state.why_selling.trim()) errors.push("Reason is required");
        // else if (!state.country.trim()) errors.push("Country is required");
        // else if (!state.address.trim()) errors.push("Address is required");
        // File optional, so not validated

        if (errors.length > 0) {
            setErrorState({ general: errors[0] });
            return false;
        } else {
            setErrorState({ general: "" });
            return true;
        }
    };

    // Submit Form
    const submitForm = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setSuccessMessage("");

        try {
            const formData = new FormData();

            Object.keys(state).forEach((key) => {
                if (key !== "file") formData.append(key, state[key]);
            });

                console.log("useruser", state);

            if (state.file) {
                formData.append("file", {
                    uri: state.file?.path.startsWith("file://") ? state.file.path : `file://${state.file?.path}`,
                    type: state.file?.mime || "image/jpeg",
                    name: state.file?.filename || `coin-${Date.now()}.jpg`,
                });
            }

            const { data } = await axios.post(`${baseUrl.api}${apiPaths.createCoins()}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });


            if (data.success) {
                toastMessage({ isClosable: true, toast: toast, title: "Created", message: "Coin request submitted successfully!", type: "success" })
                setState(initialState);
            } else {
                toastMessage({ isClosable: true, toast: toast, title: "Error", message: data.message || "Submission failed" })
            }
        } catch (error) {
            toastMessage({ isClosable: true, toast: toast, title: "Error", message: "something went wrong please try again" })
            console.log("Axios Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            {errorState.general ? <Text style={styles.error}>{errorState.general}</Text> : null}
            {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

            {/* Coins Section */}
            <Text style={styles.sectionTitle}>Coins Details</Text>
            <View style={styles.sectionCard}>
                <View style={styles.row}>
                    <InputField
                        width="48%"
                        label="Title"
                        placeholder="Coin Title"
                        value={state.coin_title}
                        onChangeText={(e) => onChange("coin_title", e)}
                        leftIcon={<Icon5 name="title" size={20} />}
                    />
                    <InputField
                        width="48%"
                        label="Quantity"
                        placeholder="100"
                        value={state.quantity?.toString()}
                        onChangeText={(e) => onChange("quantity", e)}
                        leftIcon={<Icon6 name="warning-sharp" size={20} />}
                    />
                </View>
                <View style={styles.row}>
                    <InputField
                        width="48%"
                        label="Expected Rates"
                        placeholder="$500"
                        value={state.expected_rates?.toString()}
                        onChangeText={(e) => onChange("expected_rates", e)}
                        leftIcon={<Icon5 name="price-check" size={20} />}
                    />
                    <InputField
                        width="48%"
                        label="Why Selling"
                        placeholder="Reason"
                        value={state.why_selling}
                        onChangeText={(e) => onChange("why_selling", e)}
                        leftIcon={<Icon5 name="question-mark" size={20} />}
                    />
                </View>

                {/* Upload Section */}
                <Text style={styles.uploadLabel}>Upload Coin Picture (optional)</Text>
                <View style={styles.uploadRow}>
                    <Pressable onPress={openCamera} style={styles.uploadBtn}>
                        <Icon4 name="camera" size={30} color="#3AA6B9" />
                        <Text style={styles.uploadText}>Camera</Text>
                    </Pressable>
                    <Pressable onPress={pickImage} style={styles.uploadBtn}>
                        <Icon3 name="upload" size={30} color="#3AA6B9" />
                        <Text style={styles.uploadText}>Gallery</Text>
                    </Pressable>

                    {state.file && (
                        <View style={styles.imagePreviewContainer}>
                            <Image source={{ uri: state.file.path }} style={styles.imagePreview} resizeMode="cover" />
                        </View>
                    )}
                </View>
            </View>

            {/* Personal Info */}
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <View style={styles.sectionCard}>
                <View style={styles.row}>
                    <InputField
                        width="48%"
                        label="Country"
                        placeholder="Pakistan"
                        value={state.country}
                        onChangeText={(e) => onChange("country", e)}
                        leftIcon={<Icon5 name="flag" size={20} />}
                    />
                    <InputField
                        width="48%"
                        label="Address"
                        placeholder="City/Area"
                        value={state.address}
                        onChangeText={(e) => onChange("address", e)}
                        leftIcon={<Icon4 name="address" size={20} />}
                    />
                </View>
                <View style={styles.row}>
                    <InputField
                        width="48%"
                        label="Contact"
                        placeholder="03XXXXXXXXX"
                        value={state.contact}
                        onChangeText={(e) => onChange("contact", e)}
                        leftIcon={<Icon5 name="phone" size={20} />}
                    />
                    <InputField
                        width="48%"
                        label="CNIC"
                        placeholder="12345-1234567-1"
                        value={state.cnic}
                        onChangeText={(e) => onChange("cnic", e)}
                        leftIcon={<Icon5 name="badge" size={20} />}
                    />
                </View>
            </View>
            <View style={{ marginVertical: 20 }}>
                <SubmitButton
                    onChange={submitForm}
                    label={loading ? "Loading ..." : "Submit"}
                    disabled={loading}
                    backgroundColor="#3AA6B9"
                    width="100%"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F2F2F2", padding: 10 },
    sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10, marginTop: 20, color: "#333" },
    sectionCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
    uploadLabel: { fontSize: 14, fontWeight: "600", marginTop: 10 },
    uploadRow: { flexDirection: "row", justifyContent: "flex-start", marginTop: 5, alignItems: "center" },
    uploadBtn: { flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: 20 },
    uploadText: { fontSize: 12, color: "#3AA6B9", marginTop: 5 },
    imagePreviewContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        overflow: "hidden",
        marginLeft: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    imagePreview: { width: "100%", height: "100%" },
    error: { color: "red", fontWeight: "600", marginBottom: 5 },
    success: { color: "green", fontWeight: "600", marginBottom: 10 },
});

export default Index;
