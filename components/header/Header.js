import * as React from 'react';
import { Appbar, Searchbar, IconButton } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { Pressable, Menu } from 'native-base';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from '../../serveces/baseUrl';
import { logout } from '../../redux/action/auth';
import { Image, View, TouchableOpacity } from "react-native"
import ProfileImageUpload from '../upload images/profileImageUpload';
import UpdatePersonal from "../upload images/UpdatePersonal"


const Header = () => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showUpload, setShowUpload] = React.useState(false);
  const [showPersonalData, setShowPersonalData] = React.useState(false);
  const onChangeSearch = (query) => setSearchQuery(query);
  const user = useSelector(({ auth }) => auth.user)

  const logoutOutNow = async () => {
    try {
      await AsyncStorage.removeItem("user")
      await AsyncStorage.removeItem("token")
      dispatch(logout())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Appbar.Header style={{ backgroundColor: "inherit", position: "relative", width: "100%" }}>
      <ProfileImageUpload setShowModal={setShowUpload} showModal={showUpload} />
      <UpdatePersonal setShowModal={setShowPersonalData} showModal={showPersonalData} />
      <Pressable style={{ position: "absolute", left: -135, top: -16, width: "100%" }}>
        <Image style={{ width: "100%", height: 120 }} resizeMode="contain" source={require('../../assets/logo_main.png')} alt="Home Logo" />
      </Pressable>
      <View style={{ width: "80%", marginLeft: "24%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Searchbar
          placeholder="Search"
          iconSize={7}
          onChangeText={onChangeSearch}
          value={searchQuery}
          type="view"
          style={{ width: "50%", height: 30, borderRadius: 9 }}
          inputStyle={{ fontSize: 12, marginTop: -12 }}
        />
        <TouchableOpacity style={{ width: "12%", display: "flex", justifyContent: "flex-start", flexDirection: "row", alignItems: "flex-end" }} onPress={() => { }}>
          <IconButton
            icon={() => <Icon3 name="notifications-none" color="white" size={30} />}
          />
          <Avatar.Text color='white' size={15} style={{ backgroundColor: "#e53935", marginLeft: -19 }} label="10" />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={()=>{}} style={{marginRight:10}}>  */}
        <Menu trigger={triggerProps => {
          return <TouchableOpacity style={{ marginRight: 10 }} accessibilityLabel="More options menu" {...triggerProps}>
            <IconButton
              size={30}
              style={{ borderColor: "white", borderWidth: 1, }}
              icon={() => (
                (user.picture === "0" || user.picture === null) ?
                  <Avatar.Image size={30} source={require('../../assets/user.png')} /> :
                  <Avatar.Image size={45} source={{ uri: `${baseUrl.api}/static/${user.picture}` }} />
              )}
            />
          </TouchableOpacity>;
        }}>
          <Menu.Item onPress={() => { setShowUpload(true) }}>Upload Picture</Menu.Item>
          <Menu.Item onPress={() => { setShowPersonalData(true) }}>Personal</Menu.Item>
          <Menu.Item onPress={() => { logoutOutNow(); setShowUpload(false); setShowPersonalData(false) }}>Logout</Menu.Item>
        </Menu>
      </View>
    </Appbar.Header>

  )
}

export default Header;