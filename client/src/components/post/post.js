import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Getposts } from "../../actions/post";
import PostItem from './PostItem';
import Spinner from "../layouts/spinner";
import PropTypes from "prop-types";
import PostForm from "./postForm";

const Post = ({ Getposts, post: { posts, loading } }) => {
  useEffect(() => {
    Getposts();
  }, [Getposts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  Getposts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { Getposts })(Post);
