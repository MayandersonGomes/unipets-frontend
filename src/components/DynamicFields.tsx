import React from 'react';
import {View} from 'react-native';
import StyledTextInput from './TextInput';
import {Controller} from 'react-hook-form';
import {IDynamicFields} from '@interfaces/DynamicFields.interface';

const DynamicFields: React.FC<IDynamicFields> = ({control, errors, fields}): JSX.Element => {
  return (
    <View style={{gap: 25}}>
      {fields.map((field, index) => (
        <Controller
          key={index}
          control={control}
          name={field.name}
          render={({field: {onChange, value}}) => (
            <StyledTextInput
              onChange={onChange}
              value={value}
              errors={errors[field.name]}
              label={field.label}
              watch={field.watch ? field.watch(field.name) : undefined}
              capitalize={field.capitalize}
              images={{
                firstImage: field.firstImage,
                lastImage: field.lastImage,
              }}
              secure={field.secure}
              help={field.help}
              mask={field.mask}
              keyboardType={field.keyboardType}
            />
          )}
        />
      ))}
    </View>
  );
};

export default DynamicFields;
