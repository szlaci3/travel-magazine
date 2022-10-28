import ArticleComponent from '@/components/ArticleComponent';

const Index = (props) => (
  <div className="popup-wrapper">
    <div className="popup article centered">
      <ArticleComponent
        {...props}
        action="view"
      />
    </div>
  </div>
)

export default Index;