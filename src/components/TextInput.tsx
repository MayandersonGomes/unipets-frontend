import {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {
  defaultTextApp,
  defaultInputColor,
  primaryColor,
  secondaryColor,
  messageError,
} from '@global';
import {ITextInput} from '@interfaces/Input.interface';
import DynamicErrors from './DynamicErrors';
import {IErros} from '@interfaces/DynamicErrors.interface';
import MaskInput from 'react-native-mask-input';
import {validatePassword} from '@validations/password.validation';
import {IValidatePassword} from '@interfaces/Password.interface';

const StyledTextInput: React.FC<ITextInput> = ({
  secure,
  errors,
  images,
  onChange,
  value,
  label,
  help,
  watch,
  capitalize,
  mask,
  keyboardType,
}): JSX.Element => {
  const [placeholderAnimated] = useState(new Animated.Value(0));

  const [passwordErros, setPasswordErros] = useState<IValidatePassword>({
    character: false,
    letter: false,
    number: false,
    min: false,
  });

  const [placeholderSize, setPlaceholderSize] = useState(15);
  const [placeholderPadding, setPlaceholderPadding] = useState(0);

  const [isSecure, setIsSecure] = useState<boolean | undefined>(secure);
  const refInput = useRef<TextInput | null>(null);
  const error = errors;
  const message = error?.message;

  const isSecureField = secure ? isSecure : error;
  const imageSource = isSecureField ? images?.firstImage : images?.lastImage;
  const imageStyle = secure ? styles.imagePassword : styles.imageCheck;

  const showError = error && message !== 'false';

  const onChangeText = (text: string) => {
    const digit = secure ? '' : ' ';
    const cleanedText = text.replace(/ +/g, digit);

    help && setPasswordErros(validatePassword(text));

    onChange(cleanedText);
  };

  const fields: IErros[] = [
    {title: 'character', label: 'Caractere especial'},
    {title: 'letter', label: 'Letras maiúsculas e minúsculas'},
    {title: 'number', label: 'Número'},
    {title: 'min', label: '8 caracteres'},
  ];

  const handleFocus = () => {
    if (!value) {
      setPlaceholderSize(13);
      setPlaceholderPadding(5);
      Animated.timing(placeholderAnimated, {
        toValue: -25,
        duration: 120,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleBlur = () => {
    if (!value) {
      setPlaceholderSize(15);
      setPlaceholderPadding(0);
      Animated.timing(placeholderAnimated, {
        toValue: 0,
        duration: 120,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={{gap: 10}}>
      <TouchableWithoutFeedback onPress={() => refInput.current?.focus()}>
        <View
          style={[
            styles.mainContainer,
            error && {
              borderColor: secondaryColor,
              borderWidth: 1,
            },
          ]}>
          <View style={styles.inputContainer}>
            <MaskInput
              mask={mask}
              placeholder={undefined}
              ref={refInput}
              style={styles.input}
              autoCapitalize={capitalize}
              autoCorrect={false}
              keyboardType={keyboardType}
              onChangeText={onChangeText}
              value={value}
              secureTextEntry={isSecure}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <Animated.Text
              style={[
                styles.placeholder,
                {
                  top: placeholderAnimated,
                  fontSize: placeholderSize,
                  paddingHorizontal: placeholderPadding,
                },
              ]}>
              {label}
            </Animated.Text>
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

      {showError && <Text style={{...messageError}}>{message}</Text>}

      {help && (
        <View style={{gap: 5}}>
          <DynamicErrors fields={fields} errors={passwordErros} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: defaultInputColor,
    borderWidth: 2,
    height: 55,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 20,
    borderRadius: 7,
    gap: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    ...defaultTextApp,
    fontSize: 15,
  },
  placeholder: {
    position: 'absolute',
    ...defaultTextApp,
    color: '#797979',
    backgroundColor: primaryColor,
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
