import * as React from 'react';
import { useCallback, useState, useRef } from "react"
import { Avatar, Button, Card, Title, Paragraph, } from 'react-native-paper';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { Box, VStack, Divider, Text } from "native-base"
import { Image, View, FlatList, RefreshControl } from "react-native"
import baseUrl from '../../serveces/baseUrl';

import MyCustomCard from './Card';

let copper_array =[
    {
        year:"500 years old",
        price:450,
        country:"England",
        category:"copper",
        description:"this is copper antique coin belong to england this is britain currency",
        discount:0,
        quantity:4,
        delivery:6,
        is_availabe:1,
        filename:"copper1",
    },
    {
        year:"400 years old",
        price:600,
        country:"Japan",
        category:"copper",
        description:"This is cpper antique coin belong to japan gifty martial artist student",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper2",
    },
    {
        year:"400 years old",
        price:438,
        country:"America",
        category:"copper",
        description:"this is american dollar its too much old coin belong to america using people for the local trade",
        discount:0,
        quantity:2,
        delivery:6,
        is_availabe:1,
        filename:"copper3",
    },
    {
        year:"350 years old",
        price:780,
        country:"Belgium",
        category:"copper",
        description:"this coin is belong from belgium this locally trade coin during people and govt",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper4",
    },
    {
        year:"600 years old",
        price:420,
        country:"Indian",
        category:"copper",
        description:"this is indian tradition coin usign to gift this coin to thier guest in india",
        discount:0,
        quantity:20,
        delivery:6,
        is_availabe:1,
        filename:"copper5",
    },
    {
        year:"200 years old",
        price:800,
        country:"Australia",
        category:"copper",
        description:"this is george 6 australian antique coin create by the king george of australia",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper6",
    },
    {
        year:"250 years old",
        price:600,
        country:"Indian",
        category:"copper",
        description:"this is indian antique coin belong mughal family this is islamic tradition coin by mughal empire",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper7",
    },
    {
        year:"70 years old",
        price:120,
        country:"Pakistan",
        category:"copper",
        description:"this is pakistan one pesa create by pakistan govt for the local trade now this is just an antique",
        discount:0,
        quantity:250,
        delivery:6,
        is_availabe:1,
        filename:"copper8",
    },
    {
        year:"100 years old",
        price:150,
        country:"India",
        category:"copper",
        description:"this is indian state karnatak govt coin belong to karnatak",
        discount:0,
        quantity:10,
        delivery:6,
        is_availabe:1,
        filename:"copper9",
    },
    {
        year:"150 years old",
        price:350,
        country:"South Africa",
        category:"copper",
        description:"this south africa antique old coin using in forest for the local trade",
        discount:0,
        quantity:20,
        delivery:6,
        is_availabe:1,
        filename:"copper10",
    },
    {
        year:"200 years old",
        price:350,
        country:"America",
        category:"copper",
        description:"this is american 1 cent cretae by american govt for the local trade nut now this is just an antique",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper11",
    },
    {
        year:"250 years old",
        price:550,
        country:"china",
        category:"copper",
        description:"this is coin is belong to china this dragon printed antique coin",
        discount:0,
        quantity:2,
        delivery:6,
        is_availabe:1,
        filename:"copper12",
    },
    {
        year:"105 years old",
        price:900,
        country:"australia",
        category:"copper",
        description:"this is australian cureency belong to australia create for local trades in australia ",
        discount:0,
        quantity:10,
        delivery:6,
        is_availabe:1,
        filename:"copper13",
    },
    {
        year:"300 years old",
        price:220,
        country:"brazil",
        category:"copper",
        description:"this is brazil currency created y thier govt for the growth of local trades but now this is just antique",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper14",
    },
    {
        year:"100 years old",
        price:190,
        country:"china",
        category:"copper",
        description:"this is china antique coin belong to the china this is just fpr trade purpose",
        discount:0,
        quantity:3,
        delivery:6,
        is_availabe:1,
        filename:"copper15",
    },
    {
        year:"150 years old",
        price:650,
        country:"taiwan",
        category:"copper",
        description:"this is taiwan dragon symbolic coin using to gifting purpose",
        discount:0,
        quantity:5,
        delivery:6,
        is_availabe:1,
        filename:"copper16",
    },
    {
        year:"120 years old",
        price:500,
        country:"India",
        category:"copper",
        description:"this is traditions coin belong indian gods temple",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper17",
    },
    {
        year:"75 years old",
        price:250,
        country:"china",
        category:"copper",
        description:"this is china currenyc mau zeding was the founder of china this show the love and spirit",
        discount:0,
        quantity:50,
        delivery:6,
        is_availabe:1,
        filename:"copper18",
    },
    {
        year:"100 years old",
        price:200,
        country:"Iran",
        category:"copper",
        description:"this is old iran currency create by there govt for the local trade",
        discount:0,
        quantity:5,
        delivery:6,
        is_availabe:1,
        filename:"copper19",
    },
    {
        year:"150 years old",
        price:250,
        country:"portugal",
        category:"copper",
        description:"this portugal local currency using for the trade",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper20",
    },
    {
        year:"100 years old",
        price:150,
        country:"Australian",
        category:"copper",
        description:"this is australlian old currency forthe local trade",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper21",
    },
    {
        year:"55 years old",
        price:50,
        country:"India",
        category:"copper",
        description:"this s indian old currency create by indian govt for the local trade",
        discount:0,
        quantity:10,
        delivery:6,
        is_availabe:1,
        filename:"copper22",
    },
    {
        year:"125 years old",
        price:800,
        country:"England",
        category:"copper",
        description:"this is old pond coin belong to england for nlocal trade improvement",
        discount:0,
        quantity:10,
        delivery:6,
        is_availabe:1,
        filename:"copper23",
    },
    {
        year:"60 years old",
        price:150,
        country:"south africa",
        category:"copper",
        description:"this is southafrica coin its theree currency for grow the business",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper24",
    },
    {
        year:"250 years old",
        price:200,
        country:"Iraq",
        category:"copper",
        description:"this is old iraqi coin belong king muzaafar ud din shah",
        discount:0,
        quantity:25,
        delivery:6,
        is_availabe:1,
        filename:"copper25",
    },
    {
        year:"500 years old",
        price:300,
        country:"japan",
        category:"copper",
        description:"this is japan kung fu martial artist coin on dragon printed",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper26",
    },
    {
        year:"250 years old",
        price:300,
        country:"India",
        category:"copper",
        description:"this is indian old kashinath temple coin belong to the indian temple",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper27",
    },
    {
        year:"200 years old",
        price:250,
        country:"India",
        category:"copper",
        description:"this is mughal emperior coin belong to mughal family",
        discount:0,
        quantity:5,
        delivery:6,
        is_availabe:1,
        filename:"copper28",
    },
    {
        year:"108 years old",
        price:190,
        country:"India",
        category:"copper",
        description:"this is indian old currency belong old people trade style this is now something new antiquecoin",
        discount:0,
        quantity:10,
        delivery:6,
        is_availabe:1,
        filename:"copper29",
    },
    {
        year:"700 years old",
        price:900,
        country:"american",
        category:"copper",
        description:"this is ship antique coin using this is by pirate of sea",
        discount:0,
        quantity:0,
        delivery:6,
        is_availabe:0,
        filename:"copper30",
    },
]

const Coins_card = () => {
    return (
            <FlatList
                data={copper_array}
                // ref={ref}
                // onViewableItemsChanged={onViewableItemsChanged}
                // ListHeaderComponent={() => <View><Text>loading no data available</Text></View>}
                // ListEmptyComponent={() => <View><Text>loading no data available</Text></View>}
                // ItemSeparatorComponent={() => <View style={{ backgroundColor: "orange", height: 2 }}></View>}
                // ListFooterComponent={() => <View style={{ height: 40, width: "100%" }}><Text>"this is the fotter of list"</Text></View>}
                // getItemCount={() => Silver_array.length}
                // getItem={(data, index) => Silver_array[index]}
                renderItem={({ item }) => <MyCustomCard item={item} />
                }
                // initialNumToRender={5}
                // initialScrollIndex={8}
                keyExtractor={(item, index) => item.filename+ index}
                numColumns={2}
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
