import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import navigationStyle from '../../components/navigationStyle';
import { SafeBlueArea, BlueListItem } from '../../BlueComponents';
import loc from '../../loc';

const NetworkSettings = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  });

  const navigateToElectrumSettings = () => {
    navigate('ElectrumSettings');
  };

  const navigateToLightningSettings = () => {
    navigate('LightningSettings');
  };

  const navigateToBroadcast = () => {
    navigate('Broadcast');
  };

  return (
    <LinearGradient colors={['rgba(95, 88, 84, .18)', '#ffffff']} style={{flex:1}}>
      <SafeBlueArea forceInset={{ horizontal: 'always' }} style={styles.root}>
        <ScrollView>
          <BlueListItem title={loc.settings.network_electrum} onPress={navigateToElectrumSettings} chevron />
          <BlueListItem title={loc.settings.network_broadcast} onPress={navigateToBroadcast} chevron />
        </ScrollView>
      </SafeBlueArea>
    </LinearGradient>
  );
};

NetworkSettings.navigationOptions = navigationStyle({
  title: loc.settings.network,
});

export default NetworkSettings;
