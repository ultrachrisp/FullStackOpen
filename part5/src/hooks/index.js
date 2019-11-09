import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const clear = () => {
    setValue('');
  };

  return { type, value, onChange, clear };
};
