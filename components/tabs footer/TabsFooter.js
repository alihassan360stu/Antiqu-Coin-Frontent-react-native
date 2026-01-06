import * as React from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Appbar } from 'react-native-paper';

const { width } = Dimensions.get("window");

const TabsFooter = ({ onChnageTab, index }) => {
  const tabItems = [
    { key: 1, label: "Home", icon: <Icons name="home" size={24} color="white" /> },
    { key: 2, label: "Sell", icon: <Text style={{ color: "white", fontWeight: "600" }}>Sell</Text> },
    { key: 3, label: "Help", icon: <Image source={require("../../assets/help.png")} style={{ width: 24, height: 24 }} /> },
    { key: 4, label: "Messages", icon: <Icons name="message" size={24} color="white" /> },
    { key: 5, label: "Cart", icon: <Image source={require("../../assets/bucket.png")} style={{ width: 24, height: 24 }} /> },
  ];

  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.container}>
        {tabItems.map((item, idx) => (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.7}
            onPress={() => onChnageTab(item.key)}
            style={[styles.tabButton, index === item.key && styles.activeTab]}
          >
            {item.icon}
            {item.label && <Text style={styles.tabLabel}>{item.label}</Text>}
            {index === item.key && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </Appbar.Header>
  );
};

const styles = {
  header: {
    backgroundColor: "#4B5D67",
    height: 60,
    justifyContent: "center",
    elevation: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width,
  },
  tabButton: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  activeTab: {
    // optional: add slight background color for active tab
    backgroundColor: "#3C4A54",
  },
  tabLabel: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    width: "60%",
    height: 3,
    backgroundColor: "yellow",
    borderRadius: 2,
  },
};

export default TabsFooter;
