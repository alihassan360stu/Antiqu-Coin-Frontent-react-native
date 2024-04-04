import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import { Center, Modal, Button, Stack, View } from 'native-base';
import React from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { InputField, SubmitButton } from '../../Common/Common_ui';
import { KeyboardAvoidingView, ScrollView } from 'react-native';


const initialState = {
    name: "",
    contact: "",
    address: "",
    cnic: ""
}

const Profile = ({ showModal, setShowModal }) => {
    const [state, setState] = React.useState(initialState)

    const onChange = (name, value) => {
        setState({ ...state, [name]: value })
    }

    return  <Modal  style={{width:"100%"}} isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="100%">
            <Modal.Header color="white" style={{ backgroundColor: "inherit" }}>Personal Setting</Modal.Header>
            <Modal.CloseButton fill="white" />
                <Modal.Body style={{ minHeight: "100%" }}>
                    <ScrollView style={{ minHeight: "50%", height: 300 }}>
                        <KeyboardAvoidingView>
                            <View style={{ marginBottom: 15 }}>
                                <InputField
                                    backgroundColor="white"
                                    label="Name"
                                    onChangeText={(e) => { onChange("name", e) }}
                                    placeholder="100"
                                    // leftIcon={<Icon6 name="warning-sharp" size={20} />}
                                    value={state.name}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <InputField
                                    backgroundColor="white"
                                    label="Contact"
                                    onChangeText={(e) => { onChange("contact", e) }}
                                    placeholder="0331-x-x-x"
                                    // leftIcon={<Icon6 name="warning-sharp" size={20} />}
                                    value={state.contact}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <InputField
                                    backgroundColor="white"
                                    label="CNIC"
                                    onChangeText={(e) => { onChange("cnic", e) }}
                                    placeholder="14101-x-x-x"
                                    // leftIcon={<Icon6 name="warning-sharp" size={20} />}
                                    value={state.cnic}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <InputField
                                    backgroundColor="white"
                                    label="Address"
                                    onChangeText={(e) => { onChange("address", e) }}
                                    placeholder="Enter Your Current Address"
                                    // leftIcon={<Icon6 name="warning-sharp" size={20} />}
                                    value={state.address}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </Modal.Body>
                <Modal.Footer>
                    <SubmitButton width='30%' label='Update' />
                    <View style={{ width: "5%" }}>
                    </View>
                    <SubmitButton width='30' label='Cancel;' />
                </Modal.Footer>
            </Modal.Content>
        </Modal>
}
export default Profile