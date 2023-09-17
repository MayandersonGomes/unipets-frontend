import {useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {defaultTextApp, defaultInputApp} from './Global';

const StyledTextInput = (props: any): JSX.Element => {
  const inputRef = useRef<TextInput | null>(null);

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View style={styles.inputContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.label}>{props.label}</Text>
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            ref={inputRef}
            secureTextEntry={props.secure}
          />
        </View>

        <Image source={props.image} style={props.secure ? styles.imagePassword : styles.imageCheck} resizeMode="contain" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: defaultInputApp,
    height: 65,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 20,
    borderRadius: 7,
    gap: 20,
  },
  label: {
    ...defaultTextApp,
    color: '#797979',
    fontSize: 13,
  },
  input: {
    color: '#ffffff',
  },
  imageCheck: {
    width: 20,
    height: 20,
  },
  imagePassword: {
    width: 22,
    height: 22,
  },
});

export default StyledTextInput;
