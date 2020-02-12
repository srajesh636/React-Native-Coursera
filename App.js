import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import Main from "./src/components/Main";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          
        </ScrollView>
        <View>
          <Main />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
