import React from 'react';
import StyledTextInput from './TextInput';
import {Controller} from 'react-hook-form';
import {IDynamicFields} from '@interfaces/DynamicFields.interface';

const DynamicFields = ({control, errors, fields}: IDynamicFields) => {
  return (
    <>
      {fields.map((field: any) => (
        <Controller
          key={field.name}
          control={control}
          name={field.name}
          render={({field: {onChange, value}}) => (
            <StyledTextInput
              onChange={onChange}
              value={value}
              errors={errors[field.name]}
              label={field.label}
              watch={field.watch ? field.watch(field.name) : undefined}
              images={{
                firstImage: field.firstImage,
                lastImage: field.lastImage,
              }}
              secure={field.secure}
            />
          )}
        />
      ))}
    </>
  );
};

export default DynamicFields;
