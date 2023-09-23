import {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageSourcePropType,
} from 'react-native';
import {defaultTextApp, defaultInputApp} from './Global';

interface IStyledTextInput {
  label: string;
  image: {
    firstImage: ImageSourcePropType;
    lastImage: ImageSourcePropType;
  };
  secure?: boolean;
  email?: boolean;
}

const StyledTextInput = (props: IStyledTextInput): JSX.Element => {
  const [isSecure, setIsSecure] = useState<boolean | undefined>(props.secure);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);

  const valid = (text: string) => {
    if (text) {
      setValidEmail(true);
      return
    }
    setValidEmail(false);
  }

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View style={styles.inputContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.label}>{props.label}</Text>
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            ref={inputRef}
            secureTextEntry={isSecure}
            autoComplete={props.email ? 'email' : 'off'}
            keyboardType={props.email ? 'email-address' : 'default'}
            autoCorrect={false}
            onChangeText={text => valid(text)}
          />
        </View>

        <TouchableWithoutFeedback
          onPress={() => props.secure && setIsSecure(!isSecure)}>
          <View>
            {(validEmail || props.secure) && (
              <Image
                source={
                  isSecure ? props.image.firstImage : props.image.lastImage
                }
                style={props.secure ? styles.imagePassword : styles.imageCheck}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableWithoutFeedback>
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
    ...defaultTextApp,
    fontSize: 16,
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
