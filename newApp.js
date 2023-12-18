import React from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

const FormWithKeyboardAvoiding = () => {
    const array = [1,2,3,4,5,6,7,8]
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
     {
        array.map((data,index)=>{
            return  <View key={index} style={styles.inner}>
            <TextInput
              placeholder="Enter your text here"
              style={styles.input}
              value={"ali"+index}
            />
            {/* Other components or inputs */}
          </View>
        })
     }
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: '80%',
    // Other styles for inner content
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    // Other styles for input
  },
});

export default FormWithKeyboardAvoiding;
