import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get("window"); 

let icons = [
    { title: "Gold", id: 1, src: require('../../assets/filters/gold.png') },
    { title: "Silver", id: 2, src: require('../../assets/filters/silver.png') },
    { title: "Latest", id: 3, src: require('../../assets/filters/new.png') },
    { title: "Styled", id: 4, src: require('../../assets/filters/styled.png') },
];

const Filters = () => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
                width: "100%",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: width * 0.8, 
                }}
            >
                {icons.map(({ id, title, src }) => (
                    <TouchableOpacity
                        key={id}
                        style={{
                            alignItems: "center",
                        }}
                        activeOpacity={0.7}
                        onPress={() => console.log(title + " filter pressed")}
                    >
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: "#f0f0f0",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 5,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                                elevation: 3, 
                            }}
                        >
                            <Image
                                source={src}
                                style={{ width: 30, height: 30, resizeMode: "contain" }}
                            />
                        </View>
                        <Text
                            style={{
                                color: "#333",
                                fontSize: 12,
                                fontWeight: "500",
                                textAlign: "center",
                            }}
                        >
                            {title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default Filters;
