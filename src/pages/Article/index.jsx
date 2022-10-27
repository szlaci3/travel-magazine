import {useEffect, useState} from 'react';
import ArticleComponent from '@/components/ArticleComponent';
import ErrorMsg from '@/components/ErrorMsg';
import {hasVal} from '@/utils/utils';

const Index = (props) => {
  const [status, setStatus] = useState();
  const [statuses, setStatuses] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const myId = props.match?.params?.id;


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