import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get("window");

const SwappableImagesView = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        require("../../assets/banner/banner1.jpg"),
        require("../../assets/banner/banner2.jpg"),
        require("../../assets/banner/banner3.jpg"),
        require("../../assets/banner/banner4.jpg"),
        require("../../assets/banner/banner5.jpg"),
        require("../../assets/banner/banner6.jpg"),
    ];

    return (
        <View
            style={{
                width: "100%",
                height: 200,
                marginVertical: 15,
            }}
        >
            <Swiper
                loop={true}
                autoplay
                autoplayTimeout={4}
                showsPagination={true}
                index={currentImageIndex}
                onIndexChanged={(index) => setCurrentImageIndex(index)}
                dotStyle={{
                    backgroundColor: "rgba(255,255,255,0.5)",
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 3,
                }}
                activeDotStyle={{
                    backgroundColor: "orange",
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 3,
                }}
            >
                {images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => console.log(`Image ${index + 1} pressed`)}
                        style={{
                            width: width * 0.95,
                            height: 200,
                            alignSelf: "center",
                            borderRadius: 15,
                            overflow: "hidden",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                            elevation: 4,
                        }}
                    >
                        <Image
                            source={image}
                            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                        />
                    </TouchableOpacity>
                ))}
            </Swiper>
        </View>
    );
};

export default SwappableImagesView;
