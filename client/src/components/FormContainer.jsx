import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

const FormContainer = ({ children }) => {
  return (
    <Container  className='mb-5 w-100' style={{ maxWidth: '100%', margin: '0 auto' }}>
      <Row className='justify-content-md-center mt-5'>
        <Col  xs={12} sm={8} md={6} lg={4}  className='card p-5 custom-bg'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;

//className='custom-bg'