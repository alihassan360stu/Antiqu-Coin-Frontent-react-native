import React, { useEffect, useState } from "react";
import { Box, AspectRatio, Text } from "native-base";
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { IconButton } from "react-native-paper"
import { ScrollView, Image } from 'react-native';
import Axios from "axios";
import apiPaths from "../serveces/apiPaths";
import baseUrl from "../serveces/baseUrl";
import { useSelector } from 'react-redux'
import moment from 'moment';


const Users = () => {
    const user = useSelector(({ auth }) => auth.user)
    const [images, setImages] = useState([])
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
                let makesUser = data.data;
                setImages(makesUser)
            } catch (e) {
                console.log(e)
            }
        }
        load()
    }, [])
    return (
        <Box width="100%" height={160} backgroundColor="#ed9121">
            <Box width="100%" height={160} position="relative " mt="5" ml="2">
                <ScrollView
                    horizontal
                    style={{ marginBottom: 23 }}
                    showsHorizontalScrollIndicator={true}
                >
                    {
                        images?.map(({ id, name, picture, createdAt }) => {
                            const currentDate = new Date(createdAt);
                            const formattedDate = moment(currentDate).format('MMMM Do YYYY');
                            return picture !== "0" && picture && id !== user.id && (
                                <Box overflow="hidden" ml="2" key={id}
                                    position="relative" maxW="40" maxH={"40"} borderRadius={8} borderWidth="1" borderColor="white" _light={{
                                        backgroundColor: "gray.50"
                                    }}>
                                    <Box width={200} flex={1} >
                                        <Image source={{ uri: `${baseUrl.api}/static/${picture}` }} style={{ width: "100%", height: "100%" }} alt="image" />
                                    </Box>
                                    <Box paddingLeft="2" mb="7" mt="2">
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }} fontWeight="400">
                                            {name}
                                        </Text>
                                    </Box>
                                    <Box paddingLeft="2" width="100%" position="absolute" bottom={-10} display={"flex"} justifyContent="space-between" alignItems="center" flexDirection="row">
                                        <Text fontSize="xs" fontWeight="500" >
                                            {formattedDate}
                                        </Text>
                                        <IconButton
                                            icon={() => <Icon3 size={20} name="commenting-o" />}
                                            size={20}
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </ScrollView>
                <Box position="absolute" bottom="0" left="3">
                    <Text color="white" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="600">
                        You can see the user review and you also can review
                    </Text>
                </Box>
            </Box>
        </Box>
    )
};

export default Users;
