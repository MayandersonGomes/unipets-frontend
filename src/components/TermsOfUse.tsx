import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import CheckBox from '@images/check/checkbox.png';
import {defaultTextApp, secondaryColor, messageError} from '@global/index';

interface StyledTermsOfUseProps {
  name: string;
  onChange: (text: boolean) => void;
  value: boolean;
  errors: any;
}

const StyledTermsOfUse: React.FC<StyledTermsOfUseProps> = ({
  name,
  onChange,
  value,
  errors,
}) => {
  const error = errors[name];
  return (
    <View style={styles.termsContainer}>
      <View style={styles.checkBoxContainer}>
        <TouchableOpacity onPress={() => onChange(!value)}>
          <View style={styles.checkBox}>
            {value && (
              <Image source={CheckBox} style={{width: 12, height: 12}} />
            )}
          </View>
        </TouchableOpacity>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textTerms}>Li e estou de acordo com os </Text>

          <TouchableOpacity>
            <Text
              style={{
                ...styles.textTerms,
                textDecorationLine: 'underline',
              }}>
              termos de uso
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {error && <Text style={{...messageError}}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    gap: 10,
  },
  checkBoxContainer: {
    gap: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    borderWidth: 3,
    borderColor: secondaryColor,
    borderRadius: 5,
  },
  textTerms: {
    ...defaultTextApp,
    fontSize: 14,
  },
});

export default StyledTermsOfUse;
