import Header from "./header/Header"
import Filters from "./coin filters/filter";
import TabsFooter from "./tabs footer/TabsFooter"
import BannerImage from "./banner slider/BannerImages"
import Coins_card from "./coin cards/coins_card";
import LinearGradientWrapper from "./LinearGradientWrapper"
import { FlatList, View } from "react-native"
import { useState } from "react";
import Contact from "./contact us/index"
import AddToCard from "./AddToCard/coins_card"
import Selling from "./Selling/index";

const scrolableItems = [
    {
        id: 1,
        data: <Filters />
    },
    {
        id: 2,
        data: <BannerImage />
    },
    {
        id: 3,
        data: <Coins_card />
    }
]

const Index = () => {
    const [index, setIndex] = useState(1)
    const onChnageTab = (id) => {
        setIndex(id)
    }


    return <View style={{ position: "relative", height: "100%", display: "flex" }}>
        <LinearGradientWrapper style={{ minHeight: "93%", flex: 1, height: "93%" }} >
            <Header />
            {
                index === 1 && <FlatList
                    data={scrolableItems}
                    renderItem={({ item }) => <View>{item.data}</View>} >
                </FlatList>
            }
            {
                index === 2 && <Selling />
            }

            {
                index === 5 && <Contact />
            }
            {
                index === 6 && < AddToCard onChnageTab={onChnageTab} />
            }
        </LinearGradientWrapper>
        <View style={{ alignSelf: "flex-end", height: "7%" }}>
            <TabsFooter onChnageTab={onChnageTab} index={index} />
        </View>
    </View>
}


export default Index;