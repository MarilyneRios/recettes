import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      unique: true,
      // Générer un token par défaut lors de la création de l'utilisateur
      default: function () {
        return uid2(32);
      },
    },
    savedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  // La date et l’heure de création ou modication du document
  // Mongoose ajoute automatiquement les champs createdAt et updatedAt
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
