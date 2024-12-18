import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import Formulario from './Formulario';
import Detalhes from './Detalhes';
import FormularioEditar from './FormularioEditar';

export type RootStackParamList = {
  HomePage: undefined;
  Formulario: undefined;
  FormularioEditar: { id: number };
  Detalhes: { id: number };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="FormularioEditar" component={FormularioEditar} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}