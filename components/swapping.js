import React, { useEffect, useState } from 'react';
import { ScrollView, Image, View, Dimensions } from 'react-native';
import apiPaths from '../serveces/apiPaths';

const ScrollableImageView = () => {
  const [images, setImages] = useState([])
  // Array of image URLs
  // const images1 = [
  //   require("../assets/favicon.png"),
  //   require("../assets/logo_main.png"),
  //   require("../assets/old.png"),
  //   require("../assets/logo_main.png"),
  // ];
  console.log("skjdfbsikjdx")

  const apiCalled = (path) => {
    return Axios.get(path, {
    }).then((result) => {
      return result.data;
    })
  }


  useEffect(() => {
    const load = async () => {
      try {
        let data = await apiCalled(apiPaths.allUsers())
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
    load()
  }, [])

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      {images.map((imageing, index) => (
        <>
          <View key={index} style={{ margin: 10 }}>
            <Image
              source={imageing}
              style={{ width: screenWidth * 0.8, height: 200, borderRadius: 10 }}
              resizeMode="cover"
            />
          </View>
        </>
      ))}
    </ScrollView>
  );
};

export default ScrollableImageView;
