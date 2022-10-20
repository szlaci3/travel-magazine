import PopupModal from '@/components/PopupModal';
import ArticleComponent from '@/components/ArticleComponent';

const Index = (props) => {
  if (!props.display) {
    return null;
  }

  return (
    <PopupModal
      display={true}
      closePopup={props.closePopup}
      className="article"
    >
      <ArticleComponent
        {...props}
        action="add"
      />
    </PopupModal>
  )
};

export default Index;