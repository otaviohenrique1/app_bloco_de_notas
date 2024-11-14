import { PaperProvider } from "react-native-paper";
import AppRoutes from "./src/pages/routes";
import * as ScreenOrientation from 'expo-screen-orientation';
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./src/database/initializeDatabase";

export default function App() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={initializeDatabase} options={{useNewConnection: true}} >
      <PaperProvider>
        <AppRoutes />
      </PaperProvider>
    </SQLiteProvider>
  );
}
