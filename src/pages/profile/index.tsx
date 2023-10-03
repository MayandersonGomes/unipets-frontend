import React from 'react';
import {View, Text, Button} from 'react-native';

const Profile = ({ navigation }: any): JSX.Element => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Tela de perfil</Text>
      <Button title='Voltar pra tela inicial' onPress={() => navigation.navigate('Login') }/>
    </View>
  );
};

export default Profile;
