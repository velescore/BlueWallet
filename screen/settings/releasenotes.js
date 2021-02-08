import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import navigationStyle from '../../components/navigationStyle';
import { SafeBlueArea, BlueCard, BlueText } from '../../BlueComponents';
import loc from '../../loc';

const ReleaseNotes = () => {
  const notes = require('../../release-notes');
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  });

  return (
    <LinearGradient colors={['rgba(95, 88, 84, .18)', '#ffffff']} style={{flex:1}}>
      <SafeBlueArea forceInset={{ horizontal: 'always' }} style={styles.root}>
        <ScrollView>
          <BlueCard>
            <BlueText>{notes}</BlueText>
          </BlueCard>
        </ScrollView>
      </SafeBlueArea>
    </LinearGradient>
  );
};

ReleaseNotes.navigationOptions = navigationStyle({
  title: loc.settings.about_release_notes,
});

export default ReleaseNotes;
