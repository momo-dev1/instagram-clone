import { useAuthContext } from "auth/auth";

import useClickOutside from "hooks/useClickOutside";
import { useRef } from "react";
import { Link } from "react-router-dom";

const OptionsDialog = ({ setShowDialog, isProfile = false, postId }) => {
  const { logout } = useAuthContext();
  const clickRef = useRef();

  const onClickOutside = () => {
    setShowDialog(false);
  };
  useClickOutside(clickRef, onClickOutside);
  return (
    <>
      {isProfile ? (
        <>
          <div className="fixed inset-0 z-50 h-screen bg-black opacity-30"></div>
          <div className="fixed inset-0 z-50 grid min-h-screen ">
            <div
              ref={clickRef}
              className="flex flex-col w-2/3 m-auto overflow-hidden text-lg bg-white border border-gray-200 divide-y-2 divide-gray-200 rounded-md shadow-sm md:w-500 text-gray-primary"
            >
              <Button title="Change password" />
              <Button title="Nametag" />
              <Button title="Authorized Apps" />
              <Button title="Notifications" />
              <Button title="Privacy and Security" />
              <Button title="Log Out" handleClick={logout} />
              <Button
                handleClick={() => setShowDialog(false)}
                title=" Cancel"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="fixed inset-0 z-50 h-screen bg-black opacity-30"></div>
          <div className="fixed inset-0 z-50 grid min-h-screen ">
            <div
              ref={clickRef}
              className="flex flex-col w-2/3 m-auto overflow-hidden text-lg bg-white border border-gray-200 divide-y-2 divide-gray-200 rounded-md shadow-sm md:w-500 text-gray-primary"
            >
              <Button title="Unfollow" textColorRed />
              <Link className="block text-center" to={`/p/${postId}`}>
                <Button title="Go to post" />
              </Link>
              <Button title="Share" />
              <Button title="Copy Link" />
              <Button close={() => setShowDialog(false)} title="Cancel" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OptionsDialog;

function Button({ title, textColorRed, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={`${
        textColorRed ? "text-red-primary" : ""
      } py-2 font-semibold hover:bg-gray-100`}
    >
      {title}
    </button>
  );
}
