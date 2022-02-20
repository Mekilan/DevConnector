import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layouts/spinner";
import { Link, useParams } from "react-router-dom";
import { getProfileId } from "./../../actions/profile";

const ProfileView = ({
  getProfileId,
  profile: { profile, loading },
  auth,
}) => {
  const { id } = useParams();
  debugger;
  useEffect(() => {
    getProfileId(id);
  }, [getProfileId]);
  return (
    <Fragment>
      {profile === null && loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile?.user?._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileView.propTypes = {
  getProfileId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileId })(ProfileView);
