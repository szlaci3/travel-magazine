import {getArticles} from '@/services/services';
import {useEffect, useState} from 'react';
import ErrorMsg from '@/components/ErrorMsg';
// import PopupModal from '@/components/PopupModal';
import AddArticle from '@/components/AddArticle';

const Index = (props) => {
  const [errorMsg, setErrorMsg] = useState();
  const [displayAddArticle, setDisplayAddArticle] = useState(true);



  useEffect(async () => {
    let res = await getArticles();
    console.log(res) 
    if (res.code === 0) {
      setErrorMsg(res.msg);
    }

  }, []);



  return <div>
    AAABBB
    <ErrorMsg
      msg={errorMsg}
    />
    <AddArticle
      display={displayAddArticle}
      closePopup={() => setDisplayAddArticle(false)}
      className="add-article"
    />
  </div>
}


export default Index;
