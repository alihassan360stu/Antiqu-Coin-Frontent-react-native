import * as React from "react";
import {
  IconButton,
  VStack,
  FormControl,
  Input,
  HStack,
  CloseIcon,
  Image,
  Alert,
  AlertDialog,
  Center,
  Heading,
  TextArea
} from "native-base";
import { TouchableHighlight, Button, ActivityIndicator, Text, View } from 'react-native';


const InputField = ({
  label = "input",
  isDisabled = false,
  isRequired = true,
  inValid = false,
  leftIcon = false,
  rightIcon = false,
  errorMessage = "error founs",
  type = "text",
  value = "",
  backgroundColor = "default",
  color = null,
  onChangeText = () => { },
  placeholder = "Enter name",
  fontSize = 12,
  fontWeight = 400,
  width ="100%"
}) => {
  return <FormControl width={width} isDisabled={isDisabled} isRequired={isRequired} isInvalid={inValid}>
    <Text style={{ color: color, fontSize: fontSize, fontWeight: fontWeight, marginBottom: 2 }}>
      {label}
      {isRequired && <Text style={{ color: "red", fontSize: fontSize, fontWeight: fontWeight }}>
        *
      </Text>}
    </Text>
    <Input
      disabled={isDisabled}
      _disabled={isDisabled}
      placeholder={placeholder}
      backgroundColor={backgroundColor}
      type={type}
      InputLeftElement={leftIcon}
      InputRightElement={rightIcon}
      placeholderTextColor="red"
      onChangeText={onChangeText}
      value={value}
    />
    <FormControl.ErrorMessage >
      {errorMessage}
    </FormControl.ErrorMessage>
  </FormControl>
}

const TextAreaCustom = ({
  label = "input",
  isDisabled = false,
  isRequired = true,
  inValid = false,
  errorMessage = "error founs",
  value = "",
  backgroundColor = "default",
  color = null,
  onChangeText = () => { },
  placeholder = "Enter name",
  fontSize = 12,
  fontWeight = 400,
  numberOfLines = 4
}) => {
  return <View>
    <Text style={{ color: color, fontSize: fontSize, fontWeight: fontWeight, marginBottom: 2 }}>
      {label}
      {isRequired && <Text style={{ color: "red", fontSize: fontSize, fontWeight: fontWeight }}>
        *
      </Text>}
    </Text>
    <TextArea
      value={value}
      style={{ backgroundColor: backgroundColor }}
      aria-label="t1"
      numberOfLines={numberOfLines}
      placeholder={placeholder}
      onChangeText={onChangeText}
      isInvalid={inValid}
      isDisabled={isDisabled}
      _dark={{
        placeholderTextColor: "gray.300"
      }}
    />
    {inValid && <Text style={{ color: "red" }} >
      {errorMessage}
    </Text>}
  </View>
}


const SubmitButton = ({
  loading = false,
  onChange = () => { },
  label = "Register",
  loadingMessage = "Loading",
  disabled = false,
  width = "60%",
  backgroundColor = "#ed9121",
}) => {

  return (
    <TouchableHighlight
      style={{ width: width, backgroundColor: backgroundColor, padding: "3", borderRadius: 60 }}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
    >
      {
        loading ? <View style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "white", marginRight: 5 }} >{loadingMessage}</Text>
          <ActivityIndicator size="large" color="white" />
        </View> : <Button
          title={label}
          onPress={onChange}
          disabled={disabled}
          touchSoundDisabled={false}
          color={backgroundColor}
        />
      }
    </TouchableHighlight>
  );
};

const BackButton = (props) => {
  const { value, onChange, disabled } = props;
  return (
    <Button
      textColor="black"
      mode="outlined"
      disabled={disabled}
      style={{
        padding: 5,
        borderRadius: 6,
        width: "100%",
        borderColor: "#ed9121",
      }}
      onPress={onChange}
    >
      <Text style={{ fontSize: 17 }}>{value ? value : "Back"}</Text>
    </Button>
  );
};

const toastMessage = (
  { toast,
    title = "Error!",
    message = "error found",
    type = "error",
    variant = "left-accent",
    isClosable = true,
    placement = "top"

  }) => {
  toast.show({
    placement: placement,
    render: ({
      id
    }) => {
      return <Alert maxWidth="90%" alignSelf="center" flexDirection="row" status={type} variant={variant}>
        <VStack space={1} flexShrink={1} w="100%">
          <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
            <Alert.Icon />
            <Text fontWeight="medium" flexShrink={1} color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
              {title}
            </Text>

            {isClosable ? <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{
              color: variant === "solid" ? "lightText" : "darkText"
            }} onPress={() => toast.close(id)} /> : null}
          </HStack>
          <Text px="6" color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
            {message}
          </Text>

        </VStack>
      </Alert>
    }
  })
}

const Logo = () => {
  return (
    <Image
      // width={100}
      size="2xl"
      alt="Alternate Text"
      source={require('../assets/logo_main.png')}
    />
  );
};

const Popup = ({
  useRef,
  title = "",
  description = " ",
  setIsOpen,
  isOpen,
  onAfterSubmit = () => { }
}) => {
  const onClose = () => {
    onAfterSubmit()
    setIsOpen(false);
  }
  const cancelRef = useRef(null);
  return <Center>
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton color="red.600" />
        <AlertDialog.Header style={{ backgroundColor: "#ed9121" }}>{title}</AlertDialog.Header>
        <AlertDialog.Body fontWeight="extrabold" padding={5} >
          <Heading size="md" fontWeight="400" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }}>
            {
              description
            }
          </Heading>
        </AlertDialog.Body>
        {/* <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={onClose}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer> */}
      </AlertDialog.Content>
    </AlertDialog>
  </Center>;
}

const TouchableWrapper = ({ label, onChange, color = "black", fontSize = 15, fontWeight = 100, width = "20%" }) => {
  return <TouchableHighlight
    style={{ width: width, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={onChange}
  >
    <Text style={{ color: color, fontSize: fontSize, fontWeight: fontWeight }}>
      {label}

    </Text>
  </TouchableHighlight>
}

export { Logo, SubmitButton, BackButton, toastMessage, InputField, Popup, TouchableWrapper, TextAreaCustom };
