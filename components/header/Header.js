import * as React from 'react';
import {
  Appbar,
  Searchbar,
  Menu,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import baseUrl from '../../serveces/baseUrl';
import { logout } from '../../redux/action/auth';
import ProfileImageUpload from '../upload images/profileImageUpload';
import UpdatePersonal from '../upload images/UpdatePersonal';
import { searchAction } from '../../redux/action/search';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showUpload, setShowUpload] = React.useState(false);
  const [showPersonalData, setShowPersonalData] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const logoutOutNow = async () => {
    await AsyncStorage.multiRemove(['user', 'token']);
    dispatch(logout());
    setMenuVisible(false);
  };

  const onChange = (e) => {
    setSearchQuery(e);
    dispatch(searchAction(e));
  };

  return (
    <Appbar.Header style={styles.header}>
      {/* LEFT — LOGO */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          Antique
          <Text style={styles.logoHighlight}> Coin</Text>
        </Text>
      </View>

      {/* CENTER — SEARCH */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search coins, users, orders..."
          value={searchQuery}
          onChangeText={onChange}
          style={styles.searchbar}
          contentStyle={styles.searchContent}
          inputStyle={styles.searchInput}
        />
      </View>

      {/* RIGHT — PROFILE MENU */}
      <View style={styles.profileContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)} activeOpacity={0.8}>
              <View style={styles.avatarContainer}>
                <Image
                  source={
                    user?.profile_image
                      ? { uri: `${baseUrl.api}/${user.profile_image}` }
                      : require("../../assets/user.png")
                  }
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              setShowUpload(true);
            }}
            title="Upload Picture"
          />
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              setShowPersonalData(true);
            }}
            title="Personal Info"
          />
          <Menu.Item onPress={logoutOutNow} title="Logout" />
        </Menu>
      </View>

      {/* Modals */}
      <ProfileImageUpload showModal={showUpload} setShowModal={setShowUpload} />
      <UpdatePersonal showModal={showPersonalData} setShowModal={setShowPersonalData} />
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 72,
    backgroundColor: '#1e293b',
    paddingHorizontal: 18,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: 1,
  },
  logoHighlight: {
    color: '#f59e0b',
    fontWeight: '800',
  },
  searchContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  searchbar: {
    height: 44,
    borderRadius: 12,
  },
  searchContent: {
    height: 44,
    alignItems: 'center',
  },
  searchInput: {
    fontSize: 14,
    paddingVertical: 0,
  },
  profileContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});
