import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainRoutes from '@routes/routes'

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
        <MainRoutes />
    </NavigationContainer>
  );
};

export default App;
