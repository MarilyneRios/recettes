import { useState, useEffect } from "react";
import {  useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { RxCross1 } from "react-icons/rx";
import {
  useUpdateRecipeMutation,
  useOneRecipeAuthQuery,
} from "../slices/recipesApiSlice";
import { useNavigate } from 'react-router-dom';


const UpdateRecipeScreen = () => {
  const { id } = useParams();
  console.log(`id params : ${id}`)

  const { userInfo } = useSelector((state) => state.auth);

  const [recipe, setRecipe] = useState({
    name: "",
    country:"",
    category: "",
    regime:"",
    ingredients: [],
    instructions: "",
    makingTime: "",
    cookingTime: "",
    comments: "",
    pseudo: userInfo.username,
    imageUrl: "",
    userId: window.localStorage.getItem("id"),
  });
 
  const [file, setFile] = useState("");

  const [imageUrlInput, setImageUrlInput] = useState("");


  const navigate = useNavigate();
  
  const [updateRecipe, { isLoading }] = useUpdateRecipeMutation(id);

  //affiche la recette
  const {data} = useOneRecipeAuthQuery(id);

  //image 
  //upload image
  const convertToBase64 = (file) => {
    console.log("convertToBase64", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return data;
  };

 //Réduire la taille de l'image
 const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // Set the canvas dimensions to the desired size
      canvas.width = 250;
      canvas.height = 250;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, file.type);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

const handleUpdateImage = async (file) => {
  try {
    const resizedImage = await resizeImage(file);
    const base64Image = await convertToBase64(resizedImage);
    setRecipe({ ...recipe, imageUrl: base64Image });
  } catch (error) {
    console.error("Error converting image to base64:", error);
  }
};

  const handleChange = (e) => {
     setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };
  
  // Pour récupérer les datas de la recette
  useEffect(() => {
    if (data) {
      setImageUrlInput(data.imageUrl || "");

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        _id: data._id || "",
        name: data.name || "",
        category: data.category || "",
        ingredients: data.ingredients || [""],
        instructions: data.instructions || "",
        makingTime: data.makingTime || "",
        cookingTime: data.cookingTime || "",
        comments: data.comments || "",
        pseudo: data.pseudo || "",
        imageUrl: data.imageUrl || "",
      }));
    }
  }, [data]);

  //add ingrédient 1 par 1
  const handleIngredientChange = (e, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = e.target.value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
 
    //supp ingrédient
    const removeIngredient = (index) => {
      const newIngredients = [...recipe.ingredients];
      newIngredients.splice(index, 1);
      setRecipe({ ...recipe, ingredients: newIngredients });
    };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let imageUrlToUpdate = recipe.imageUrl;
      if (imageUrlInput) {
        // Si l'utilisateur a saisi une nouvelle URL, utilisez-la
        imageUrlToUpdate = imageUrlInput;
      } else if (file) {
        // Sinon, si un fichier est sélectionné, mettez à jour l'image avec le fichier
        const resizedImage = await resizeImage(file);
        const base64Image = await convertToBase64(resizedImage);
        imageUrlToUpdate = base64Image;
      }
  
      const res = await updateRecipe({
        id: recipe._id,
        name: recipe.name,
        country: recipe.country,
        category: recipe.category,
        regime: recipe.regime,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        makingTime: recipe.makingTime,
        cookingTime: recipe.cookingTime,
        comments: recipe.comments,
        pseudo: recipe.pseudo,
        imageUrl: imageUrlToUpdate,
      }).unwrap();
  
      console.log(res);
      console.log("Recipe after update: ", recipe);
      toast.success("Recette modifiée avec succès.");
      navigate(-1);
    } catch (error) {
      console.error("Error updating recipe: ", error);
      toast.error("Erreur lors de la modification de la recette.");
    }
  };
  

  return (
    <FormContainer>
      <h1 className="text-center">Modifier une recette</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Nom de la recette :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Ecrire le nom de la recette"
          ></Form.Control>
        </Form.Group>

              {/*pays */}
      <Form.Group className='my-2' controlId='country'>
        <Form.Label>Pays :</Form.Label>
        <Form.Control
       className="form-control input-lg"
            type="text"
            name="country"
            onChange={handleChange}
            placeholder="Ecrire la nationalité de la recette"
        ></Form.Control>
      </Form.Group>

        <Form.Group className="my-2" controlId="category">
          <Form.Label>Catégorie : </Form.Label>
          <Form.Control
            as="select"
            className="form-control input-lg"
            aria-label="Default select example"
            name="category"
            value={recipe.category}
            onChange={handleChange}
          >
            <option value="">Selectionner une catégorie</option>
            <option value="Apéritif">Apéritif</option>
            <option value="Entrée">Entrée</option>
            <option value="Plat">Plat</option>
            <option value="Dessert">Dessert</option>
            <option value="Boisson">Boisson</option>
          </Form.Control>
        </Form.Group>

              {/* select regime */}
      <Form.Group className='my-2' controlId='regime'>
        <Form.Label>Régime : </Form.Label>
        <Form.Control as="select"
            className="form-control input-lg"
            aria-label="Default select example"
            id="regime"
            name="regime"
            value={recipe.regime}
            onChange={handleChange}
          >
            <option value="">Selectionner une régime</option>
            <option value="équilibre">équilibré</option>
            <option value="végétarien">végétarien</option>
            <option value="végan">végan</option>
            <option value="sans gluten">sans gluten</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="ingredients">
          <Form.Label>Les ingrédients :</Form.Label>
          {/* Affichage des champs d'ingrédients avec la possibilité de supprimer */}
          {recipe && recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                className="form-control input-lg"
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder="Ecrire un ingrédient"
              />
              <Button
                className="btn-danger mx-2"
                onClick={() => removeIngredient(index)}
                type="button"
              >
                <RxCross1 />
              </Button>
            </div>
          ))}
          <Button
            className="btn-primary w-100 mx-2"
            onClick={addIngredient}
            type="button"
          >
            Ajouter un ingrédient
          </Button>
        </Form.Group>

        <Form.Group className="my-2" controlId="instructions">
          <Form.Label>La préparation :</Form.Label>
          <textarea
            className="form-control input-lg"
            type="text"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            placeholder="Ecrire les diverses étapes de la recette"
          ></textarea>
        </Form.Group>

        <Form.Group className="my-2" controlId="makingTime">
          <Form.Label>Le temps de préparation (min) :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="number"
            name="makingTime"
            value={recipe.makingTime}
            onChange={handleChange}
            placeholder="0"
            min="0"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="cookingTime">
          <Form.Label>Le temps de cuisson (min) :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="number"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            placeholder="0"
            min="0"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="comments">
          <Form.Label>Commentaires :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="comments"
            value={recipe.comments}
            onChange={handleChange}
            placeholder="Ecrire les vertues de la recette"
          ></Form.Control>
        </Form.Group>
   
        <Form.Group controlId="imageUrl">
          <Form.Label>Image de la recette :</Form.Label>
          <Form.Control
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={(e) => handleUpdateImage(e.target.files[0])}
          />
          {file && (
            <img
              src={file}
              alt="Aperçu de l'image"
              style={{
                width: "250px",
                display: "block",
                margin: "auto",
                marginTop: "1rem",
              }}
            />
          )}
          <Form.Label>ou par lien url :</Form.Label>
          <Form.Control  className="form-control input-lg"
            type="text"
            name="imageUrl"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            placeholder="Importer le lien url de votre image">
          </Form.Control>
        </Form.Group>


        <Button type="submit" variant="primary" className="mt-3 w-100">
          Modifer la recette
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default UpdateRecipeScreen;
