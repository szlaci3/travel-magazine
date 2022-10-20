import {getStatuses} from '@/services/services';
import {useEffect, useState} from 'react';
import ArticleComponent from '@/components/ArticleComponent';
import ErrorMsg from '@/components/ErrorMsg';

const Index = (props) => {
  const [status, setStatus] = useState(0);
  const [errorMsg, setErrorMsg] = useState();
  const myId = props.match?.params?.id;

  useEffect(async () => {
    let statusesRes = await getStatuses();
    console.log(statusesRes) 
    if (statusesRes.code === 0) {
      setErrorMsg(statusesRes.msg);
    }

    for (let i = statusesRes.statuses.length - 1; i>0; i--) {// not checking for 0
      if (statusesRes.statuses.find(id => id === myId)) {
        setStatus(i);
        break;
      }
    }
  }, []);


  return <div className="popup-wrapper">
    <div className="popup article centered">
      <ErrorMsg
        msg={errorMsg}
        setMsg={setErrorMsg}
      />

      <ArticleComponent
        {...props}
        action="view"
        status={status}
      />
    </div>
  </div>
}

export default Index;