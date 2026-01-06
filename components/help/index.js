import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const helpData = [
  { id: 1, question: "How to buy a coin?", answer: "Select the coin you want, click Buy, and complete the payment process." },
  { id: 2, question: "How to sell a coin?", answer: "Go to Sell tab, fill out the coin details form, upload images, and submit." },
  { id: 3, question: "How to track orders?", answer: "You can track your orders in the bucket/cart section by clicking on your coin purchase." },
  { id: 4, question: "Payment methods?", answer: "We accept credit cards, bank transfer, and e-wallet payments." },
];

const HelpPage = () => {
  const [openFAQ, setOpenFAQ] = React.useState(null);

  const toggleFAQ = (id) => setOpenFAQ(openFAQ === id ? null : id);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Help & Support</Text>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {helpData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.faqItem}
            onPress={() => toggleFAQ(item.id)}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Icon
                name={openFAQ === item.id ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color="#4B5D67"
              />
            </View>
            {openFAQ === item.id && (
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            )}
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactBox}>
          <Text style={styles.contactText}>Email: support@yourapp.com</Text>
          <Text style={styles.contactText}>Phone: +92 300 1234567</Text>
          <Text style={styles.contactText}>Working Hours: Mon - Fri, 9AM - 6PM</Text>
        </View>

        <Text style={styles.sectionTitle}>Tips & Guidelines</Text>
        <View style={styles.tipsBox}>
          <Text style={styles.tipItem}>• Always verify coin details before purchasing.</Text>
          <Text style={styles.tipItem}>• Keep your account information safe.</Text>
          <Text style={styles.tipItem}>• Contact support for any issues or disputes.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F6", // light modern background
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#00796B",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4B5D67",
    marginVertical: 15,
  },
  faqItem: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    paddingRight: 10,
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  contactBox: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  contactText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 2,
  },
  tipsBox: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  tipItem: {
    fontSize: 14,
    color: "#555",
    marginVertical: 3,
  },
});

export default HelpPage;
