import {getPosts, postPosts} from '@/services/services';
import {useEffect, useState} from 'react';
import ErrorMsg from '@/components/ErrorMsg';
// import PopupModal from '@/components/PopupModal';
import AddArticle from '@/components/AddArticle';

const Index = (props) => {
  let [errorMsg, setErrorMsg] = useState();
  let [displayAddArticle, setDisplayAddArticle] = useState(true);



  useEffect(async () => {
    // let res = await getPosts();
    // console.log(res) 
    // if (res.code === 0) {
    //   setErrorMsg(res.msg);
    // }

    // let res2 = await postPosts({a: 1});
    // console.log(res2) 
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
