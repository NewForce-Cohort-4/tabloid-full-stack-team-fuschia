import React from "react";
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import { Card, CardImg, CardBody, CardHeader, Button } from "reactstrap";
import "./Post.css";

export const Post = ({ post }) => {
  const isCurrentUserPost = JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId;
 
  const history = useHistory();
  // console.log(history)

    return (
    <Card className="m-8">
        <CardHeader>
            {/* Added link to post header. On click go to details view */}
        <Link to={`/post/detail/${post.id}`} style={{ textDecoration: 'none', color: 'black'}}><p><strong>{post.title}</strong></p></Link>
        </CardHeader>
        <CardImg top src={post.imageLocation} alt={post.title} />
        <CardBody>
          <p className="text-left px-2">Posted by: {post.userProfile.fullName}</p>
              <p>{post.caption}</p>
          <p>{post.category.name}</p>
              {/* <div className="comment-container">
              {post.comments.map(comment => (
                  <p key={comment.Id}>{comment.message}</p>
              ))}
              </div> */}
           
          <div className="button-container">
            {isCurrentUserPost 
              ? <Button className="button btn btn-sm" onClick={() => {history.push(`/post/edit/${post.id}`)}}>Edit</Button> 
              : <div></div>
            }
            {isCurrentUserPost 
              ? <Button className="button btn btn-sm" onClick={() => {history.push(`/post/delete/${post.id}`)}}>Delete</Button> 
              : <div></div>
            }
          </div>
             
        </CardBody>
    </Card>
    
  );
};

export default Post;