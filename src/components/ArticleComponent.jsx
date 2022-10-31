import ValueInput from './ValueInput';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { postArticles, putArticles, deleteArticle } from '../services/services';
import ErrorMsg from './ErrorMsg';
import { hasVal, delay } from '../utils/utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useMountedState from 'react-usemountedstate';
import { connect } from 'dva';
import React from 'react';

const Index = props => {
  const useStateIfMounted = useMountedState();
  const [errorMsg, setErrorMsg] = useStateIfMounted();
  const [users, setUsers] = useStateIfMounted([]);
  const [data, setData] = useStateIfMounted({});
  const [initial, setInitial] = useStateIfMounted({});
  const [sureDelete, setSureDelete] = useStateIfMounted(0);
  const [kanban, setKanban] = useStateIfMounted([]);

  const [isEdit, setIsEdit] = useState(props.action === 'add'); // Initially enable Edit in add mode.
  const [copyMsg, setCopyMsg] = useState();
  const id = props.match?.params?.id;
  const { dispatch } = props;

  useEffect(() => {
    const { usersRes } = props;
    if (!usersRes) {
      dispatch({ type: 'global/_getUsers' });
    } else if (usersRes.code === 0) {
      setErrorMsg(usersRes.msg);
    } else {
      setUsers(usersRes);
    }
  }, [props.usersRes]);

  useEffect(() => {
    const { articlesRes } = props;
    if (!articlesRes) {
      dispatch({ type: 'global/_getArticles' });
    } else if (articlesRes.code === 0) {
      setErrorMsg(articlesRes.msg);
    } else {
      parseArticles(articlesRes);
    }
  }, [props.articlesRes]);

  const parseArticles = (articlesRes) => {
    if (props.action === 'view' && hasVal(id)) {
      const article = articlesRes.find((item) => String(item.id) === id);

      if (article) {
        setData(article);
        setInitial(article);
      } else {
        history.push('/404');
      }
    }

    if (props.action === 'add') {
      const _kanban = [[], [], []];
      for (let i = 0; i < articlesRes.length; i++) {
        const { status, index } = articlesRes[i];
        _kanban[status][index] = articlesRes[i];
      }

      setKanban(_kanban);
    }
  };

  const onChange = (ev) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };

  const deleteOneArticle = async () => {
    if (sureDelete === 0) {
      setSureDelete(1);
      await delay(300);
      setSureDelete(2);
      await delay(2500);
      setSureDelete(0);
    } else {
      onSureDelete();
    }
  };

  const onSureDelete = async () => {
    const res = await deleteArticle({ id });

    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      history.push('/dashboard');
    }
  };

  const whetherValid = () => {
    const must = [
      'title',
      'type',
      'reporter',
      'assignee',
      'duration',
      'description',
    ];
    const missing = must.filter((field) => !data[field]);
    if (missing.length > 0) {
      setErrorMsg(`Error: ${missing.join(', ')} cannot be empty.`);
      return false;
    }

    setErrorMsg(null);
    return true;
  };

  const save = async () => {
    if (!whetherValid()) {
      return;
    }

    if (props.action === 'add') {
      const lastItemInCol = [...kanban[0]].reverse()[0];
      const _data = {
        ...data,
        status: 0,
        index: lastItemInCol ? lastItemInCol.index + 1 : 0,
      };
      const res = await postArticles(_data);
      if (res.code === 0) {
        setErrorMsg(res.msg);
        return;
      }

      // Reload dashboard data
      props.loadArticles();
      props.closePopup();
    } else {
      putArticles(data);
      setIsEdit(false);
    }
  };

  const onCancel = () => {
    setIsEdit(false);
    setData(initial);
  };

  return (
    <div
      className={`article-inner status-${
        hasVal(data.status) ? data.status : 'none'
      }`}
    >
      <ErrorMsg msg={errorMsg} setMsg={setErrorMsg} />

      {props.action === 'add' && <h2>Add Article</h2>}

      <form>
        <label className='title'>
          <span>Title</span>
          <ValueInput
            name='title'
            value={data.title}
            onComplete={onChange}
            disabled={!isEdit}
          />
        </label>

        <div className='article-type-select'>
          <label className='type'>
            <span>Type</span>
            {isEdit ? (
              <select name='type' value={data.type} onChange={onChange}>
                <option value={null} hidden></option>
                <option>Sight Seeing</option>
                <option>Nature</option>
                <option>Gourmand</option>
              </select>
            ) : (
              <div className='view-value select'>{data.type}</div>
            )}
          </label>

          <div className={`type-icon ${data.type?.replace(' ', '')}`} />
        </div>

        <div>
          <label className='reporter'>
            <span>Reporter</span>
            {isEdit ? (
              <select name='reporter' value={data.reporter} onChange={onChange}>
                <option value={null} hidden></option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className='view-value select'>
                {users.find((user) => String(user.id) === data.reporter)?.name}
              </div>
            )}
          </label>

          <label className='assignee'>
            <span>Assignee</span>
            {isEdit ? (
              <select name='assignee' value={data.assignee} onChange={onChange}>
                <option value={null} hidden></option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className='view-value select'>
                {users.find((user) => String(user.id) === data.assignee)?.name}
              </div>
            )}
          </label>

          <label className='duration'>
            <span>Hours needed</span>
            <ValueInput
              type='number'
              inputProps={{ min: 0 }}
              name='duration'
              value={data.duration}
              onComplete={onChange}
              disabled={!isEdit}
            />
          </label>
        </div>

        <label className='description'>
          <span>Description</span>
          <textarea
            name='description'
            value={data.description}
            onChange={onChange}
            disabled={!isEdit}
          />
        </label>

        <div className={`btns ${props.action}`}>
          {props.action === 'view' && (
            <>
              <button
                type='button'
                className={`delete-btn sure-${sureDelete}`}
                onClick={deleteOneArticle}
              >
                {sureDelete === 0 ? 'Delete' : 'Sure ?'}
              </button>
              {isEdit ? (
                <button type='button' className='cancel-btn' onClick={onCancel}>
                  Cancel
                </button>
              ) : (
                <button
                  type='button'
                  className='edit-btn'
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>
              )}
              {isEdit ? (
                <button type='button' className='save-btn' onClick={save}>
                  Save
                </button>
              ) : (
                <button
                  type='button'
                  className='back-btn'
                  onClick={() => history.push('/dashboard')}
                >
                  Back
                </button>
              )}
              <CopyToClipboard
                text={window.location.href}
                onCopy={(_, isSuccess) =>
                  isSuccess
                    ? setCopyMsg('Copied.')
                    : setErrorMsg('Copy failed.')
                }
              >
                <button type='button' className='copy-btn'>
                  {copyMsg || 'Copy Link'}
                </button>
              </CopyToClipboard>
            </>
          )}

          {props.action === 'add' && (
            <>
              <button type='button' className='save-btn' onClick={save}>
                Save
              </button>
              <button
                type='button'
                className='cancel-btn'
                onClick={props.closePopup}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default connect((state) => state.global)(Index);
