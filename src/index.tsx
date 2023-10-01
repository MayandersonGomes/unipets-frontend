import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from '@routes/routes'

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );
};

export default App;
