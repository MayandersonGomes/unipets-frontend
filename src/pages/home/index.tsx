import React from 'react';
import {View, Text, Button} from 'react-native';

const Home: React.FC<any> = ({navigation}): JSX.Element => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Tela home</Text>
      <Button
        title="Voltar pra tela inicial"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Home;
