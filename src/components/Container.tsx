import { StatusBar } from 'expo-status-bar';
import { ReactNode, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

interface ContainerProps {
  children: ReactNode;
}

export function Container(props: ContainerProps) {
  const { children } = props;

  useEffect(() => {
    const changeScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    };
    changeScreenOrientation();
  }, []);

  return (
    <View style={styles.container}>
      {children}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
