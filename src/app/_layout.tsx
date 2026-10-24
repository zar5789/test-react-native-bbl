import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';
import TabsLayout from './(tabs)/_layout';
import ProductDetailScreen from './product/[id]';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Root layout: safe area for the whole app, then a stack of Tabs → Product Detail
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={TabsLayout} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.card,
  },
});
