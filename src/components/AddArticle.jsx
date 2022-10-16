import PopupModal from '@/components/PopupModal';
import {useEffect, useState} from 'react';
import {getPosts, postPosts} from '@/services/services';

    // <AddArticle
      // display={displaySetup}
      // closePopup={closeSetup}
      // className="setup">

const Index = (props) => {
  const [type, setType] = useState();

  if (!props.display) {
    return null;
  }

  const save = () => {
    postPosts({
      name: type,
    })
  } 

  return (
    <PopupModal
      display={true}
      closePopup={props.closePopup}
    >
      <h1>Add Article</h1>

      <form>
        <select onChange={ev => setType(ev.target.value)}>
          <option value={null} hidden></option>
          <option>Sight Seeing</option>
          <option>Nature</option>
          <option>Gourmand</option>
        </select >

        <button type="submit" onClick={save}>Save</button>
      </form>
    </PopupModal>
  )
};

export default Index;