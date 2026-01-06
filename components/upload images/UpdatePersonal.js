import React from 'react';
import { ScrollView, KeyboardAvoidingView, View } from 'react-native';
import { Dialog, Portal, Button, Text, TextInput } from 'react-native-paper';

const initialState = {
  name: "",
  contact: "",
  address: "",
  cnic: ""
};

const Profile = ({ showModal, setShowModal }) => {
  const [state, setState] = React.useState(initialState);

  const onChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  return (
    <Portal>
      <Dialog
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        style={{ borderRadius: 12 }}
      >
        <Dialog.Title>Personal Settings</Dialog.Title>

        <Dialog.Content>
          <ScrollView style={{ maxHeight: 300 }}>
            <KeyboardAvoidingView>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  label="Name"
                  value={state.name}
                  mode="outlined"
                  onChangeText={(text) => onChange("name", text)}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  label="Contact"
                  value={state.contact}
                  mode="outlined"
                  onChangeText={(text) => onChange("contact", text)}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  label="CNIC"
                  value={state.cnic}
                  mode="outlined"
                  onChangeText={(text) => onChange("cnic", text)}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  label="Address"
                  value={state.address}
                  mode="outlined"
                  multiline
                  onChangeText={(text) => onChange("address", text)}
                />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </Dialog.Content>

        <Dialog.Actions style={{ justifyContent: 'space-between' }}>
          <Button mode="contained" onPress={() => console.log(state)}>
            Update
          </Button>
          <Button onPress={() => setShowModal(false)}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Profile;
