import {getArticles, getUsers} from '../../services/services';
import {useEffect, useState} from 'react';
import ErrorMsg from '../../components/ErrorMsg';
import ErrorBoundary from '../../components/ErrorBoundary';
import Ticket from '../../components/Ticket';
import ArticleComponent from '../../components/ArticleComponent';
import PopupModal from '../../components/PopupModal';
import useMountedState from 'react-usemountedstate';

const Index = (props) => {
  const useStateIfMounted = useMountedState();
  const [errorMsg, setErrorMsg] = useStateIfMounted();
  const [users, setUsers] = useStateIfMounted();
  const [data, setData] = useStateIfMounted();

  const [displayAddArticle, setDisplayAddArticle] = useState(false);

  useEffect(async () => {
    let usersRes = await getUsers();
    if (usersRes.code === 0) {
      setErrorMsg(usersRes.msg);
    } else {
      setUsers(usersRes);
    }

    loadArticles();
  }, []);

  const loadArticles = async () => {
    let articlesRes = await getArticles();
    if (articlesRes.code === 0) {
      setErrorMsg(articlesRes.msg);
    } else {
      let _data = [[], [], []];
      for (let i=0; i<articlesRes.length; i++) {
        const {status, index} = articlesRes[i];
        _data[status][index] = articlesRes[i];
      }
      setData(_data);
    }
  }

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

export default Index;