import {getArticles, getStatuses, getUsers, putStatuses} from '@/services/services';
import {useEffect, useState} from 'react';
import ErrorMsg from '@/components/ErrorMsg';
import Ticket from '@/components/Ticket';
import AddArticle from '@/components/AddArticle';

const Index = (props) => {
  const [errorMsg, setErrorMsg] = useState();
  const [users, setUsers] = useState();
  const [articles, setArticles] = useState();
  const [data, setData] = useState();
  const [statuses, setStatuses] = useState();
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
      setArticles(articlesRes);
    }
  }

  const loadData = async () => {
    let statusesRes = await getStatuses();
    if (statusesRes.code === 0) {
      setErrorMsg(statusesRes.msg);
    }

    let _data = statusesRes.statuses.map(col => col.map(id => articles.find(article => article.id === id)).filter(one => one));

    setData(_data);
    setStatuses(statusesRes.statuses);
  }

  useEffect(() => {
    if (articles) {
      loadData();
    }
  }, [articles]);

  return <div>
    <ErrorMsg
      msg={errorMsg}
      setMsg={setErrorMsg}
    />
    <AddArticle
      display={displayAddArticle}
      closePopup={() => setDisplayAddArticle(false)}
      className="add-article"
      statuses={statuses}
      loadArticles={loadArticles}
     />

    <header>
      <h1>Travel Magazine</h1>
    </header>

    <div className="add-wrapper">
      <button className="add-btn" onClick={() => setDisplayAddArticle(true)}>Add Article</button>
    </div>

    <article className="block">
      <section className="column todo">
        <h2>Todo</h2>
        {data && data[0].map((article, i) => <Ticket key={article.id} statuses={statuses} article={article} users={users} status={0} loadData={loadData}/>)}
      </section>
      <section className="column in-progress">
        <h2>In Progress</h2>
        {data && data[1].map((article, i) => <Ticket key={article.id} statuses={statuses} article={article} users={users} status={1} loadData={loadData}/>)}
      </section>
      <section className="column completed">
        <h2>Completed</h2>
        {data && data[2].map((article, i) => <Ticket key={article.id} statuses={statuses} article={article} users={users} status={2} loadData={loadData}/>)}
      </section>
    </article>
  </div>
}


export default Index;
