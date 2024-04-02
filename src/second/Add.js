import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchProductsFromFile,
  addTasktoserver,
  deleteProductFromList,
  addProductToList,
} from "../productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Table } from "react-bootstrap";
import { Row, Col, Container } from "react-bootstrap";

const Add = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  useSelector((state) => console.log(state, "state"));
  const products = useSelector((state) => state.products.data);

  const navi = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsFromFile(products));
    dispatch(fetchProductsFromFile());
    setName("");
    setPrice("");
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      dispatch(fetchProductsFromFile());
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = (productName) => {
    dispatch(deleteProductFromList(productName));
  };

  const handleUpdateClick = (productName) => {
    navi(`/update/${productName}`);
  };

  const back = () => {
    navi("/");
  };

  return (
    <div>
      <Container>
        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "20vh" }}
        >
          <Col lg={3}>
            <h3 className="my-4 text-secondary">Product Form</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-1">
                <Form.Label className="my-4 label">Product Name </Form.Label>
                <Form.Control
                  className="control"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="my-4 label">Product Price </Form.Label>
                <Form.Control
                  className="control"
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <br />
              <Button
                variant="secondary"
                className="my-3"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "30vh" }}
        >
          <Col>
            <Table striped hover bordered variant="light">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <Link to={`/update/${product.name}`}>
                        <Button
                          variant="secondary"
                          onClick={() => handleUpdateClick(product.name)}
                        >
                          Update
                        </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        className="mx-3"
                        onClick={() => handleDelete(product.name)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button variant="secondary" onClick={back}>
              Add Products
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Add;
