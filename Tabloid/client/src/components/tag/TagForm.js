import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";

export const TagForm = () => {
  //exposing the addTag function from the TagProdiver
  const { addTag, editTag, getTagById } = useContext(TagContext);
  // setting tagInput to an empty state so we can add in the new tag information
  const [tagInput, setTagInput] = useState({});
  const {tagId} = useParams();
  const history = useHistory();
  // wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(tagId){
      getTagById(tagId)
      .then(tag => {
        setTagInput(tag)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, []);

  const handleControlledInputChange = (event) => {
      let newTag = { ...tagInput}
      newTag[event.target.id] = event.target.value 
      setTagInput(newTag)
  }

  const handleClickAddTag = (event) => {
      event.preventDefault();
      setIsLoading(true);
      if(tagId){
        editTag({
          Id: parseInt(tagId),
          Name: tagInput.name
        })
        .then(() => history.push(`/tags`))
      }
      addTag({
          name: tagInput.name
    })
    .then(() => history.push("/tags"))
  }
  
  return (
    <form className="tagForm">
    <h2 className="tagForm__title">Add Tag</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="title">Tag Name:</label>
            <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="" value={tagInput?.name} />
        </div>
    </fieldset>
    
    <button className="btn btn-primary"
        onClick={handleClickAddTag}>
        Save Tag
        </button>
    </form>
  );
}
