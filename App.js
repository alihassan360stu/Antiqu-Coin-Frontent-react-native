import React from "react";
import { UserContext } from "./UserContext";
import { ModalPortal } from "react-native-modals";
import { PaperProvider } from "react-native-paper";
import { Provider } from 'react-redux';
import Routes from "./routers/index.js";
import storeReducer from "./redux/store/index.js"
import AxiosInterceptor from "./serveces/axiosInterceptor"
 import {NativeBaseProvider} from "native-base";


export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={storeReducer}>
        <PaperProvider>
          <Routes />
          <ModalPortal />
          <AxiosInterceptor/>
        </PaperProvider>
      </Provider>
    </NativeBaseProvider>
  );
}

// from here the user will be redirect either home screen or auth screen
