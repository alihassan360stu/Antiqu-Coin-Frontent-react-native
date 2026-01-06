import Header from "./header/Header"
// import Filters from "./coin filters/filter";
import TabsFooter from "./tabs footer/TabsFooter"
import BannerImage from "./banner slider/BannerImages"
import Coins_card from "./coin cards/coins_card";
import LinearGradientWrapper from "./LinearGradientWrapper"
import { FlatList, View } from "react-native"
import { useState } from "react";
import Contact from "./contact us/index"
import AddToCard from "./AddToCard/coins_card"
import Selling from "./Selling/index";
import HelpPage from "./help";
import { NativeBaseProvider } from 'native-base';
import AddtoCard from "./AddToCard/coins_card"

const scrolableItems = [
    {
        id: 1,
        data: <BannerImage />
    },
    {
        id: 2,
        data: <Coins_card />
    }
]

const Tabs = (index) => {
    switch (index) {
        case 1: return <FlatList
            data={scrolableItems}
            renderItem={({ item }) => <View>{item.data}</View>} >
        </FlatList>
        case 2: return <Selling />
        case 3: return <HelpPage />
        case 4: return <Contact />
        case 5: return < AddtoCard />

    }

}

const Index = () => {
    const [index, setIndex] = useState(1)
    const onChnageTab = (id) => {
        setIndex(id)
    }

    console.log("index", index)

    return <View style={{ position: "relative", height: "100%", display: "flex" }}>
        <NativeBaseProvider>
        <LinearGradientWrapper
            colors={['#e0f7fa', '#ffffff']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ minHeight: "93%", flex: 1, height: "93%" }}

        >
            <Header />
            {Tabs(index)}
        </LinearGradientWrapper>
        <View style={{ alignSelf: "flex-end", height: "7%" }}>
            {
                index > 0 && index <= 6 && <TabsFooter onChnageTab={onChnageTab} index={index} />
            }
        </View>
        </NativeBaseProvider>
    </View>
}


export default Index;