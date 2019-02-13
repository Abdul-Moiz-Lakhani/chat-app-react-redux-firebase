import React from "react";

export const InputField = props => {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={e => props.handleOnChange(e)}
    />
  );
};

export const InputMessageField = React.forwardRef((props, ref) => {
  return (
    <input
      type={props.type}
      defaultValue={props.defaultValue}
      ref={ref}
      id={props.id}
    />
  );
});
