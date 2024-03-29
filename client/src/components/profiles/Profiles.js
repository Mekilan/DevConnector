import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layouts/spinner";
import { getProfile } from "../../actions/profile";
import ProfileItem from "./../profiles/ProfileItem";
import PropTypes from "prop-types";

const Profiles = ({ getProfile, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles Found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Profiles);
