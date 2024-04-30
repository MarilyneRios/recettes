
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

const FormContainerRecipe = ({ children }) => {
  return (
    <Container className="my-5 mx-auto">
          <Row className='justify-content-md-center'>
        <Col xs={12} md={12} className=''>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainerRecipe;
