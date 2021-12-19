import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import InstaLoogo from "../../assets/images/logo.png";

import {
  HomeIcon,
  HomeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  LikeIcon,
  LikeActiveIcon,
  AddIcon,
  SearchIcon,
} from "../../assets/icons";

import useClickOutside from "hooks/useClickOutside";
import NotificationList from "components/notification/NotificationList";
import NotificationTooltip from "components/notification/NotificationTooltip";

import { useLazyQuery } from "@apollo/client";
import { SEARCH_USERS } from "graphql/queries";
import { useUserContext } from "auth/userContext";
import AddPostDialog from "./AddPostDialog";
import LoadingScreen from "./LoadingScreen";
import { isAfter } from "date-fns";

const Navbar = ({ noIcons }) => {
  const { currentUserData } = useUserContext();
  const location = useLocation();
  const path = location.pathname;
  const newNoti = currentUserData?.notifications.filter(({ created_at }) =>
    isAfter(new Date(created_at), new Date(currentUserData.last_checked))
  );
  const hasNoti = newNoti?.length > 0;
  if (currentUserData === undefined) return <LoadingScreen />;
  return (
    <div className="sticky top-0 z-50 flex items-center h-16 px-4 mb-8 bg-white shadow-sm xl:px-0">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <Link className="flex-shrink-0 w-20 xs:w-auto" to="/">
          <img src={InstaLoogo} alt="instagram" />
        </Link>
        {!noIcons && (
          <>
            <SearchInput />
            <LinksIcons
              path={path}
              currentUserData={currentUserData}
              hasNoti={hasNoti}
              newNoti={newNoti}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

function LinksIcons({ path, currentUserData, hasNoti, newNoti }) {
  const [showList, setShowList] = useState(false);
  const [showTooltip, setShowTooltip] = useState(hasNoti);
  const [showPostDialog, setPostDialog] = useState(false);

  const clickRef = useRef();

  const onClickOutside = () => {
    setShowList(false);
  };
  useClickOutside(clickRef, onClickOutside);

  useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function handleToggleList() {
    if (hasNoti) setShowList((prev) => !prev);
  }
  function handleHideTooltip() {
    setShowTooltip(false);
  }
  function handleShowPostDialog() {
    setPostDialog((prev) => !prev);
  }
  if (!currentUserData) return <LoadingScreen />;
  return (
    <div className="relative flex items-center gap-2 xs:gap-4">
      {showList && (
        <div ref={clickRef} className="absolute top-8 right-10 ">
          <NotificationList notifications={currentUserData.notifications} />
        </div>
      )}

      {showPostDialog && <AddPostDialog setPostDialog={setPostDialog} />}
      <div onClick={handleShowPostDialog}>
        <AddIcon />
      </div>

      <Link to="/">{path === "/" ? <HomeActiveIcon /> : <HomeIcon />}</Link>

      <Link to="/explore">
        {path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon />}
      </Link>

      <div className="relative " onClick={handleToggleList}>
        {showList ? <LikeActiveIcon dark /> : <LikeIcon />}
        {hasNoti && (
          <div className="absolute w-1 h-1 rounded-full right-2.5  bg-red-primary -bottom-2"></div>
        )}
        {showTooltip ? (
          <div className="absolute w-full -bottom-9">
            <NotificationTooltip notifications={newNoti} />
          </div>
        ) : (
          ""
        )}
      </div>

      <Link
        to={`/${currentUserData.username}`}
        className={`rounded-full ${
          path === `/${currentUserData.username}`
            ? "p-0.5 border border-gray-primary w-8 h-8  overflow-hidden"
            : "w-7 h-7"
        }`}
      >
        <img
          className="w-full h-full rounded-full"
          src={currentUserData.profile_image}
          alt="profile pic"
        />
      </Link>
    </div>
  );
}

function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchUsers, { data: searchResult }] = useLazyQuery(SEARCH_USERS);

  const checkResults = Boolean(query) && results.length > 0;

  useEffect(() => {
    if (!query.trim()) return;
    searchUsers({ variables: { searchValue: `%${query}%` } });

    if (searchResult) {
      setResults(searchResult.users);
    }
  }, [query, searchUsers, searchResult]);

  function handleclearInput() {
    setQuery("");
  }
  return (
    <div className="relative invisible opacity-0 md:opacity-100 md:visible">
      <div className="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-medium">
        <button className="flex items-center justify-center px-2 text-gray-400 focus:outline-none">
          <SearchIcon />
        </button>
        <input
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-1 py-2 leading-tight text-gray-500 bg-gray-medium focus:outline-none "
          id="search"
          type="text"
          placeholder="Search"
        />
      </div>
      <div>
        {checkResults && (
          <>
            <div className="w-3 h-3 absolute mt-1.5  shadow-sm transform rotate-45 right-24  bg-gray-100"></div>
            <div className="absolute w-full mt-3 overflow-y-scroll bg-gray-100 rounded-sm shadow-2xl h-60">
              {results?.map((result) => (
                <div key={result.user_id} className="mt-4 mb-1 ">
                  <Link
                    onClick={handleclearInput}
                    to={`/${result.username}`}
                    className="flex items-center gap-2 px-4 py-2 transition-all duration-200 cursor-pointer hover:bg-gray-200"
                  >
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={result.profile_image}
                        alt="profile pic"
                      />
                    </div>
                    <div>
                      <p className="font-medium leading-none text-md">
                        {result.username}
                      </p>
                      <p className="mt-1 text-sm leading-none text-gray-600">
                        {result.name}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
