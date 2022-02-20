import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  },
}) => {
  return (
    <div class="profile bg-light">
      <img class="round-img" src={avatar} alt="" />
      <div>
        <h2>{name}</h2>
        <p>
          {status}
          {company && <span> at {company}</span>}
        </p>
        <p>{location}</p>
        <Link to={`/profile/${_id}`} class="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {skills.length > 0 ? (
          skills.slice(0, 4).map((skill, index) => (
            <li class="text-primary" key={index}>
              <i class="fas fa-check"></i> {skill}
            </li>
          ))
        ) : (
          <li>No Skills Found</li>
        )}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
