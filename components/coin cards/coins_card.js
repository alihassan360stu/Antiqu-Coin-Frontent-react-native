import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { VStack, HStack, Badge } from "native-base";
import Axios from "axios";
import baseUrl from "../../serveces/baseUrl";
import apiPaths from "../../serveces/apiPaths";
import CardDetails from "./specificDetails";
import { useSelector } from "react-redux";
import { useToast } from "native-base";
import { toastMessage } from "../../Common/Common_ui";


// Default coin image (put your local asset here)
const defaultCoinImage = require("../../assets/sample.png"); // add this image in assets folder

const { width: screenWidth } = Dimensions.get("window");
const numColumns = 2;
const cardMargin = 10;
const cardWidth = (screenWidth - cardMargin * (numColumns + 1)) / numColumns;

const CoinsCard = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState(null)
    const [reload, setReload] = useState(false)
    const search = useSelector(({ search }) => search.search);
    const user = useSelector(({ auth }) => auth.user);
    const toast = useToast();


    useEffect(() => {
        fetchCoins();
    }, [search]);

    useEffect(() => {
        if (reload === true) {
            fetchCoins()
            setReload(false)
        }
    }, [reload])

    const fetchCoins = async () => {
        try {
            const res = await Axios.get(`${baseUrl.api}${apiPaths.getCoins()}`, {
                params: { search: search }
            })
            if (res.data.success) setCoins(res.data.data);
            setLoading(false);
        } catch (e) {
            console.log("Error fetching coins:", e);
            setLoading(false);
        }
    };

    const handleAddToCart = async (item) => {
        try {
            const payload = {
                userId: user?.id,
                date: new Date(),
                title: item.coin_title,
                name: user?.name || "No Name",
                card_id: item?.id
            };
            const res = await Axios.post(`${baseUrl.api}${apiPaths.addToCart()}`, payload);
            if (res.data.success) {
                toastMessage({ isClosable: true, toast: toast, title: "Created", message: "Coin added to cart successfully!", type: "success" })
            } else {
                toastMessage({ isClosable: true, toast: toast, title: "Error", message: res.data.message || "Something went wrong please try again" })
            }
        } catch (error) {
            console.log("Error adding to cart:", error);
            toastMessage({ isClosable: true, toast: toast, title: "Error", message: "Something went wrong please try again" })
        }
    };


    const handleBuyNow = (item) => {
        console.log("Buy now:", item.coin_title);
    };

    const renderCoin = ({ item }) => {
        let file_path = item?.file_path
        if (file_path) {
            file_path = file_path.replace("uploads\\coins", "")
        }
        return <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
                setSelected(item)
                setShowModal(true)
            }}
            style={styles.card}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={
                        file_path
                            ? { uri: `${baseUrl.api}/${file_path.replace(/\\/g, "/")}` }
                            : defaultCoinImage
                    }
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            {/* Coin Info */}
            <VStack padding={8} space={1}>
                <Text style={styles.coinTitle} numberOfLines={1}>
                    {item.coin_title || "No Title"}
                </Text>
                <Text style={styles.countryText} numberOfLines={1}>
                    Location: {item.country || "Unknown"}
                </Text>
                <Text style={styles.whySelling} numberOfLines={2}>
                    Reason: {item.why_selling || "Not Provided"}
                </Text>

                {/* Price & Quantity */}
                <HStack space={2} marginTop={6} justifyContent="space-between">
                    <Badge colorScheme="green" variant="subtle" rounded="full" _text={{ fontSize: 10 }}>
                        ${item.expected_rates?.toLocaleString() || 0}
                    </Badge>
                    <Badge colorScheme="orange" variant="subtle" rounded="full" _text={{ fontSize: 10 }}>
                        Qty: {item.quantity || 0}
                    </Badge>
                </HStack>

                {/* Buttons */}
                <HStack space={2} marginTop={8}>
                    <TouchableOpacity style={styles.addToCartBtn} onPress={() => handleAddToCart(item)}>
                        <Text style={styles.btnText}>Add Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyNowBtn} onPress={() => handleBuyNow(item)}>
                        <Text style={styles.btnText}>Buy Now</Text>
                    </TouchableOpacity>
                </HStack>
            </VStack>

            {showModal === true && <CardDetails showModal={showModal} setShowModal={setShowModal} item={selected} setReload={setReload} />}
        </TouchableOpacity>
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#3AA6B9" />
            </View>
        );
    }

    return (
        <FlatList
            data={coins}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCoin}
            numColumns={numColumns}
            contentContainerStyle={{ padding: cardMargin }}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        margin: cardMargin / 2,
        borderRadius: 14,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        overflow: "hidden",
    },
    imageContainer: {
        width: "100%",
        height: cardWidth * 0.7,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "80%",
        height: "80%",
    },
    coinTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#222",
    },
    countryText: {
        fontSize: 12,
        color: "#555",
    },
    whySelling: {
        fontSize: 11,
        color: "#777",
    },
    addToCartBtn: {
        flex: 1,
        backgroundColor: "#FFA500",
        paddingVertical: 6,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buyNowBtn: {
        flex: 1,
        backgroundColor: "#3AA6B9",
        paddingVertical: 6,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 10,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CoinsCard;
