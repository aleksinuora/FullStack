import React from 'react';

export const RadioButton = (
  name: string,
  value: string,
  index: number,
  onChange: () => void
) => {
  return (
    <React.Fragment key={value + index}>
      {value}
      <input
        key={name + value + index}
        type='radio'
        name={name}
        value={value}
        onChange={onChange}
      />
    </React.Fragment>
  );
};
