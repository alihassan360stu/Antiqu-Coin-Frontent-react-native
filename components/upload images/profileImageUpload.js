import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import { Center, Modal, Button, Stack } from 'native-base';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import apiPaths from '../../serveces/apiPaths';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { sign_in } from '../../redux/action/auth';

const Profile = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch()
    const user = useSelector(({ auth }) => auth.user)
    const apiCalled = (path, data) => {
        return Axios.post(path, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((result) => {
            return result.data;
        })
    }

    const upload = async (image) => {
        try {

            const timestamp = Date.now(); // Get current timestamp in milliseconds
            const uniqueId = `${timestamp}_${Math.random().toString(36).substr(2, 9)}`; // Combining timestamp with a random string
            const data = new FormData();
            let name = `ali_${uniqueId}.png`;
            data.append('profile', {
                uri: image.path,
                type: image.mime,
                name: name,
                filename: "images"//
            });
            data.append("email", user?.email)
            data.append("picture", name)
            let response = await apiCalled(apiPaths.profilePic(), data).catch((e) => {
            })
            let updated = { ...user, "picture": name }
            dispatch(sign_in({user:updated}))
        } catch (e) {
            console.log(e)
        }
    }
    const pick = async () => {
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(async image => {
                upload(image)


            }).catch((e) => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const openCamera = async () => {
        try {
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(async image => {
                // console.log(image);

            }).catch((e) => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    return <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton fill="white" />
                {/* <Modal.Header color="white" style={{ backgroundColor: "#ed9121" }}>Upload Profile</Modal.Header> */}
                <Modal.Body>
                    <Stack direction={{
                        base: "column",
                        md: "row"
                    }} space={4}>
                        <Button onPress={() => { pick(); setShowModal(false) }} size={"sm"} variant="primary" leftIcon={<Icon3 name="upload" size={30} />}>
                            Upload
                        </Button>
                        <Button onPress={() => { openCamera(); setShowModal(false) }} size={"sm"} variant="Outline" leftIcon={<Icon4 name="camera" size={30} />}>
                            Take Photo
                        </Button>
                    </Stack>;
                </Modal.Body>
            </Modal.Content>
        </Modal>
    </Center>
}
export default Profile