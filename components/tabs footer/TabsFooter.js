import * as React from 'react';
import { Appbar, Tooltip } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Image, View, TouchableOpacity, Text, TouchableHighlight } from "react-native"

const TabsFooter = ({ onChnageTab, index }) => {

  const TouchableOpacityCss = (width) => {
    return {
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%",
      width: width,
      backgroundColor: '#4B5D67',
      elevation: 3,
      cursor: "pointer",
      position:"relative"
    }
  }

  return (
    <Appbar.Header style={{ backgroundColor: "#4B5D67", position: "relative", width: "100%", height: "100%" }}>
      <View style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TouchableOpacity style={TouchableOpacityCss("15%")}
          activeOpacity={0.7}
          onPress={() => { onChnageTab(1) }}>
          {index === 1 && <View style={{ width: "100%", height: 4, backgroundColor: "yellow" , position:"absolute" , top:0 }}></View>}
          <Icons name="home" color="white" size={25} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.2} style={TouchableOpacityCss("15%")} onPress={() => { onChnageTab(2) }}>
        {index === 2 && <View style={{ width: "100%", height: 4, backgroundColor: "yellow" , position:"absolute" , top:0 }}></View>}
          <Text style={{ color: "white" }}>
            Sell
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={TouchableOpacityCss("20%")} onPress={() => { onChnageTab(3) }}>
        {index === 3 && <View style={{ width: "100%", height: 4, backgroundColor: "yellow" , position:"absolute" , top:0 }}></View>}
          <Text style={{ color: "white" }}>
            serveces
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={TouchableOpacityCss("15%")} onPress={() => { onChnageTab(4) }}>
        {index === 4 && <View style={{ width: "100%", height: 4, backgroundColor: "yellow" , position:"absolute" , top:0 }}></View>}
          <Image style={{ height: "100%", width: "70%" }} source={require("../../assets/help.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={TouchableOpacityCss("15%")}>
        {index === 5 && <View style={{ width: "100%", height: 4, backgroundColor: "yellow" , position:"absolute" , top:0 }}></View>}
          <Icons name="message" color="white" size={25} onPress={() => { onChnageTab(5) }} />
        </TouchableOpacity>
        <TouchableOpacity style={TouchableOpacityCss("20%")} onPress={() => { onChnageTab(6) }}>
        {index === 6 && <View style={{ width: "100%", height: 4, backgroundColor: "yellow" , position:"absolute" , top:0 }}></View>}
          <Image style={{ height: "100%", width: "100%" }} source={require("../../assets/bucket.png")} />
        </TouchableOpacity>
      </View>
    </Appbar.Header>

  )
}

export default TabsFooter;