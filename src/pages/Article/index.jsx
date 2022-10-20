import {getStatuses} from '@/services/services';
import {useEffect, useState} from 'react';
import ArticleComponent from '@/components/ArticleComponent';
import ErrorMsg from '@/components/ErrorMsg';
import {hasVal} from '@/utils/utils';

const Index = (props) => {
  const [status, setStatus] = useState();
  const [statuses, setStatuses] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const myId = props.match?.params?.id;

  useEffect(async () => {
    let statusesRes = await getStatuses();
    console.log(statusesRes) 
    if (statusesRes.code === 0) {
      setErrorMsg(statusesRes.msg);
      return;
    } else {
      setStatuses(statusesRes.statuses);
    }

    let _status = 0;
    for (let i = statusesRes.statuses.length - 1; i>0; i--) {// not checking for 0
      if (statusesRes.statuses[i].find(id => String(id) === myId)) {
        _status = i;
        break;
      }
    }
    setStatus(_status);
  }, []);


  return <div className="popup-wrapper">
    <div className={`popup article centered status-${hasVal(status) ? status : "none"}`}>
      <ErrorMsg
        msg={errorMsg}
        setMsg={setErrorMsg}
      />

      <ArticleComponent
        {...props}
        action="view"
        status={status}
        statuses={statuses}
      />
    </div>
  </div>
}

export default Index;