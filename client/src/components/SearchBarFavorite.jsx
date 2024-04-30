// SearchBarFavorite.jsx
import { Navbar, Form, Button, Row, Col } from 'react-bootstrap';
import { useSearchContext } from "../contexts/SearchContext";
import { FaHeart } from "react-icons/fa";

const SearchBarFavorite = () => {
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
            <Row className="justify-content-center align-items-center">
                <Col xs={10} sm={8} md={6} lg={4} className="mx-3 mt-2 text-white text-center"> 
                <h5 className=''>Mes recettes favorites <FaHeart size={25} color="red" className='mx-1' /></h5>
                </Col>
                
                    <Col xs={10} sm={8} md={6} lg={4} className="mx-1 mb-2"> 
                        <Form.Control
                            type="text"
                            placeholder="Rechercher par nom ou auteur"
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

export default SearchBarFavorite;
