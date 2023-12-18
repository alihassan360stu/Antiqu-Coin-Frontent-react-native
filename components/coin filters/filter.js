import { IconButton } from 'react-native-paper';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, TouchableOpacity } from "react-native"

let icons = [
    { title: "Gold", id: 1, src: require('../../assets/filters/gold.png') },
    { title: "Silver", id: 2, src: require('../../assets/filters/silver.png') },
    { title: "Latest", id: 3, src: require('../../assets/filters/new.png') },
    { title: "Styled", id: 4, src: require('../../assets/filters/styled.png') },
]

const Filters = () => (
    <View style={{ display: "flex", width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
        <View style={{ display: "flex", width: "60%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
            {
                icons.map(({ id, title, src }) => <View key={id} display="flex" justifyContent="center" alignItems="center">
                    <TouchableOpacity>
                        <IconButton
                            key={id}
                            style={{ width: 40, height: 40 }}
                            icon={() => <Image
                                alt="Alternate Text"
                                style={{ width: "100%", height: "100%" }}
                                source={src}
                            />}
                            iconColor={"red"}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: "black", fontSize: 11, fontWeight: 400 }} >{title}</Text>
                </View>)
            }
        </View>
    </View>
);

export default Filters;