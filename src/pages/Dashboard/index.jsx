import {useEffect, useState} from 'react';
import ErrorMsg from '../../components/ErrorMsg';
import ErrorBoundary from '../../components/ErrorBoundary';
import Ticket from '../../components/Ticket';
import ArticleComponent from '../../components/ArticleComponent';
import PopupModal from '../../components/PopupModal';
import useMountedState from 'react-usemountedstate';
import { connect } from 'dva';

const Index = (props) => {
  const useStateIfMounted = useMountedState();
  const [errorMsg, setErrorMsg] = useStateIfMounted();
  const [users, setUsers] = useStateIfMounted();
  const [data, setData] = useStateIfMounted();

  const [displayAddArticle, setDisplayAddArticle] = useState(false);
  const {dispatch} = props;

  useEffect(() => {
    dispatch({type: "global/_getUsers"});
    
    loadArticles();
  }, []);

  useEffect(() => {
    const {usersRes} = props;
    if (!usersRes) { return; }
    if (usersRes.code === 0) {
      setErrorMsg(usersRes.msg);
    } else {
      setUsers(usersRes);
    }
  }, [props.usersRes]);

  const loadArticles = () => {
    dispatch({type: "global/_getArticles"});
  }

  useEffect(() => {
    const {articlesRes} = props;
    if (!articlesRes) { return; }
    if (articlesRes.code === 0) {
      setErrorMsg(articlesRes.msg);
    } else {
      const _data = [[], [], []];
      for (let i=0; i<articlesRes.length; i++) {
        const {status, index} = articlesRes[i];
        _data[status][index] = articlesRes[i];
      }
      setData(_data);
    }
  }, [props.articlesRes]);

  const eachTicket = (article) => <Ticket key={article.id} data={data} article={article} users={users} loadData={loadArticles}/>


  return <ErrorBoundary>
    <ErrorMsg
      msg={errorMsg}
      setMsg={setErrorMsg}
    />

    <PopupModal
      display={displayAddArticle}
      closePopup={() => setDisplayAddArticle(false)}
      className="article"
    >
      <ArticleComponent
        action="add"
        loadArticles={loadArticles}
        display={displayAddArticle}
        closePopup={() => setDisplayAddArticle(false)}
       />
    </PopupModal>


    <header>
      <h1>Travel Magazine</h1>
    </header>

    <div className="add-wrapper">
      <button className="add-btn" onClick={() => setDisplayAddArticle(true)}>Add Article</button>
    </div>

    <article className="block">
      <section className="column todo">
        <h2>Todo</h2>
        {data && data[0].map(eachTicket)}
      </section>
      <section className="column in-progress">
        <h2>In Progress</h2>
        {data && data[1].map(eachTicket)}
      </section>
      <section className="column completed">
        <h2>Completed</h2>
        {data && data[2].map(eachTicket)}
      </section>
    </article>
  </ErrorBoundary>
}

export default connect(state => state.global)(Index);