import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import {secondaryColor, defaultTextApp} from '@global';

interface StyledButtonProps {
  title: string;
  handle: any;
  submit: any;
  isLoading: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  isLoading,
  handle,
  submit,
}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.button} onPress={handle(submit)}>
      {isLoading ? (
        <ActivityIndicator color={'#ffffff'} />
      ) : (
        <Text style={styles.textButton}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondaryColor,
    borderRadius: 7,
  },
  textButton: {
    ...defaultTextApp,
    fontSize: 18,
  },
});

export default StyledButton;
