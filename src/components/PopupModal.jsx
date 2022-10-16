const Index = (props) => {
    // <PopupModal
      // display={displaySetup}
      // closePopup={closeSetup}
      // className="setup">

  if (!props.display) {
    return null;
  }      

  return (
    <div className="popup-wrapper">
      <div className="popup-fade"></div>
      <div className={"popup centered " + (props.className || "")}>
          {props.closePopup && <span className="close-x-btn close-tag" onClick={props.closePopup}>&times;</span>}
          {props.children}
      </div>
    </div>
  )
};

export default Index;