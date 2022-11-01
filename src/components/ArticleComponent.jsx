import React, {useEffect, useState} from 'react';
import {history} from 'umi';
import {postArticles, putArticles, deleteArticle} from '../services/services';
import ErrorMsg from './ErrorMsg';
import {hasVal, delay} from '../utils/utils';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useStateIfMounted} from 'use-state-if-mounted';
import {connect} from 'dva';
import {Input, Form, Select} from 'antd';

const Index = props => {
  const [errorMsg, setErrorMsg] = useStateIfMounted();
  const [users, setUsers] = useStateIfMounted([]);
  const [data, setData] = useStateIfMounted(props.action === 'add' ? {} : null);
  const [sureDelete, setSureDelete] = useStateIfMounted(0);
  const [kanban, setKanban] = useStateIfMounted([]);

  const [isEdit, setIsEdit] = useState(props.action === 'add'); // Initially enable Edit in add mode.
  const [copyMsg, setCopyMsg] = useState();
  const [type, setType] = useState('');
  const id = props.match?.params?.id;
  const {dispatch} = props;

  const [form] = Form.useForm();
  const {Option} = Select;
  const {TextArea} = Input;

  useEffect(() => {
    const {usersRes} = props;
    if (!usersRes) {
      dispatch({type: 'global/_getUsers'});
    } else if (usersRes.code === 0) {
      setErrorMsg(usersRes.msg);
    } else {
      setUsers(usersRes);
    }
  }, [props.usersRes]);

  useEffect(() => {
    const {articlesRes} = props;
    if (!articlesRes) {
      dispatch({type: 'global/_getArticles'});
    } else if (articlesRes.code === 0) {
      setErrorMsg(articlesRes.msg);
    } else {
      parseArticles(articlesRes);
    }
  }, [props.articlesRes]);

  const parseArticles = articlesRes => {
    if (props.action === 'view' && hasVal(id)) {
      const article = articlesRes.find(item => String(item.id) === id);

      if (article) {
        setData(article);
        setType(article.type);
      } else {
        history.push('/404');
      }
    }

    if (props.action === 'add') {
      const _kanban = [[], [], []];
      for (let i = 0; i < articlesRes.length; i++) {
        const {status, index} = articlesRes[i];
        _kanban[status][index] = articlesRes[i];
      }

      setKanban(_kanban);
    }
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
    const res = await deleteArticle({id});

    if (res.code === 0) {
      setErrorMsg(res.msg);
    } else {
      history.push('/dashboard');
    }
  };

  const save = async values => {
    if (props.action === 'add') {
      const lastItemInCol = [...kanban[0]].reverse()[0];
      const _data = {
        ...values,
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
      const _data = {
        ...data,
        ...values,
      };
      putArticles(_data);
      setIsEdit(false);
    }
  };

  const onCancel = () => {
    setIsEdit(false);
    form.resetFields();
    setType(data.type);
  };

  const eachUser = user => (
    <Option key={user.id} value={String(user.id)}>
      {user.name}
    </Option>
  );

  if (!data) {
    return null;
  }

  return (
    <div
      className={`article-inner status-${
        hasVal(data.status) ? data.status : 'none'
      }`}
    >
      <ErrorMsg msg={errorMsg} setMsg={setErrorMsg} />

      {props.action === 'add' && <h2>Add Article</h2>}

      <Form form={form} initialValues={data} colon={false} onFinish={save} labelAlign="right" requiredMark={false}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
            {
              min: 4,
              message: 'Title needs to be at least 4 letters.',
            },
          ]}
          className="title"
        >
          <Input autoFocus allowClear disabled={!isEdit}/>
        </Form.Item>

        <div className='article-type-select'>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: 'You must choose the article type before saving.',
              },
            ]}
            className="type"
          >
            <Select
              disabled={!isEdit}
              showArrow={isEdit}
              onChange={value => setType(value)}
            >
              <Option value='Sight Seeing'/>
              <Option value='Nature'/>
              <Option value='Gourmand'/>
            </Select>
          </Form.Item>

          <div className={`type-icon ${type.replace(' ', '')}`} />
        </div>

        <div>
          <Form.Item
            name="reporter"
            label="Reporter"
            rules={[{required: true}]}
            className="reporter"
          >
            <Select
              disabled={!isEdit}
              showArrow={isEdit}
            >
              {users.map(eachUser)}
            </Select>
          </Form.Item>

          <Form.Item
            name="assignee"
            label="Assignee"
            rules={[{required: true}]}
            className="assignee"
          >
            <Select
              disabled={!isEdit}
              showArrow={isEdit}
            >
              {users.map(eachUser)}
            </Select>
          </Form.Item>

          <Form.Item
            name="duration"
            label="Hours needed"
            rules={[
              {
                required: true,
                message: 'Please provide the number of hours',
              },
            ]}
            className="duration"
          >
            <Input disabled={!isEdit} type="number" min={0}/>
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Description"
          rules={[{required: true}]}
          className="description"
        >
          <TextArea
            disabled={!isEdit}
            maxLength={500}
            autoSize={{minRows: 3, maxRows: 12}}
            showCount={isEdit}
          />
        </Form.Item>

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
                <button type='submit' className='save-btn'>
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
              <button type='submit' className='save-btn'>
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
      </Form>
    </div>
  );
};

export default connect(state => state.global)(Index);
