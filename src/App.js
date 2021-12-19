import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "auth/auth";

import PostModal from "components/post/PostModal";

import {
  EditProfile,
  Explore,
  Feed,
  NotFound,
  LoginPage,
  SignUpPage,
  ProfilePage,
  PostPage,
} from "./pages/index";

const App = () => {
  let location = useLocation();
  let state = location.state;
  let modal = state?.backgroundLocation;

  return (
    <>
      <Routes location={modal || location}>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/p/:postId" element={<PostPage />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/accounts/edit/" element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/accounts/login/" element={<LoginPage />} />
        <Route path="/accounts/emailsignup/" element={<SignUpPage />} />
      </Routes>
      {modal && (
        <Routes>
          <Route path="/p/:postId" element={<PostModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;

function PrivateRoute() {
  const { authState } = useAuthContext();

  const isAuth = authState.status === "in";
  return isAuth ? <Outlet /> : <Navigate to="/accounts/login/" />;
}
