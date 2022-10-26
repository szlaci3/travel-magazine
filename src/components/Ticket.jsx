import ValueInput from '@/components/ValueInput';
import {useEffect, useState} from 'react';
import {Link} from 'umi';
import {putStatuses} from '@/services/services';
import ErrorMsg from '@/components/ErrorMsg';
import {hasVal} from '@/utils/utils';

const Index = (props) => {
  const [errorMsg, setErrorMsg] = useState();

  const moveTo = async (newStatus) => {
    let {statuses} = props;
    let _statuses = [[...statuses[0]], [...statuses[1]], [...statuses[2]]];
    let currentStatus = props.status;
    let currentIdx = _statuses[currentStatus].indexOf(props.article.id);
    _statuses[currentStatus].splice(currentIdx, 1);
    _statuses[newStatus].push(props.article.id);
    let res = await putStatuses({statuses: _statuses});
    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      props.loadData();
    }
  }


  return (
    <div className="ticket">
      <ErrorMsg
        msg={errorMsg}
        setMsg={setErrorMsg}
      />

      {props.status > 0 ? <div className="move left" onClick={() => moveTo(props.status - 1)}/> : <div className="move disabled"/>}
      <Link className="inner" to={`article/${props.article.id}`}>
        <div className={`type-icon ${props.article.type?.replace(" ", "")}`}/>
        <div>
          <span className="title">{props.article.title} </span>
          <span className="duration">{props.article.duration}h </span>
        </div>
        <div className="reporter">Reporter: {props.users.find(user => String(user.id) === props.article.reporter)?.name}</div>
        <div className="assignee">Assignee: {props.users.find(user => String(user.id) === props.article.assignee)?.name}</div>
        <div className="description">{props.article.description}</div>
      </Link>
      {props.status < 2 ? <div className="move right" onClick={() => moveTo(props.status + 1)}/> : <div className="move disabled"/>}
    </div>
  )
};

export default Index;