import {useEffect, useState} from 'react';
import {delay} from '@/utils/utils';

const Index = (props) => {
  const [msg, setMsg] = useState(props.msg);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    setMsg(props.msg);
  }, [props.msg]);

  close = async () => {
    setCancelling(true);
    await delay(400);
    setCancelling(false);
    setMsg(null);
  }

  if (!msg) {
    return null;
  }

  return <div className="sl-message">
    <div>
      <div className={`sl-message-notice ${cancelling ? "sl-move-up-leave sl-move-up-leave-active" : ""}`}>
        <div className="sl-message-notice-content">
          <div className="sl-message-custom-content sl-message-error">
            <span className="sl-icon sl-icon-close-circle" onClick={close}/>
            <span>{msg}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
}



export default Index;