import { Alert, Linking, Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export const requestCameraPermission = async () => {
  if (Platform.OS === "ios") {
    const result = await request(PERMISSIONS.IOS.CAMERA);
    return handleResult(result, "Camera");
  }

  const permission =
    Platform.Version >= 33
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.ANDROID.CAMERA;

  const result = await request(permission);
  return handleResult(result, "Camera");
};

export const requestGalleryPermission = async () => {
  if (Platform.OS === "ios") {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return handleResult(result, "Gallery");
  }

  const permission =
    Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  const result = await request(permission);
  return handleResult(result, "Gallery");
};

const handleResult = (result, type) => {
  switch (result) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.DENIED:
      Alert.alert("Permission Denied", `${type} permission is required.`);
      return false;
    case RESULTS.BLOCKED:
      Alert.alert(
        "Permission Blocked",
        `${type} permission is permanently denied. Open settings to allow.`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    default:
      return false;
  }
};
