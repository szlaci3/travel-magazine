import {useEffect, useState} from 'react';
import {delay} from '../utils/utils';

const Index = (props) => {
  const [cancelling, setCancelling] = useState(false);

  const close = async () => {
    setCancelling(true);
    await delay(400);
    setCancelling(false);
    props.setMsg(null);
  }

  if (!props.msg) {
    return null;
  }

  return <div className="sl-message">
    <div>
      <div className={`sl-message-notice ${cancelling ? "sl-move-up-leave sl-move-up-leave-active" : ""}`}>
        <div className="sl-message-notice-content">
          <div className="sl-message-custom-content sl-message-error">
            <span className="sl-icon sl-icon-close-circle"/>
            <span>{props.msg}</span>
            <span className="close-msg" onClick={close}>&times;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
}



export default Index;