import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRoutes from '@routes/routes';
import FlashMessage from 'react-native-flash-message';

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <MainRoutes />
      <FlashMessage position={'top'} />
    </NavigationContainer>
  );
};

export default App;
