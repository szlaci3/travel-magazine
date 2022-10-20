import ValueInput from '@/components/ValueInput';
import {useEffect, useState} from 'react';
import {history} from 'umi';
import {postArticles, putArticles, getUsers, getArticles, putStatuses, deleteArticle} from '@/services/services';
import ErrorMsg from '@/components/ErrorMsg';
import {hasVal, delay} from '@/utils/utils';

const Index = (props) => {
  const [errorMsg, setErrorMsg] = useState();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [initial, setInitial] = useState({});
  const [isEdit, setIsEdit] = useState(props.action === "add");// initially enable Edit in add mode.
  const [sureDelete, setSureDelete] = useState(0);
  const [copyMsg, setCopyMsg] = useState();

  const id = props.match?.params?.id;

  useEffect(async () => {
    let res = await getUsers();
    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      setUsers(res);
    }

    if (props.action === "view" && hasVal(id)) {
      let [firstInArray] = await getArticles({id});
      if (!firstInArray) {
        history.push("/404");
      } else {
        setData(firstInArray);
        setInitial(firstInArray);
      }
    }
  }, []);

  const onChange = ev => {
    setData({...data, [ev.target.name]: ev.target.value});
  }

  const deleteOneArticle = async () => {
    if (sureDelete !== 0) {
      onSureDelete();
    } else {
      setSureDelete(1);
      await delay(300);
      setSureDelete(2);
      await delay(2500);
      setSureDelete(0);
    }
  }

  const onSureDelete = async () => {
    let res = await deleteArticle({id});

    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      //update statuses
      removeFromStatuses();
    }
  }

  const save = async () => {
    if (props.action === "add") {
      let res = await postArticles(data);
      if (res.code === 0) {
        setErrorMsg(res.msg);
        return;
      }

      //Add to statuses
      addToStatuses(res.id);
    } else {
      putArticles(data);
      setIsEdit(false);
    } 
  } 

  const addToStatuses = async (newId) => {
    let {statuses} = props;
    let _statuses = [[...statuses[0]], [...statuses[1]], [...statuses[2]]];
    _statuses[0].push(newId);
    let res = await putStatuses({statuses: _statuses});
    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      //reload dashboard data
      props.loadArticles();
      props.closePopup();
    }
  }

  const removeFromStatuses = async () => {
    let {statuses} = props;
    let _statuses = [[...statuses[0]], [...statuses[1]], [...statuses[2]]];
    let currentIdx = _statuses[props.status].indexOf(id);
    _statuses[props.status].splice(currentIdx, 1);
    let res = await putStatuses({statuses: _statuses});
    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      history.push("/dashboard");
    }
  }

  const onCancel = () => {
    setIsEdit(false);
    setData(initial);
  }

  const copyToClipboard = () => {
    let text = window.location.href;

    if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      let textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        setErrorMsg("Copy to clipboard failed.");
        return false;
      }
      finally {
        document.body.removeChild(textarea);
        setCopyMsg("Copied.");
      }
    }
  }




  return (
    <>
      <ErrorMsg
        msg={errorMsg}
        setMsg={setErrorMsg}
      />

      {props.action === "add" && <h2>Add Article</h2>}

      <form>
        <label className="title">
          <span>Title</span>
          <ValueInput name="title" value={data.title} onComplete={onChange} disabled={!isEdit}/>
        </label>

        <div className="article-type-select">
          <label className="type">
            <span>Type</span>
            {isEdit ? (
              <select name="type" value={data.type} onChange={onChange}>
                <option value={null} hidden></option>
                <option>Sight Seeing</option>
                <option>Nature</option>
                <option>Gourmand</option>
              </select>
            ) : (
              <div className="view-value select">{data.type}</div>
            )}
          </label>

          <div className={`type-icon ${data.type?.replace(" ", "")}`}/>
        </div>

        <div>
          <label className="reporter">
            <span>Reporter</span>
            {isEdit ? (
              <select name="reporter" value={data.reporter} onChange={onChange}>
                <option value={null} hidden></option>
                {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
              </select>
            ) : (
              <div className="view-value select">{users.find(user => String(user.id) === data.reporter)?.name}</div>
            )}
          </label>
          
          <label className="assignee">
            <span>Assignee</span>
            {isEdit ? (
              <select name="assignee" value={data.assignee} onChange={onChange}>
                <option value={null} hidden></option>
                {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
              </select>
            ) : (
              <div className="view-value select">{users.find(user => String(user.id) === data.assignee)?.name}</div>
            )}
          </label>

          <label className="duration">
            <span>Hours needed</span>
            <ValueInput type="number" inputProps={{min: 0}} name="duration" value={data.duration} onComplete={onChange} disabled={!isEdit}/>
          </label>
        </div>

        <label className="description">
          <span>Description</span>
          <textarea name="description" value={data.description} onChange={onChange} disabled={!isEdit}/>
        </label>

        <div className={`btns ${props.action}`}>
          {props.action === "view" && <>
            <button type="button" className={`delete-btn sure-${sureDelete}`} onClick={deleteOneArticle}>{sureDelete !== 0 ? "Sure ?" : "Delete"}</button>
            {!isEdit ? (
              <button type="button" className="edit-btn" onClick={() => setIsEdit(true)}>Edit</button>
            ) : (
              <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            )}
            {!isEdit ? (
              <button type="button" className="back-btn" onClick={() => history.push("/dashboard")}>Back</button>
            ) : (
              <button type="button" className="save-btn" onClick={save}>Save</button>
            )}
            <button type="button" className="copy-btn" onClick={copyToClipboard}>{copyMsg || "Copy Link"}</button>
          </>}

          {props.action === "add" && <>
            <button type="button" className="save-btn" onClick={save}>Save</button>
            <button type="button" className="cancel-btn" onClick={props.closePopup}>Cancel</button>
          </>}
        </div>
      </form>
    </>
  )
};

export default Index;