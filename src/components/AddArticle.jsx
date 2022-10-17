import PopupModal from '@/components/PopupModal';
import ValueInput from '@/components/ValueInput';
import {useEffect, useState} from 'react';
import {getPosts, postPosts} from '@/services/services';

    // <AddArticle
      // display={displaySetup}
      // closePopup={closeSetup}
      // className="setup">

const Index = (props) => {
  const [title, setTitle] = useState();
  const [duration, setDuration] = useState();
  const [type, setType] = useState();

  if (!props.display) {
    return null;
  }

  const save = () => {
    postPosts({
      title,
      duration,
      type,
    })
  } 

  return (
    <PopupModal
      display={true}
      closePopup={props.closePopup}
    >
      <h1>Add Article</h1>

      <form>
        <ValueInput onComplete={val => setTitle(val)}/>
        <ValueInput onComplete={val => setDuration(val)}/>

        <select onChange={ev => setType(ev.target.value)}>
          <option value={null} hidden></option>
          <option>Sight Seeing</option>
          <option>Nature</option>
          <option>Gourmand</option>
        </select >

        <button type="button" onClick={save}>Save</button>
      </form>
    </PopupModal>
  )
};

export default Index;