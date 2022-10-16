import {getPosts, postPosts} from '@/services/services';
import {useEffect} from 'react';

const CompanySetup = (props) => {
  useEffect(async () => {
    let res = await getPosts();
    console.log(res) 

    let res2 = await postPosts({a: 1});
    console.log(res2) 
  }, []);



  return <div>AAABBB</div>
}


export default CompanySetup;
