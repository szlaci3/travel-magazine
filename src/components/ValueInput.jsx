import React, { useEffect, useState } from 'react';

function ValueInput(props) {
  const [value, setValue] = useState(props.value);
  const { type = 'text', inputProps = {} } = props;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onInputChange = (keyEvent) => {
    setValue(keyEvent.target.value);
    keyEvent.target.onkeydown = (ev) => {
      if (ev.key === 'Enter') {
        keyEvent.target.blur();
      }
    };

    keyEvent.target.onblur = (ev) => {
      props.onComplete(ev);
    };
  };

  return (
    <input
      className={'value-input ' + (props.className || '')}
      type={type}
      {...inputProps}
      name={props.name}
      value={value || ''}
      onChange={onInputChange}
      disabled={props.disabled}
    />
  );
}

export default ValueInput;
