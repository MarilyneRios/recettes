import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center" >
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75" style={{backgroundColor: '#f8f9fa'}}>
          <h1 className="text-center mb-4">Mon cahier de recettes</h1>
          <p className="text-center mb-4">
            Voici un site de partage de recettes tel que le faisaient nos mères
            et nos grands-mères.
            <br></br>
            <br></br>
            Après une inscription avec votre adresse e-mail, vous avez accès à
            toutes les recettes stockées sur le site, avec la possibilité
            d&apos;en ajouter aussi.
            <br></br>
            <br></br>
            Vous avez également la possibilité de placer vos recettes favorites
            dans &quot;Mes favoris&quot;, afin de constituer votre propre cahier
            de recettes virtuel.
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Se Connecter
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">s&apos;inscrire</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
