import { ToastContainer } from "react-toastify";

import { useQuery } from "@apollo/client";
import { GET_USER_EDIT_PROFILE } from "graphql/queries";
import { useUserContext } from "auth/userContext";

import Layout from "components/shared/Layout";
import EditSideTabs from "components/edit/EditSideTabs";
import EditUserInfo from "components/edit/EditUserInfo";
import LoadingScreen from "components/shared/LoadingScreen";

function EditProfilePage() {
  const { currentUserId } = useUserContext();
  const { data, loading } = useQuery(GET_USER_EDIT_PROFILE, {
    variables: { userId: currentUserId },
  });

  if (loading) return <LoadingScreen />;

  return (
    <Layout maxWidth="max-w-5xl" title="Edit profile">
      <div className="mx-3 border border-gray-200 shadow-sm mt-14 md:mt-20 xs:mx-6 ">
        <div className="md:grid md:grid-cols-3">
          <EditSideTabs />
          <EditUserInfo user={data.users_by_pk} />
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
}

export default EditProfilePage;
