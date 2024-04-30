import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormContainerRecipe from "../components/FormContainerRecipe";
import { Card, Button,  ListGroup } from "react-bootstrap";
import bookImage from "../assets/book.png";
import { useViewRecipeAuthQuery } from "../slices/recipesApiSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loader from "../components/Loader";

import { useParams } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { TbTrashX } from "react-icons/tb";
import Flag from "../components/Flag";
import { useDeleteRecipeMutation } from "../slices/recipesApiSlice";
import BackButton from "../components/BackButton";

function ReadRecipe() {
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo de ReadRecipe :" + userInfo);

  const [liked, setLiked] = useState(false);
  const [recipe, setRecipe] = useState({
    id: id,
    name: "",
    country:"",
    category: "",
    regime:"",
    ingredients: [],
    instructions: "",
    makingTime: 0,
    cookingTime: 0,
    comments: "",
    pseudo: "",
    imageUrl: "",
  });

   //afficher la recette
  const { data, isError, isLoading, isSuccess, refetch } = useViewRecipeAuthQuery(id);
  console.log(data);

  useEffect(() => {
    if (data) {
      setRecipe({
        ...recipe,
        name: data.name,
        country: data.country,
        category: data.category,
        regime: data.regime,
        ingredients: data.ingredients,
        instructions: data.instructions,
        makingTime: data.makingTime,
        cookingTime: data.cookingTime,
        comments: data.comments,
        pseudo: data.pseudo,
        imageUrl: data.imageUrl,
      });
      refetch();
    }
  }, [data,refetch]);

  //like btn logique
  const toggleLike = () => {
    setLiked(!liked);
  };

  //effacer la recette

  const [deleteRecipe] = useDeleteRecipeMutation();

  const navigate = useNavigate();

  const handleDeleteRecipe = () => {

    deleteRecipe(recipe.id)
      .then((response) => {
        console.log("Recipe deletion response:", response);
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
      navigate(-1);
  };

  //modifier la recette
  const handleUpdate = async (e) => {
    e.preventDefault();
    navigate(`/oneRecipeAuth/${recipe.id}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <h3>Something went wrong...</h3>}
      {isSuccess && (
        <FormContainerRecipe className="d-flex align-items-center">
  
          <Card className="w-100 d-flex flex-column flex-md-row align-items-center">
            <BackButton/>
          <Card.Img
              variant="right"
              src={recipe.imageUrl || bookImage}
              style={{ maxWidth: "20rem", boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3)",marginLeft:"5rem", marginTop: "3.5rem",}}
              className="rounded  order-0 order-md-1 "
            />
        
            <Card.Body className="flex-grow-1 text-right order-0 order-md-1">
            
              <Button
                variant="outline-white"
                onClick={toggleLike}
                className="mx-2 mt-2 border border-white rounded-circle"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderColor: "white",
                }}
              >
                {liked ? (
                  <FaHeart size={30} color="red" />
                ) : (
                  <FaRegHeart size={30} color="black" />
                )}
              </Button>
                <div className="d-flex  justify-content-center align-items-center my-3">
                {recipe.country && <Flag country={recipe.country} />}
                 <Card.Title className="text-center fs-3 mx-3 mt-3"><strong> {recipe.name}</strong></Card.Title>
                </div>

              <Card.Text className="text-center fs-5">
              {recipe.category}
              </Card.Text>
              <Card.Text className="text-center fs-5">
              {recipe.regime}
              </Card.Text>
              <Card.Text className="text-center fs-5">
              <em>Ingrédients : </em> 
              </Card.Text>
              <ListGroup variant="flush" className="text-center">

                {recipe.ingredients
                  ? recipe.ingredients.map((ingredient, index) => (
                      <ListGroup.Item key={index} style={{ border: "none" }}>
                       - {ingredient}
                      </ListGroup.Item>
                    ))
                  : ""}
              </ListGroup>
              <Card.Text className="text-center fs-5">
              <em>Préparation : </em> 
              </Card.Text>
              <Card.Text className="text-center">
                {recipe.instructions}
              </Card.Text>
              <Card.Text className="text-center fs-6">
                <span className="mx-2"><strong>Temps de préparation : </strong>{recipe.makingTime} min </span> <span className="mx-2"><strong>Temps de cuisson :  </strong> {recipe.cookingTime} min</span>
              </Card.Text>

              <Card.Text className="text-center fs-5">
              <em>Bienfaits : </em> 
              </Card.Text>
              <Card.Text className="text-center">
                {recipe.comments}
              </Card.Text>
              <Card.Text className="text-center fs-5">
                Auteur : {recipe.pseudo || "inconnu"}
              </Card.Text>
  
              {userInfo && userInfo.username === recipe.pseudo && (
                <div className="d-flex  justify-content-center align-items-center">
                  <Button
                    onClick={handleUpdate}
                    className="btn btn-primary w-75 mx-2 my-2 fs-5"
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={handleDeleteRecipe}
                    className="btn btn-danger rounded w-10 mx-2 my-2"
                  >
                    <TbTrashX size={25}/>
                  </Button>
                </div>
              )}
            </Card.Body>
            </Card>
        </FormContainerRecipe>
      )}
    </>
  );
  
}
export default ReadRecipe;
