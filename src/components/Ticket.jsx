import React, {useState} from 'react';
import {putArticles} from '../services/services';
import ErrorMsg from './ErrorMsg';
import {Link} from 'umi';
import TicketContent from './TicketContent';

const Index = props => {
  const [errorMsg, setErrorMsg] = useState();

  const moveTo = async newStatus => {
    const lastItemInCol = [...props.data[newStatus]].reverse()[0];
    const _article = {
      ...props.article,
      status: newStatus,
      index: lastItemInCol ? lastItemInCol.index + 1 : 0,
    };

    const res = await putArticles(_article);
    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      props.loadData();
    }
  };

  return (
    <div className='ticket'>
      <ErrorMsg msg={errorMsg} setMsg={setErrorMsg} />

      {props.article.status > 0 ? (
        <div
          className='move left'
          onClick={() => moveTo(props.article.status - 1)}
        />
      ) : (
        <div className='move disabled' />
      )}
      <Link
        className='inner'
        to={`article/${props.article.id}`}
      >
        <TicketContent
          article={props.article}
          users={props.users}
        />
      </Link>
      {props.article.status < 2 ? (
        <div
          className='move right'
          onClick={() => moveTo(props.article.status + 1)}
        />
      ) : (
        <div className='move disabled' />
      )}
    </div>
  );
};

export default Index;
