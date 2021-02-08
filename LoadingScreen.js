import React, { useEffect, useState, useRef } from 'react';
import LottieView from 'lottie-react-native';;;;;;;;;;
import WalletMigrate from './screen/wallets/walletMigrate';
import * as NavigationService from './NavigationService';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 120,
    height: 120,
  },
});

const LoadingScreen = () => {
  const [isMigratingData, setIsMigratinData] = useState(true);
  const loadingAnimation = useRef();

  const handleMigrationComplete = async () => {
    setIsMigratinData(false);
  };
  const walletMigrate = useRef(new WalletMigrate(handleMigrationComplete));

  const replaceStackNavigation = () => {
    NavigationService.dispatch(StackActions.replace('UnlockWithScreenRoot'));
  };

  const onAnimationFinish = () => {
    if (isMigratingData) {
      loadingAnimation.current.play(0);
    } else {
      replaceStackNavigation();
    }
  };

  useEffect(() => {
    walletMigrate.current.start();
  }, [walletMigrate]);

  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground
        style={{flex: 1, marginTop: 20}}
        source={require('./img/splash/splash.png')}
      >
        <LottieView
          ref={loadingAnimation}
          source={require('./img/bluewalletsplash.json')}
          autoPlay
          loop={false}
          onAnimationFinish={onAnimationFinish}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};
export default LoadingScreen;
