import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { RxCross1 } from "react-icons/rx";
import { useAddRecipeMutation } from "../slices/recipesApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Flag from "../components/Flag";

const CreateRecipeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("createRecipe userInfo" + JSON.stringify(userInfo, null, 2));
  const [recipe, setRecipe] = useState({
    name: "",
    country: "",
    category: "",
    regime: "",
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
  //flags
 

  const navigate = useNavigate();

  const [createRecipe, { isLoading }] = useAddRecipeMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };


  
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
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
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

  //ajout ingrédient
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

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting recipe:", recipe);
    try {
      const result = await createRecipe(recipe).unwrap();
      //console.log("Recipe created successfully:", result);
      toast.success("Recette créée avec succès.");
      navigate(-1);
    } catch (error) {
      // console.error("Error creating recipe:", error);
      toast.error("Erreur lors de la création de la recette.");
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Créer une recette</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Nom de la recette :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="name"
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
        <Form.Group className="my-2" controlId="regime">
          <Form.Label>Régime : </Form.Label>
          <Form.Control
            as="select"
            className="form-control input-lg"
            aria-label="Default select example"
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
          {recipe &&
            recipe.ingredients &&
            recipe.ingredients.map((ingredient, index) => (
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
          {/* Bouton pour ajouter un ingrédient */}
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
            onChange={handleChange}
            placeholder="0"
            min="0"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="comments">
          <Form.Label>Les bienfaits de la recette :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="comments"
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
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            placeholder="Importer le lien url de votre image"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3 w-100">
          Enregistrer la recette
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default CreateRecipeScreen;
