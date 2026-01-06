import { ModalPortal } from "react-native-modals";
import { PaperProvider } from "react-native-paper";
import { Provider } from 'react-redux';
import Routes from "./routers/index.js";
import storeReducer from "./redux/store/index.js"
import AxiosInterceptor from "./serveces/axiosInterceptor"
import { NativeBaseProvider, extendTheme} from 'native-base';

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        color: 'rgba(8, 8, 8, 1)', 
      },
    },
    Heading: {
      baseStyle: {
        color: 'rgba(8, 8, 8, 1)', 
      },
    },
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={storeReducer}>
        <PaperProvider>
          <Routes />
          <ModalPortal />
          <AxiosInterceptor />
        </PaperProvider>
      </Provider>
    </NativeBaseProvider>
  );
}

// from here the user will be redirect either home screen or auth screen
