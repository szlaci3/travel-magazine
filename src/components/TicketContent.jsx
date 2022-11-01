import React from 'react';

const Index = props => (
  <>
    <div className={`type-icon ${props.article.type?.replace(' ', '')}`} />
    <div>
      <span className='title'>{props.article.title}</span>
      <span className='duration'>{props.article.duration}h</span>
    </div>
    <div className='reporter'>
      Reporter:{' '}
      {
        props.users.find(
          user => String(user.id) === props.article.reporter,
        )?.name
      }
    </div>
    <div className='assignee'>
      Assignee:{' '}
      {
        props.users.find(
          user => String(user.id) === props.article.assignee,
        )?.name
      }
    </div>
    <div className='description'>{props.article.description}</div>
  </>
);

export default Index;
