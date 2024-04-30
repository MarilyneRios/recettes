import { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation, useDeleteUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { FaEye } from "react-icons/fa"; //<FaEye />
import { FaEyeSlash } from "react-icons/fa6"; //<FaEyeSlash />

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword]= useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const [deleteUserProfile] = useDeleteUserMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
    setAvatar(userInfo.avatar);
  }, [userInfo.email, userInfo.username, userInfo.avatar]);

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

  //Supp user
  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      try {
        await deleteUserProfile(userInfo._id);
        // Vous pouvez également déconnecter l'utilisateur ici
        toast.success("Votre compte a été supprimé avec succès");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  
  const translateError = (error) => {
    if (error.includes("Invalid email or password")) {
      return "Email ou mot de passe incorrect";
    } else {
      return "Erreur inconnue";
    }
  };
  
  const handleUpdateImage = async (file) => {
    try {
      const resizedImage = await resizeImage(file);
      const base64Image = await convertToBase64(resizedImage);
      setAvatar(base64Image);
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };
  
  // mise à jour
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Le mot de passe est incorrect");
    } else {
      console.log("submit");
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          avatar,
          username,
          email,
          password,
        }).unwrap();
        console.log(res);
        //dispatch(setCredentials(res));
        dispatch(setCredentials({ ...res }));
        toast.success("Le profil est mis à jour avec succès");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h2 className="mb-3">Mise à jour du profil</h2>
      <Form onSubmit={handleSubmit}>
     
        <Form.Group controlId="avatar">
          <Form.Label className="fs-5">Avatar :</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) => handleUpdateImage(e.target.files[0])}
          />
          {avatar && (
            <img
              src={avatar}
              alt="Aperçu de l'image"
              style={{
                width: "250px",
                display: "block",
                margin: "auto",
                marginTop: "1rem",
              }}
            />
          )}
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label className="fs-5">Addresse Email :</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
        <Form.Label className="fs-5">Mot de passe</Form.Label>
        <div className="d-flex">
        <Form.Control
        type={showPassword ? "text" : "password"}
          placeholder='Entrer votre mot de passe'
          value={password}
          autoComplete='new-password'
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
              <Button variant="secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
        </div>

      </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label className="fs-5">Confirmer votre mot de passe</Form.Label>
          <div className="d-flex">
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer votre mot de passe"
            value={confirmPassword}
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
                <Button variant="secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
  
          {confirmPasswordError && (
            <div className="alert alert-danger">{confirmPasswordError}</div>
          )}
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3 w-100">
          Mettre à jour
        </Button>

      <div className="mt-3">
        <Button variant="danger" onClick={handleDelete} >
          Supprimer le compte
        </Button>
      </div>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
