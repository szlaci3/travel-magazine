import ValueInput from '@/components/ValueInput';
import {useEffect, useState} from 'react';
import {Link} from 'umi';
import {putStatuses} from '@/services/services';
import ErrorMsg from '@/components/ErrorMsg';
import {hasVal} from '@/utils/utils';

const Index = (props) => {
  const [errorMsg, setErrorMsg] = useState();

  const moveRight = async () => {
    let {statuses} = props;
    let _statuses = [[...statuses[0]], [...statuses[1]], [...statuses[2]]];
    let currentStatus = props.status;
    if (currentStatus < 2) {
      let currentIdx = _statuses[currentStatus].indexOf(props.article.id);
      _statuses[currentStatus].splice(currentIdx, 1);
      _statuses[currentStatus + 1].push(props.article.id);
      let res = await putStatuses({statuses: _statuses});
      if (res.code === 0) {
        setErrorMsg(res.msg);
      } else {
        props.loadData();
      }
    }
  }

  const moveLeft = async () => {
    let {statuses} = props;
    let _statuses = [[...statuses[0]], [...statuses[1]], [...statuses[2]]];
    let currentStatus = props.status;
    if (currentStatus > 0) {
      let currentIdx = _statuses[currentStatus].indexOf(props.article.id);
      _statuses[currentStatus].splice(currentIdx, 1);
      _statuses[currentStatus - 1].push(props.article.id);
      let res = await putStatuses({statuses: _statuses});
      if (res.code === 0) {
        setErrorMsg(res.msg);
      } else {
        props.loadData();
      }
    }
  }

  return (
    <div className="ticket">
      <ErrorMsg
        msg={errorMsg}
        setMsg={setErrorMsg}
      />

      {props.status > 0 ? <div className="move left" onClick={moveLeft}/> : <div className="move disabled"/>}
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
      {props.status < 2 ? <div className="move right" onClick={moveRight}/> : <div className="move disabled"/>}
    </div>
  )
};

export default Index;