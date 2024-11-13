import { PaperProvider } from "react-native-paper";
import AppRoutes from "./src/pages/routes";

export default function App() {
  return (
    <PaperProvider>
      <AppRoutes />
    </PaperProvider>
  );
}
