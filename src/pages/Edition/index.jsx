import {getArticles} from '@/services/services';
import {useEffect, useState} from 'react';
import ErrorMsg from '@/components/ErrorMsg';

const Index = (props) => {
  let [errorMsg, setErrorMsg] = useState();



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
  </div>
}


export default Index;
