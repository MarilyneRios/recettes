import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiUserAddOutline } from "react-icons/ti";
import { BsBookmarkPlus } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useCategory } from "../contexts/CategoryContext";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { setSelectedCategory } = useCategory();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Filtre frontend
  const handleCategorySelect = (category) => {
    // "Toutes"=> réinitialisez l'affichage de toutes les recettes
    if (category === "Toutes") {
      setSelectedCategory(null);
    } else {
      console.log("avant setSelectedCategory : " + category);
      setSelectedCategory(category);
      console.log("après setSelectedCategory : " + category);
    }
  };

  //Déconnexion
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fs-4">Mon cahier de recettes</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto  d-flex align-items-center justify-content-center">
              {userInfo ? (
                <>
                  <LinkContainer to="/createRecipe">
                    <Navbar.Brand className="mx-2 fs-5">
                      <GoPlusCircle /> Ajouter une recette
                    </Navbar.Brand>
                  </LinkContainer>

                  <LinkContainer to="/allRecipesFavorite">
                    <Navbar.Brand className="mx-3 fs-5">
                      <BsBookmarkPlus /> Mes favoris
                    </Navbar.Brand>
                  </LinkContainer>
                  <img
                    src={userInfo.avatar}
                    id="avatar"
                    width="30"
                    className="mx-2"
                  />
                  <NavDropdown title={userInfo.username} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <CgProfile /> Profile
                      </NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt />
                      Déconnexion
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Par catégories"
                    id="category"
                    className="mx-2"
                  >
                    <NavDropdown.Item
                      onClick={() => handleCategorySelect("Toutes")}
                    >
                      Toutes
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleCategorySelect("Apéritif")}
                    >
                      Apéritif
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleCategorySelect("Entrée")}
                    >
                      Entrée
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleCategorySelect("Plat")}
                    >
                      Plat
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleCategorySelect("Dessert")}
                    >
                      Dessert
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleCategorySelect("Boissons")}
                    >
                      Boissons
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Se Connecter
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <TiUserAddOutline /> s&apos;inscrire
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
