import { Text, View, SafeAreaView } from "react-native";
import Home from "./screens/home";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red',
        width: '100%',
      }}
    >
      <Home />
    </SafeAreaView>
  );
}
