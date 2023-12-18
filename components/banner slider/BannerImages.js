import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

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

    const changeImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <View  style={{ width: "100%", height: 180,marginTop:15 , marginBottom:15}}>
            <Swiper
                title="ali hassan"
                loop={true}
                onTouchStart={() => { console.log("sdifjsdjifbsdf") }}
                dotStyle={{ width: 15 }}
                activeDotColor="orange"
                activeDotStyle={{ width: 15 }}
                autoplay
                index={currentImageIndex}
                dotColor="white"
                
            >
                {images.map((image, index) => (
                    <TouchableOpacity key={index}>
                            <Image source={image} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                ))}
            </Swiper>
        </View>
    );
};

export default SwappableImagesView;
