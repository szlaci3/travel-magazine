function ValueInput(props) {
  let {
    type = "text",
    inputProps = {},
  } = props;

  const onInputChange = (keyEvent) => {
    keyEvent.target.onkeydown = ev => {
      if (ev.key === "Enter") {
        keyEvent.target.blur();
      }
    };
    keyEvent.target.onblur = ev => {
      props.onComplete(ev.target.value);
    };
  }


  return (
    <input className={"value-input " + (props.className || "")} type={type} {...inputProps} onChange={onInputChange}/>
  );
}

export default ValueInput;