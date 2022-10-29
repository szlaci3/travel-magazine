import ArticleComponent from '@/components/ArticleComponent';
import ErrorBoundary from '../../components/ErrorBoundary';

const Index = (props) => (
  <ErrorBoundary>
    <div className="popup-wrapper">
      <div className="popup article centered">
        <ArticleComponent
          {...props}
          action="view"
        />
      </div>
    </div>
  </ErrorBoundary>    
)

export default Index;