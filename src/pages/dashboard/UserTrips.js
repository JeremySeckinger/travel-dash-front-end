import React, { useState } from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Card, Table, Modal } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import usertrips from '../../data/usertrips';
import PostTripForm from "../../components/Form/Form";

export default () => {
    const [currentId, setCurrentId] = useState(null);
    const [showDefault, setShowDefault] = useState(false);

    return (
        <>
            <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="mb-4 mb-lg-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item active>Users List</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>User's Trips</h4>
                    <p className="mb-0">Your trip dashboard.</p>
                </div>
                
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Button variant="primary" size="sm" onClick={() => setShowDefault(true)}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Trip
                    </Button>
                </div>
            </div>
            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={9} lg={4} className="d-flex">
                        <InputGroup className="me-2 me-lg-3">
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Search" />
                        </InputGroup>
                        <Form.Select className="w-25">
                            <option defaultChecked>All</option>
                            <option value="1">Public</option>
                            <option value="2">Private</option>
                        </Form.Select>
                    </Col>
                    <Col xs={3} lg={8} className="text-end">
                        <Dropdown as={ButtonGroup} className="me-2">
                            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm icon-gray">
                                    <FontAwesomeIcon icon={faSlidersH} />
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right">
                                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                                <Dropdown.Item className="d-flex fw-bold">
                                    10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                                </Dropdown.Item>
                                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>

            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body>
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Title</th>
                                <th className="border-bottom">Date</th>
                                <th className="border-bottom">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                        {usertrips.map(u => (
                            <tr key={u.key}>
                                <td>
                                    <Card.Link className="d-flex align-items-center">
                                        <div className="d-block">
                                            <span className="fw-bold">{u.title}</span>
                                        </div>
                                    </Card.Link>
                                </td>
                                <td><span className="fw-normal"><div className="small text-gray">{u.date}</div></span></td>
                                <td><span className="fw-normal">{u.status}</span></td>
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                </Card.Body>    
            </Card>

        <Modal as={Modal.Dialog} centered show={showDefault}> 
            <PostTripForm currentId={currentId} setCurrentId={setCurrentId} setShowDefault={setShowDefault}/>
        </Modal>
        </>
    );
};