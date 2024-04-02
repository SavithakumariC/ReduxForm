import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { updateProductToList } from "../productSlice";

const UpdateProduct = () => {
  const navi = useNavigate();
  const products = useSelector((state) => state.products.data);
  const { name: paramName } = useParams();
  const existingProduct = products.find(
    (product) => product && product.name === paramName
  );

  const { name: initialName, price: intialPrice } = existingProduct || [];
  const [name, setName] = useState(initialName || "");
  const [price, setPrice] = useState(intialPrice || "");
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(
      updateProductToList({
        oldName: initialName,
        newName: name,
        price: price,
      })
    );
    navi("/");
  };

  return (
    <div>
      <Container>
        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Col lg={3}>
            <h3 className="my-4 text-secondary">Update Product Form</h3>
            <Form>
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
                onClick={handleUpdate}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateProduct;
