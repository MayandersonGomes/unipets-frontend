import {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {defaultTextApp, defaultInputColor} from '@global';
import {ITextInput} from '@interfaces/Input.interface';

const StyledTextInput = ({
  secure,
  errors,
  images,
  onChange,
  value,
  label,
  watch,
}: ITextInput): JSX.Element => {
  const [isSecure, setIsSecure] = useState<boolean | undefined>(secure);
  const refInput = useRef<TextInput | null>(null);

  const error = errors;
  const message = error?.message;

  const isSecureField = secure ? isSecure : error;
  const imageSource = isSecureField ? images?.firstImage : images?.lastImage;
  const imageStyle = secure ? styles.imagePassword : styles.imageCheck;

  const showError = error && message !== 'false';

  const onChangeText = (text: any) => {
    const digit = secure ? '' : ' '
    const cleanedText = text.replace(/ +/g, digit)
    onChange(cleanedText);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => refInput.current?.focus()}>
        <View
          style={[
            styles.inputContainer,
            error && {
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
              onChangeText={onChangeText}
              value={value}
              placeholder={label}
              placeholderTextColor={'#797979'}
              secureTextEntry={isSecure}
            />
          </View>
          
          {imageSource && watch !== '' && (
            <TouchableWithoutFeedback
              onPress={() => secure && setIsSecure(!isSecure)}>
              <View>
                <Image source={imageSource} style={imageStyle} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </TouchableWithoutFeedback>

      {showError && (
        <Text style={{color: '#FFFFFF', paddingLeft: 5}}>{message}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: defaultInputColor,
    height: 55,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 20,
    borderRadius: 7,
    gap: 20,
  },
  input: {
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
