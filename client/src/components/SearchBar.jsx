// SearchBar.jsx
import { Navbar, Form, Button, Row, Col } from 'react-bootstrap';
import { useSearchContext } from "../contexts/SearchContext";

const SearchBar = () => {
    const { searchQuery, setSearchQuery, setSubmittedSearchQuery  } = useSearchContext();   
      
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        console.log("SearchBar handleChange"+ setSearchQuery)
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Recherche effectuée avec la requête:", searchQuery);
        setSubmittedSearchQuery(searchQuery);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="rounded justify-content-center mt-3">
            <Form onSubmit={handleSearch} className="w-100">
                <Row className="justify-content-center">
                <Col xs={10} sm={8} md={6} lg={4} className="mx-3 mt-2 text-white text-center"> 
                <h5 >La liste des recettes </h5>
                </Col>
                    <Col xs={10} sm={8} md={6} lg={4} className="mx-3 mx-1"> 
                        <Form.Control
                            type="text"
                            placeholder="Rechercher  par nom ou auteur"
                            className="mx-auto mt-3 mt-sm-0"
                            value={searchQuery}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={10} sm={4} md={2} className="mx-3 my-1"> 
                        <Button type="submit" className='mx-auto d-block'>Rechercher</Button>
                    </Col>
                </Row>
            </Form>
        </Navbar>
    );
    
};

export default SearchBar;
