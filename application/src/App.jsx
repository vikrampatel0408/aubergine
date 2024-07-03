import { useState } from 'react'
import './App.css';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [code,setCode] = useState('');
  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/`);
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching  ", error);
      }
    };
    fetchdetails();
    
  }, []);

  const handletextChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setSearch(value);
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    const fetchdetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/?search=${search}`);
        console.log(response.data);
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching songs: ", error);
      }
    };
    fetchdetails();
  }
  const handleCode = async (e)=>{
    setCode(e.target.value);
    console.log(e.target.value);
  }
  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/search?search=${search}&code=${code}`);
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching  ", error);
      }
    };
    fetchdetails();
  }, [code]);

  return (
    <>

      <Navbar className="bg-body-tertiary justify-content-between">
        <Form inline onSubmit={handleSubmitButton}>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                name="search"
                value={search}
                onChange={handletextChange}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Search</Button>
            </Col>
            <Col className='justify-content-end'>
              <select className='form-control'
              value={code}
              // value={this.state.selectValue} 
              // onChange={this.handleChange} >
              onChange={handleCode}
              >
              { items.map((item)=>(
                  <option value={item.alpha_two_code}> {item.alpha_two_code}</option>
              ))
              }
              </select>
              
            </Col>
          </Row>
        </Form>
        <Row>

        </Row>
      </Navbar>

      <Row>
        {items.map((item) => (
          <Col>
            <Card style={{ width: '18rem' }}>

              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Link href={item.web_pages[0]}>University Link</Card.Link>
              </Card.Body>
              <Button variant="secondary">Download</Button>

            </Card>
          </Col>
        ))}
      </Row>

    </>
  )
}

export default App
