import React, { useState } from 'react';
import { putArticles } from '../services/services';
import ErrorMsg from './ErrorMsg';
import { Link } from 'umi';

const Index = props => {
  const [errorMsg, setErrorMsg] = useState();

  const moveTo = async (newStatus) => {
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
        data-testid={`${props.article.status}_${props.article.index}`}
      >
        <div className={`type-icon ${props.article.type?.replace(' ', '')}`} />
        <div>
          <span className='title'>{props.article.title} </span>
          <span className='duration'>{props.article.duration}h </span>
        </div>
        <div className='reporter'>
          Reporter:{' '}
          {
            props.users.find(
              (user) => String(user.id) === props.article.reporter
            )?.name
          }
        </div>
        <div className='assignee'>
          Assignee:{' '}
          {
            props.users.find(
              (user) => String(user.id) === props.article.assignee
            )?.name
          }
        </div>
        <div className='description'>{props.article.description}</div>
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
