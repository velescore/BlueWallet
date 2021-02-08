import React, { useContext } from 'react';
import { ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import navigationStyle from '../../components/navigationStyle';
import { BlueListItem, BlueHeaderDefaultSub, SafeBlueArea } from '../../BlueComponents';
import LinearGradient from 'react-native-linear-gradient';
import loc from '../../loc';
import { BlueStorageContext } from '../../blue_modules/storage-context';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
 
const Settings = () => {
  const { navigate } = useNavigation();
  // By simply having it here, it'll re-render the UI if language is changed
  // eslint-disable-next-line no-unused-vars
  const { language } = useContext(BlueStorageContext);

  return (
    <LinearGradient colors={['rgba(95, 88, 84, .18)', '#ffffff']} style={{flex:1}}>
      <SafeBlueArea style={[styles.root]}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="#5F585400"
        />
        <ScrollView style={styles.root}>
          <BlueHeaderDefaultSub leftText={loc.settings.header} />
          <BlueListItem title={loc.settings.general} onPress={() => navigate('GeneralSettings')} chevron />
          <BlueListItem title={loc.settings.currency} onPress={() => navigate('Currency')} chevron />
          <BlueListItem title={loc.settings.language} onPress={() => navigate('Language')} chevron />
          <BlueListItem title={loc.settings.encrypt_title} onPress={() => navigate('EncryptStorage')} testID="SecurityButton" chevron />
          <BlueListItem title={loc.settings.network} onPress={() => navigate('NetworkSettings')} chevron />
          <BlueListItem title={loc.settings.notifications} onPress={() => navigate('NotificationSettings')} chevron />
          <BlueListItem title={loc.settings.privacy} onPress={() => navigate('SettingsPrivacy')} chevron />
          <BlueListItem title={loc.settings.about} onPress={() => navigate('About')} testID="AboutButton" chevron />
        </ScrollView>
      </SafeBlueArea>
    </LinearGradient>
  );
};

export default Settings;
Settings.navigationOptions = navigationStyle({
  headerTitle: '',
});
