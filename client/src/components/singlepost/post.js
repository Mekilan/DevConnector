import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/spinner";
import PostItem from "../post/PostItem";
import { getSinglePost } from "../../actions/post";
import CommentForm from "./commentForm";
import CommentItem from "./CommentItem";

const SinglePost = ({ getSinglePost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getSinglePost(id);
  }, [getSinglePost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/post" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

SinglePost.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getSinglePost })(SinglePost);
