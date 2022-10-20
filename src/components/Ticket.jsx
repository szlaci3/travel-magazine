import ValueInput from '@/components/ValueInput';
import {useEffect, useState} from 'react';
import {putStatuses} from '@/services/services';
import ErrorMsg from '@/components/ErrorMsg';
import {hasVal} from '@/utils/utils';
    // <ArticleComponent

const Index = (props) => {
  const moveRight = () => {
    let {statuses} = props;
    let _statuses = [[...statuses[0]], [...statuses[1]], [...statuses[2]]];
    let currentStatus = props.status;
    if (currentStatus < 2) {
      let currentIdx = _statuses[currentStatus].indexOf(props.article.id);
      _statuses[currentStatus].splice(currentIdx, 1);
      _statuses[currentStatus + 1].push(props.article.id);
      putStatuses({statuses: _statuses});
      props.loadData();
    }
  }

  const moveLeft = () => {
    let {statuses} = props;
    let _statuses = [[...statuses[0]], [...statuses[1]], [...statuses[2]]];
    let currentStatus = props.status;
    if (currentStatus > 0) {
      let currentIdx = _statuses[currentStatus].indexOf(props.article.id);
      _statuses[currentStatus].splice(currentIdx, 1);
      _statuses[currentStatus - 1].push(props.article.id);
      putStatuses({statuses: _statuses});
      props.loadData();
    }
  }

  return (
    <div className="ticket">
      {props.status > 0 ? <div className="move left" onClick={moveLeft}/> : <div className="move disabled"/>}
      <div className="inner">
        <div className="title">{props.article.title}</div>
        <span className="type">{props.article.type}</span>
        <span className="reporter">{props.users.find(user => String(user.id) === props.article.reporter)?.name}</span>
        <span className="assignee">{props.users.find(user => String(user.id) === props.article.assignee)?.name}</span>
        <span className="duration">{props.article.duration}h </span>
        <div className="description">{props.article.description}</div>
        
        <span className="status">{props.status}</span>
      </div>
      {props.status < 2 ? <div className="move right" onClick={moveRight}/> : <div className="move disabled"/>}
    </div>
  )
};

export default Index;