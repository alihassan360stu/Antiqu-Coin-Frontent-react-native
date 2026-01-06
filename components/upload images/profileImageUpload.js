import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Dialog, Portal, Button, Text, IconButton } from 'react-native-paper';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { requestCameraPermission, requestGalleryPermission } from "../../utiles/permission";
import apiPaths from '../../serveces/apiPaths';
import { sign_in } from '../../redux/action/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const apiCalled = (path, data) => {
    return Axios.post(path, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res.data);
  };

  const uploadImage = async (img) => {
    try {
      setUploading(true);

      const data = new FormData();
      const name = `profile_${Date.now()}.jpg`;

      data.append('file', {
        uri: img.path,
        type: img.mime,
        name,
      });
      data.append('user_id', user.id);

      let response = await apiCalled(apiPaths.profilePic(), data);
      dispatch(sign_in({ user: { ...user, profile_image: response.user?.file_path } }));
      await AsyncStorage.setItem('user', JSON.stringify({...user, profile_image: response.user?.file_path}));
    } catch (e) {
      console.log("Upload error:", e);
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    try {
      const img = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      });

      setImage(img);
      await uploadImage(img);
    } catch (e) {
      if (e.code !== "E_PICKER_CANCELLED") console.log(e);
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const img = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      });

      setImage(img);
      await uploadImage(img);
    } catch (e) {
      if (e.code !== "E_PICKER_CANCELLED") console.log(e);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <Portal>
      <Dialog visible={showModal} onDismiss={() => setShowModal(false)} style={styles.dialog}>
        <Dialog.Title>Profile Picture</Dialog.Title>

        <Dialog.Content>
          {image ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: image.path }} style={styles.image} />
              <IconButton
                icon="close"
                size={20}
                style={styles.removeBtn}
                onPress={removeImage}
              />
            </View>
          ) : (
            <Text style={styles.text}>Choose image source</Text>
          )}
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            icon={() => <Icon3 name="upload" size={18} />}
            onPress={pickImage}
            disabled={!!image || uploading}
          >
            Upload
          </Button>

          <Button
            icon={() => <Icon4 name="camera" size={18} />}
            onPress={openCamera}
            disabled={!!image || uploading}
          >
            Camera
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 14,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  previewContainer: {
    alignSelf: 'center',
    position: 'relative',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  removeBtn: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
  },
});


export default Profile;
