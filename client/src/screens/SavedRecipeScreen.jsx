import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { useCategory } from "../contexts/CategoryContext";
import { useAllRecipesFavoriteQuery } from "../slices/recipesApiSlice";
import SearchBarFavorite from "../components/SearchBarFavorite";
import Loader from "../components/Loader";
import RecipeCard from "../components/RecipeCard";
import { useSearchContext } from "../contexts/SearchContext";

const SavedRecipeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const { isError, isLoading, isSuccess, data: recipes } = useAllRecipesFavoriteQuery();

  const { selectedCategory } = useCategory();
  const { searchQuery, submittedSearchQuery, setSearchQuery } = useSearchContext();

  useEffect(() => {
    if (isSuccess) {
      let filtered = recipes;
      if (selectedCategory) {
        filtered = filtered.filter((recipe) => recipe.category === selectedCategory);
      }
      if (submittedSearchQuery) {
        const searchRegex = new RegExp(submittedSearchQuery, "i");
        filtered = filtered.filter(
          (recipe) =>
            searchRegex.test(recipe.name) ||
            searchRegex.test(recipe.pseudo) ||
            searchRegex.test(recipe.comments) ||
            searchRegex.test(recipe.category)
        );
      }
      setFilteredRecipes(filtered);
    }
  }, [selectedCategory, submittedSearchQuery, isSuccess,recipes]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <h3>Quelque chose ne va pas ...</h3>}
      {isSuccess && (
        <Container className="w-75">
          
        <SearchBarFavorite searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Row>
            {filteredRecipes &&
              filteredRecipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} index={index} />
              ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default SavedRecipeScreen;
