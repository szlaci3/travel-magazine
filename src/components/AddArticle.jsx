import PopupModal from '@/components/PopupModal';
import ValueInput from '@/components/ValueInput';
import {useEffect, useState} from 'react';
import {postArticles, getUsers} from '@/services/services';
import ErrorMsg from '@/components/ErrorMsg';

    // <AddArticle
      // display={displaySetup}
      // closePopup={closeSetup}
      // className="setup">

const Index = (props) => {
  const [errorMsg, setErrorMsg] = useState();
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState();
  const [duration, setDuration] = useState();
  const [type, setType] = useState();
  const [reporter, setReporter] = useState();
  const [assignee, setAssignee] = useState();

  if (!props.display) {
    return null;
  }

  useEffect(async () => {
    let res = await getUsers();
    console.log(res) 
    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      setUsers(res);
    }
  }, []);


  const save = () => {
    postArticles({
      title,
      duration,
      type,
      reporter,
      assignee,
    })
  } 

  return (
    <PopupModal
      display={true}
      closePopup={props.closePopup}
      className="article"
    >
      <ErrorMsg
        msg={errorMsg}
      />

      <h1>Add Article</h1>

      <form>
        <label>
          <span>Title</span>
          <ValueInput onComplete={val => setTitle(val)}/>
        </label>

        <label>
          <span>Hours needed</span>
          <ValueInput type="number" inputProps={{min: 0}} onComplete={val => setDuration(val)}/>
        </label>

        <label>
          <span>Type</span>
          <select onChange={ev => setType(ev.target.value)}>
            <option value={null} hidden></option>
            <option>Sight Seeing</option>
            <option>Nature</option>
            <option>Gourmand</option>
          </select>
        </label>

        <label>
          <span>Reporter</span>
          <select onChange={ev => setReporter(ev.target.value)}>
            <option value={null} hidden></option>
            {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </label>

        <label>
          <span>Assignee</span>
          <select onChange={ev => setAssignee(ev.target.value)}>
            <option value={null} hidden></option>
            {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </label>

        <button type="button" onClick={save}>Save</button>
      </form>
    </PopupModal>
  )
};

export default Index;