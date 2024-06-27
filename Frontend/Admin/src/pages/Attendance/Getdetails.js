import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Table,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const GetDetails = () => {
  const [singlebtn, setSinglebtn] = useState(false);
  const [singlebtn1, setSinglebtn1] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/getstudentdetails');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      fetchData();
    } else {
      try {
        const response = await fetch(`http://localhost:4000/getstudentbyroll/${search}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const result = await response.json();
        setData([result]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const response = await fetch('http://localhost:4000/deletestudent/'+id)
    // .then(alert(id+" deleted"))
    // eslint-disable-next-line no-restricted-globals
    location.reload()
    
  };

  const handleEditClick = (roll) => {
    history.push(`/editstudent/${roll}`);
    
  };

  const filteredData = data.filter(item => {
    const matchesCourse = courseFilter === 'all' || item.course === courseFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesCourse && matchesStatus;
  });

  return (
    <div style={{ width: "100%", backgroundColor: "white" }}>
      <div style={{ width: "100%", height: 100, backgroundColor: "darkblue" }}>
        <div style={{ width: 700, height: 100, float: "left" }}>
          <form className="p-3" onSubmit={handleSearchClick}>
            <div className="form-group m-0">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Roll Number"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-success" type="submit">
                    <i className="mdi mdi-magnify" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div style={{ width: 100, height: 50, float: "left" }}> </div>
        <div style={{ width: 100, height: 50, float: "left", padding: 15 }}>
          <Button
            color="success"
            className="btn btn-secondary waves-effect"
            style={{ width: 150 }}
            onClick={() => history.push("/AddStudent")}
          >
            Add Student
          </Button>
        </div>
        <div style={{ width: 100, height: 50, float: "left" }}> </div>

        <div style={{ width: 100, height: 50, float: "left", padding: 15 }}>
          <Dropdown isOpen={singlebtn} toggle={() => setSinglebtn(!singlebtn)}>
            <DropdownToggle className="btn btn-success" caret>
              Courses <i className="mdi mdi-chevron-down" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setCourseFilter('all')}>All</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('FullStack Development')}>FullStack Development</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('AWS Devops')}>AWS Devops</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('Azure Devops')}>Azure Devops</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('Pega')}>Pega</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('Salesforce')}>Salesforce</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('AIML')}>AIML</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('Gaming')}>Gaming</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('UI/UX')}>UI/UX</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('VLSI')}>VLSI</DropdownItem>
              <DropdownItem onClick={() => setCourseFilter('Flutter')}>Flutter</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div style={{ width: 100, height: 50, float: "left", padding: 15 }}>
          <Dropdown isOpen={singlebtn1} toggle={() => setSinglebtn1(!singlebtn1)}>
            <DropdownToggle className="btn btn-success" caret>
              Count <i className="mdi mdi-chevron-down" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setStatusFilter('Present')}>Presentees</DropdownItem>
              <DropdownItem onClick={() => setStatusFilter('Absent')}>Absentees</DropdownItem>
              <DropdownItem onClick={() => setStatusFilter('all')}>All Students</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="table-responsive">
        <Table className="table table-striped mb-0" style={{ margin: "auto", width: "65%", textAlign: "center" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Course</th>
              <th>Todays Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.rollNo}</td>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.status}</td>
                <td>
                  <button type="button" className="btn btn-primary" style={{ color: "white" }} onClick={() => handleEditClick(item.rollNo)}>Edit</button>
                  <button type="button" className="btn btn-danger" style={{ color: "white", marginLeft: "10px" }} onClick={() => handleDelete(item.rollNo)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GetDetails;