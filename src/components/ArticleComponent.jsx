import ValueInput from '@/components/ValueInput';
import {useEffect, useState} from 'react';
import {postArticles, putArticles, getUsers, getArticles} from '@/services/services';
import ErrorMsg from '@/components/ErrorMsg';
import {hasVal} from '@/utils/utils';
    // <ArticleComponent

const Index = (props) => {
  const [errorMsg, setErrorMsg] = useState();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const id = props.match?.params?.id;

  useEffect(async () => {
    let res = await getUsers();
    console.log(res) 
    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      setUsers(res);
    }

    if (props.action === "view" && hasVal(id)) {
      let [firstInArray] = await getArticles({id});
      setData(firstInArray);
    }
  }, []);

  const onChange = ev => {
    setData({...data, [ev.target.name]: ev.target.value});
  }

  const save = () => {
    if (props.action === "add") {
      postArticles(data);
    } else {
      putArticles(data);
    } 
  } 

  return (
    <>
      <ErrorMsg
        msg={errorMsg}
      />

      {props.action === "add" && <h2>Add Article</h2>}

      <form>
        <label>
          <span>Title</span>
          <ValueInput name="title" value={data.title} onComplete={onChange}/>
        </label>

        <div className="article-type-select">
          <label>
            <span>Type</span>
            <select name="type" value={data.type} onChange={onChange}>
              <option value={null} hidden></option>
              <option>Sight Seeing</option>
              <option>Nature</option>
              <option>Gourmand</option>
            </select>
          </label>

          <div className={`type-icon ${data.type?.replace(" ", "")}`}/>

          {props.action === "view" && !isEdit && (
            <button type="button" className="edit-btn" onClick={() => setIsEdit(true)}>Edit</button>
          )}
        </div>

        <div>
          <label>
            <span>Reporter</span>
            <select name="reporter" value={data.reporter} onChange={onChange}>
              <option value={null} hidden></option>
              {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
          </label>

          <label>
            <span>Assignee</span>
            <select name="assignee" value={data.assignee} onChange={onChange}>
              <option value={null} hidden></option>
              {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
          </label>

          <label>
            <span>Hours needed</span>
            <ValueInput type="number" inputProps={{min: 0}} name="duration" value={data.duration} onComplete={onChange}/>
          </label>
        </div>

        <label>
          <span className="description-label">Description</span>
          <textarea name="description" value={data.description} onChange={onChange}/>
        </label>


        <button type="button" onClick={save}>Save</button>
      </form>
    </>
  )
};

export default Index;