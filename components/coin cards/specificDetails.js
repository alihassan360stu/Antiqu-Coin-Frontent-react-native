import React, { useState } from "react";
import { View, Image, ScrollView, StyleSheet, Text, Dimensions } from "react-native";
import { Portal, Dialog, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import baseUrl from "../../serveces/baseUrl";
import { TouchableWrapper } from "../../Common/Common_ui";
import axios from "axios";
import apiPaths from "../../serveces/apiPaths";
import { useToast } from "native-base";
import { toastMessage } from "../../Common/Common_ui";

const { height } = Dimensions.get("window");

const CardDetails = ({ showModal, setShowModal, item, setReload }) => {
  const user = useSelector(({ auth }) => auth.user);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const toast = useToast();

  if (!item) return null;

  let file_path = item?.file_path;
  if (file_path) {
    file_path = file_path.replace("uploads\\coins", "")
    file_path = `${baseUrl.api}/${file_path.replace(/\\/g, "/")}`
  }

  const handleAddCart = () => console.log("Add to cart:", item.id);
  const handleBuyNow = () => console.log("Buy now:", item.id);

  const handleDelete = async () => {
    try {
      console.log("apiPaths.deleteCoin(item.id)", apiPaths.deleteCoin(item.id))
      const res = await axios.delete(`${baseUrl.api}${apiPaths.deleteCoin(item.id)}`);
      if (res.data.success) {
        toastMessage({ isClosable: true, toast: toast, title: "Deleted", message: "Coin deleted successfully!", type: "success" })
        setShowDeleteConfirm(false);
        setShowModal(false);
        setReload(true)
      } else {
        toastMessage({ isClosable: true, toast: toast, title: "Error", message: res.data.message || "Something went wrong" })
      }
    } catch (error) {
      console.log("Delete error:", error.response?.data || error.message);
      toastMessage({ isClosable: true, toast: toast, title: "Error", message: error.response?.data || error.message || "Something went wrong" })
    }
  };

  return (
    <Portal>
      {/* === Card Details Dialog === */}
      <Dialog
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        style={styles.dialog}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={file_path ? { uri: file_path } : require("../../assets/sample.png")}
            style={styles.image}
          />
        </View>

        <Dialog.Content>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{item.coin_title}</Text>
            <Text style={styles.text}>📍 Location: <Text style={styles.bold}>{item.country}</Text></Text>
            <Text style={styles.text}>💰 Price: <Text style={styles.price}>${item.expected_rates}</Text></Text>
            <Text style={styles.text}>📦 Quantity: <Text style={styles.bold}>{item.quantity}</Text></Text>
            <Text style={styles.reasonTitle}>Why Selling?</Text>
            <Text style={styles.reasonText}>{item.why_selling}</Text>
          </ScrollView>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <TouchableWrapper
            width="32%"
            label="Add Cart"
            fontSize={14}
            fontWeight={700}
            color="#FFA500"
            onPress={handleAddCart}
          />
          <TouchableWrapper
            width="32%"
            label="Buy"
            fontSize={14}
            fontWeight={700}
            color="#3AA6B9"
            onPress={handleBuyNow}
          />
          {user?.id === item?.user_id && (
            <TouchableWrapper
              width="32%"
              label="Delete"
              fontSize={14}
              fontWeight={700}
              color="#E53935"
              onChange={() => {
                setShowDeleteConfirm(true)
              }}
            />
          )}
        </Dialog.Actions>
      </Dialog>

      {/* === Delete Confirmation Dialog === */}
      <Dialog
        visible={showDeleteConfirm}
        onDismiss={() => setShowDeleteConfirm(false)}
        style={styles.dialog}
      >
        <Dialog.Title>Delete Coin</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure you want to delete this coin?</Text>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "space-between", paddingHorizontal: 8 }}>
          <Button onPress={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button onPress={handleDelete} color="#E53935">Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: { borderRadius: 16, overflow: "hidden" },
  imageWrapper: { width: "100%", height: height * 0.4, backgroundColor: "#f5f5f5", justifyContent: "center", alignItems: "center" },
  image: { width: "90%", height: "90%", resizeMode: "contain" },
  title: { fontSize: 18, fontWeight: "700", textAlign: "center", marginBottom: 6 },
  text: { fontSize: 14, marginVertical: 2 },
  bold: { fontWeight: "700" },
  price: { fontWeight: "700", color: "#3AA6B9" },
  reasonTitle: { marginTop: 10, fontSize: 15, fontWeight: "700" },
  reasonText: { fontSize: 13, color: "#555" },
  actions: { justifyContent: "space-between", paddingHorizontal: 8, paddingBottom: 10 },
});

export default CardDetails;
