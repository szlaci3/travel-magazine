import ArticleContent from '../../components/ArticleContent';
import ErrorBoundary from '../../components/ErrorBoundary';
import React from 'react';

const Index = props => (
  <ErrorBoundary>
    <div className='popup-wrapper'>
      <div className='popup article centered'>
        <ArticleContent {...props} action='view' />
      </div>
    </div>
  </ErrorBoundary>
);

export default Index;
