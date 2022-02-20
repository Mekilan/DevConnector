import React from "react";
import { connect } from "react-redux";
import { deleteEduction } from "../../actions/profile";
import Moment from "react-moment";
import PropTypes from "prop-types";

const DashEduction = ({ education, deleteEduction }) => {
  const Educations =
    education.length !== 0 ? (
      education.map((exp) => (
        <tr key={exp._id}>
          <td>{exp.school}</td>
          <td className="hide-sm">{exp.degree}</td>
          <td className="hide-sm">
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
            {exp.to === null ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => deleteEduction(exp._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td>No Data Found</td>
      </tr>
    );
    
  return (
    <div>
      {" "}
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{Educations}</tbody>
      </table>
    </div>
  );
};

DashEduction.propTypes = {
  education: PropTypes.func.isRequired,
  deleteEduction: PropTypes.func.isRequired,
};

export default connect(null, { deleteEduction })(DashEduction);
