import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Back from '@images/back/back.png';

const BackButton = (): JSX.Element => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleGoBack}>
      <Image
        style={{width: 24, height: 24}}
        source={Back}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
