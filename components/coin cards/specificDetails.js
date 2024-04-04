import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import { Center, Modal, Button, Stack } from 'native-base';
import { Image, View, Text } from 'react-native';
import React from 'react';
import baseUrl from '../../serveces/baseUrl';
import { TouchableWrapper } from "../../Common/Common_ui"

const CardDetails = ({ showModal, setShowModal, item }) => {
    return <Center style={{ backgroundColor: "inherit" }}>
        <Modal style={{ backgroundColor: "inherit" }} isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content style={{ backgroundColor: "inherit" }} width="100%" maxWidth="100%">
                <Modal.CloseButton fill="white" />
                <Modal.Header style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <Text style={{ fontSize: 13, fontWeight: 700, color: "black" }}>
                        {item.year} of {item.country}
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: 700, color: "green" , marginRight:35 }}>
                        {item.price}$
                    </Text>
                </Modal.Header>
                <Modal.Body style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ height: 300, width: 300 }}>
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${baseUrl.api}/static/coins/${item.filename}.png` }} />
                    </View>
                </Modal.Body>
            </Modal.Content>
            <Modal.Footer style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <TouchableWrapper fontSize={16} fontWeight={700} label="Buy" color="orange" />
                <TouchableWrapper width="40%" fontSize={16} fontWeight={700} label="Add Card" color="orange" />
                <View style={{ width: "10%" }}>
                </View>
            </Modal.Footer>
        </Modal>
    </Center>
}

export default CardDetails;