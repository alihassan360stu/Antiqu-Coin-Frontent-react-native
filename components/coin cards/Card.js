import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import baseUrl from "../../serveces/baseUrl";
import { TouchableWrapper } from "../../Common/Common_ui"
import { LinearGradient } from 'react-native-linear-gradient';
import CardDetails from "./specificDetails"

const Card = ({ item }) => {
    const [showModal, setShowModal] = React.useState(false)
    const [selectedItem, setSelectedItems] = React.useState({})
    const [selectedId, setSelectedId] = React.useState(-1)
    const openSpecificDetaild = () => {
        setSelectedId(item.id)
        setSelectedItems(item)
        setShowModal(true)
    }
    const { year, country, price, description, delivery } = item;
    return (
        <LinearGradient
            style={style.container}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#aed1ef', '#f2dfc1', '#fc94b3']}

        >
            {/* <View style={style.container}> */}
            <View style={style.header}>
                <Text style={{ color: "black", fontSize: 11, fontWeight: 700 }}>
                    {year} of {country}
                </Text>
                <Text style={{ color: "green", fontSize: 13, fontWeight: 800 }}>
                    {price}$
                </Text>
            </View>
            <View style={style.contant}>
                <TouchableOpacity
                    onPress={() => { openSpecificDetaild(item) }}
                    style={style.contant_child_1}>
                    <Image style={style.image} source={{ uri: `${baseUrl.api}/static/coins/${item.filename}.png` }} />
                </TouchableOpacity>
                <View style={style.contant_child_2}>
                    <View style={style.diliveryWrapper}>
                        <Text style={{ fontSize: 10, fontWeight: 600, color: "black" }}>dilivery in {delivery} days</Text>
                    </View>
                    <View style={style.sold_or_available}>
                        <Text style={{ fontSize: 12, fontWeight: 600, color: "black" }}>SOLD</Text>
                    </View>
                    <View style={style.textWrapper}>
                        <Text style={{ fontSize: 12, fontWeight: 600, color: "black" }}>Quantity 1</Text>
                    </View>
                    <View style={style.textWrapper}>
                        <Text style={{ fontSize: 9, fontWeight: 600, color: "black" }}>{description}</Text>
                    </View>

                </View>
            </View>
            <View style={style.footer}>
                <TouchableWrapper fontSize={11} fontWeight={700} label="Buy" color="orange" />
                <TouchableWrapper fontSize={11} fontWeight={700} width="40%" label="Add To Card" color="orange" />
            </View>

            {/* </View> */}
            <CardDetails setShowModal={setShowModal} showModal={showModal} item={selectedItem} />
        </LinearGradient>
    )
}

export default React.memo(Card);


const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        minHeight: 120,
        width: "48%",
        margin: "1%",
        backgroundColor: "white",
        borderRadius: 6,
        elevation: 40
    },
    header: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 25,
        flexWrap: "wrap",
        overflow: "hidden",
        padding: 2
    },
    contant: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        height: 90,

    },
    contant_child_1: {
        width: "50%",
        height: "100%",
        // backgroundColor: "red",
        flex: 1
    },
    contant_child_2: {
        width: "50%",
        height: "100%",
        display: "flex",
        overflow: "hidden"

    },
    footer: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        minHeight: 15,
        paddingLeft: 5,
    },
    image: {
        width: "95%",
        height: "95%",
        borderRadius: 5
    },
    diliveryWrapper: {
        backgroundColor: "gray",
        justifyContent: "center",
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 30
    },
    sold_or_available: {
        backgroundColor: "#F24C3D",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        width: "35%",
        marginTop: 3
    },
    textWrapper: {
        paddingLeft: 5,
        marginTop: 5,
    }

})