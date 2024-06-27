import React, { useEffect, useState } from "react";
import { Row, Col, Card, Container } from "reactstrap";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo-sm-dark.png";

const EditStudent = () => {
  const { id } = useParams();
  console.log({id}); // Get id from URL params
  const history = useHistory();
  const [studentDetails, setStudentDetails] = useState({
    rollNo: "",
    name: "",
    branch: "",
    course: "",
    college: "",
    status: ""
  });

  // useEffect(() => {
  //   const fetchStudent = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:4000/getstudentdetailsbyroll/${id}`);
  //       setStudentDetails(response.data); // Update studentDetails with fetched data
  //     } catch (error) {
  //       console.error("Error fetching student data:", error);
  //     }
  //   };

  //   fetchStudent(); // Call fetchStudent function inside useEffect
  // }, [id]); // Add id as a dependency to useEffect
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log("Fetching student details for ID:", id); // Debugging log
        const response = await axios.get(`http://localhost:4000/getstudentdetailsbyroll/${id}`);
        console.log("Student details response:", response.data); // Debugging log
        setStudentDetails(response.data); // Update studentDetails with fetched data
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
  
    fetchStudent(); // Call fetchStudent function inside useEffect
  }, [id]); // Add id as a dependency to useEffect
  
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/updateStudent/${id}`, studentDetails);
      if (response.data) {
        alert("Student details updated successfully");
        history.push('/getdetails');
      } else {
        alert("Error updating student details");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Edit Student</h5>
                    <Link to="/" className="logo logo-admin mt-4">
                      <img src={logo} alt="" height="30" />
                    </Link>
                  </div>
                </div>
                <div className="card-body pt-5">
                  <div className="p-2">
                    <AvForm onValidSubmit={handleSave}>
                      <div className="mb-3">
                        <AvField
                          name="rollNo"
                          label="Roll Number"
                          type="text"
                          required
                          value={studentDetails.rollNo}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="name"
                          label="Name"
                          type="text"
                          required
                          value={studentDetails.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="branch"
                          label="Branch"
                          type="text"
                          required
                          value={studentDetails.branch}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="course"
                          label="Course"
                          type="text"
                          required
                          value={studentDetails.course}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="college"
                          label="College"
                          type="text"
                          required
                          value={studentDetails.college}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <AvRadioGroup
                          inline
                          name="status"
                          label="Status"
                          required
                          value={studentDetails.status}
                          onChange={handleChange}
                        >
                          <AvRadio label="Present" value="present" />
                          <AvRadio label="Absent" value="absent" />
                        </AvRadioGroup>
                      </div>
                      <div className="mt-4">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditStudent;
