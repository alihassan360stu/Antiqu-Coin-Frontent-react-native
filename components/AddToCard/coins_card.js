import * as React from 'react';
import { Text, View, FlatList, RefreshControl } from "react-native"
import { SubmitButton } from '../../Common/Common_ui';

import MyCustomCard from './Card';

let copper_array = [
    {
        year: "100 years old",
        price: 150,
        country: "Australian",
        category: "copper",
        description: "this is australlian old currency forthe local trade",
        discount: 0,
        quantity: 0,
        delivery: 6,
        is_availabe: 0,
        filename: "copper21",
    },
    {
        year: "55 years old",
        price: 50,
        country: "India",
        category: "copper",
        description: "this s indian old currency create by indian govt for the local trade",
        discount: 0,
        quantity: 10,
        delivery: 6,
        is_availabe: 1,
        filename: "copper22",
    },
    {
        year: "125 years old",
        price: 800,
        country: "England",
        category: "copper",
        description: "this is old pond coin belong to england for nlocal trade improvement",
        discount: 0,
        quantity: 10,
        delivery: 6,
        is_availabe: 1,
        filename: "copper23",
    },
    {
        year: "60 years old",
        price: 150,
        country: "south africa",
        category: "copper",
        description: "this is southafrica coin its theree currency for grow the business",
        discount: 0,
        quantity: 0,
        delivery: 6,
        is_availabe: 0,
        filename: "copper24",
    },
    {
        year: "250 years old",
        price: 200,
        country: "Iraq",
        category: "copper",
        description: "this is old iraqi coin belong king muzaafar ud din shah",
        discount: 0,
        quantity: 25,
        delivery: 6,
        is_availabe: 1,
        filename: "copper25",
    },
    {
        year: "500 years old",
        price: 300,
        country: "japan",
        category: "copper",
        description: "this is japan kung fu martial artist coin on dragon printed",
        discount: 0,
        quantity: 0,
        delivery: 6,
        is_availabe: 0,
        filename: "copper26",
    },
    {
        year: "250 years old",
        price: 300,
        country: "India",
        category: "copper",
        description: "this is indian old kashinath temple coin belong to the indian temple",
        discount: 0,
        quantity: 0,
        delivery: 6,
        is_availabe: 0,
        filename: "copper27",
    },
    {
        year: "200 years old",
        price: 250,
        country: "India",
        category: "copper",
        description: "this is mughal emperior coin belong to mughal family",
        discount: 0,
        quantity: 5,
        delivery: 6,
        is_availabe: 1,
        filename: "copper28",
    },
    {
        year: "108 years old",
        price: 190,
        country: "India",
        category: "copper",
        description: "this is indian old currency belong old people trade style this is now something new antiquecoin",
        discount: 0,
        quantity: 10,
        delivery: 6,
        is_availabe: 1,
        filename: "copper29",
    }
]
const Coins_card = ({ onChnageTab }) => {
    return (
        <FlatList
            data={copper_array}
            // ref={ref}
            // onViewableItemsChanged={onViewableItemsChanged}
            ListHeaderComponent={() => <View style={{ width: "100%", height: 100 , flexDirection:"row" , justifyContent:"center" , alignItems:"center" }}>

                <Text style={{fontSize:30 , color:"white" , fontWeight:900}}>
                    Your Favorite Items.
                </Text>

            </View>}
            ListEmptyComponent={() => <View style={{ width: "100%", height: 400, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: 500, color: "white", marginBottom: 20 }}>There Is No Items In This Cart</Text>
                <SubmitButton
                    backgroundColor="#3AA6B9"
                    label='Add Items'
                    onChange={() => { onChnageTab(1) }}
                />
            </View>}
            // ItemSeparatorComponent={() => <View style={{ backgroundColor: "orange", height: 2 }}></View>}
            ListFooterComponent={() => <View style={{ height: 40, width: "100%", alignItems: "center", marginTop: 10 }}>
                <Text style={{ fontSize: 9, color: "white" }}>No More Items</Text>
            </View>}
            // getItemCount={() => Silver_array.length}
            // getItem={(data, index) => Silver_array[index]}
            renderItem={({ item }) => <MyCustomCard item={item} />
            }
            // initialNumToRender={5}
            // initialScrollIndex={8}
            keyExtractor={(item, index) => item.filename + index}
        // horizontal={false}
        // getItemLayout={(data, index) => {
        //     return { length: 300, offset: 300 * index, index }
        // }}


        // refreshControl={
        //     <RefreshControl

        //         progressViewOffset={30}
        //     // refreshing={refreshing}
        //     // onRefresh={()=>{console.log("sdfsfsdgfdfc")}}
        //     />
        // }
        >

        </FlatList>
    );
}

export default Coins_card;
