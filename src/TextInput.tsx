import {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {defaultTextApp, defaultInputApp} from './Global';
import {ITextInput} from './types/interfaces/Input.Interface';

const StyledTextInput = (props: ITextInput): JSX.Element => {
  const [isSecure, setIsSecure] = useState<boolean | undefined>(props.secure);
  const refInput = useRef<TextInput | null>(null);

  const isSecureField = props.secure ? isSecure : props.errors[props.name];
  const imageSource = isSecureField
    ? props.images.firstImage
    : props.images.lastImage;
  const imageStyle = props.secure ? styles.imagePassword : styles.imageCheck;

  const showError = props.errors[props.name] && props.errors[props.name].message !== 'false'
  
  return (
    <>
      <TouchableWithoutFeedback onPress={() => refInput.current?.focus()}>
        <View
          style={[
            styles.inputContainer,
            props.errors[props.name] && {
              borderColor: '#F4516C',
              borderWidth: 1,
            },
          ]}>
          <View style={{flex: 1}}>
            <TextInput
              ref={refInput}
              style={styles.input}
              autoCapitalize={'none'}
              autoComplete={'email'}
              keyboardType={'email-address'}
              autoCorrect={false}
              onChangeText={props.onChange}
              value={props.value}
              placeholder={props.label}
              placeholderTextColor={'#797979'}
              secureTextEntry={isSecure}
            />
          </View>

          {props.watch !== '' && (
            <TouchableWithoutFeedback
              onPress={() => props.secure && setIsSecure(!isSecure)}>
              <View>
                <Image source={imageSource} style={imageStyle} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </TouchableWithoutFeedback>
        
      {showError && (
        <Text style={{color: '#FFFFFF', paddingLeft: 5}}>
          {props.errors[props.name].message}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: defaultInputApp,
    height: 55,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 20,
    borderRadius: 7,
    gap: 20,
  },
  input: {
    color: '#ffffff',
    ...defaultTextApp,
    fontSize: 15,
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
