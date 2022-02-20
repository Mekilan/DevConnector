import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { AddEduction } from "../../../actions/profile";
import PropTypes from "prop-types";

const Eduction = ({ AddEduction }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from:"",
    current: false,
    to:"",
    description: "",
  });
  const [toDateDisable, toogleDisabled] = useState(false);
  const { school, degree, fieldofstudy, from,current, to,description } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
  const submitEduction = async (e) => {
    e.preventDefault();
    await AddEduction(formData);
    navigate("/dashboard");
  };
  return (
    <div>
      <h1 class="large text-primary">Add Your Education</h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={(e) => submitEduction(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}  onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}  onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy}  onChange={(e) => onChange(e)}/>
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from}  onChange={(e) => onChange(e)}/>
        </div>
        <div class="form-group">
          <p>
            <input type="checkbox" name="current" value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toogleDisabled(!toDateDisable);
              }} /> Current School or
            Bootcamp
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" disabled={toDateDisable} value={to}  onChange={(e) => onChange(e)}/>
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}  onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

Eduction.propTypes = {
  AddEduction: PropTypes.func.isRequired,
};

export default connect(null, { AddEduction })(Eduction);
