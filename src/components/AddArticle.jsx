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
        <select onChange={ev => setType(ev.target.value)}>
          <option>AAAA</option>
          <option>BBB</option>
        </select >

        <button type="submit" onClick={save}>Save</button>
      </form>
    </PopupModal>
  )
};

export default Index;