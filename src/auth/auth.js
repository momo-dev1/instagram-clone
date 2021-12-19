import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";
import profileAvt from "assets/images/default-user.jpg";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

import { useNavigate } from "react-router-dom";
import { auth, db } from "firebase/config";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [authState, setAuthState] = useLocalStorage("auth", {
    status: "out",
    userId: "",
  });

  const [error, setError] = useState({
    emailError: "",
    usernameError: "",
    signError: "",
  });
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const getUsers = () => {
      const ref = collection(db, "users");
      onSnapshot(ref, (snapshot) => {
        setUsernames(snapshot.docs.map((doc) => doc.data().username));
      });
    };
    getUsers();
  }, []);

  const registerUserWithEmailAndPassword = async (formData) => {
    try {
      if (usernames.includes(formData.username)) {
        setError({ usernameError: "username already exists" });
      } else {
        await addDoc(collection(db, "users"), {
          username: formData.username.toLowerCase(),
        });
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        if (user) {
          await createUser({
            variables: {
              userId: user.uid,
              name: formData.fullname,
              userName: formData.username,
              email: user.email,
              bio: "",
              website: "",
              profileImage: profileAvt,
              phoneNumber: "",
            },
          });
        }

        navigate("/accounts/login");
      }
    } catch (err) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setError({ emailError: "that email address is already in use" });
      }
    }
  };

  const signIn = async (formFields) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formFields.email,
        formFields.password
      );

      if (user) {
        setAuthState({ status: "in", userId: user.user.uid });
        navigate("/");
      }
    } catch (err) {
      setError({ signError: "Invalid email or password" });
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("auth");
    navigate("/accounts/login/");
  };

  return (
    <AuthContext.Provider
      value={{
        registerUserWithEmailAndPassword,
        logout,
        authState,
        error,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext };
