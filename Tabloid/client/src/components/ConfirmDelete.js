import React, { useContext} from "react";
import {useParams, useHistory } from "react-router-dom";
import { PostContext } from '../providers/PostProvider';

export const ConfirmDelete = () => {
    const { deletePost } = useContext(PostContext);
    const {postId} = useParams();
    const history = useHistory();
    return (
        <div className="container">
          <div className="row justify-content-center">
            <h3>Are you sure you want to delete this post?</h3>
          </div>
          <div className="row justify-content-center">
            <button onClick={() => {history.push("/post")}} className="buttonCancel">Cancel</button>
            <button onClick={() => {deletePost(postId); history.push("/post")}} className="buttonDelete">
              Confirm
            </button>
          </div>
      </div>
    );
  }
  
  export default ConfirmDelete;