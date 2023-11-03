import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import RedCheck from '@images/check/red-check-pass.png';
import GreenCheck from '@images/check/green-check-pass.png';
import {defaultTextApp} from '@global';
import {IDynamicErrors} from '@interfaces/DynamicErrors.interface';

const DynamicErrors: React.FC<IDynamicErrors> = ({
  fields,
  errors,
}): JSX.Element => {
  return (
    <View style={{paddingLeft: 5}}>
      <Text style={styles.title}>Sua senha precisa ter</Text>
      {fields.map((field: any, index: number) => (
        <View key={index} style={styles.imageContainer}>
          <Image
            source={!errors[field.title] ? RedCheck : GreenCheck}
            style={{width: 12, height: 12}}
          />

          <Text style={styles.label}>{field.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    ...defaultTextApp,
    fontSize: 14,
    marginBottom: 7,
  },
  label: {
    ...defaultTextApp,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});
export default DynamicErrors;
