import { GridIcon, SaveIcon, TagIcon, TvIcon } from "assets/icons";

const ProfileTabs = ({ isOwner = false, setTabIndex, tabIndex }) => {
  function activeIndex(index) {
    setTabIndex(index);
  }
  return (
    <ul className="flex items-center justify-around text-xs font-semibold tracking-widest text-gray-600 uppercase border-t md:justify-center xs:space-x-12 md:text-base">
      <li
        onClick={() => activeIndex(0)}
        className={`${
          tabIndex === 0 ? "md:border-t opacity-100 md:border-gray-700 " : ""
        }  opacity-50 ${
          !isOwner ? "" : "md:-mt-2"
        } text-gray-700 flex flex-col p-3 gap-1 items-center cursor-pointer  md:flex-row `}
      >
        <span
          className={`${
            tabIndex === 0 ? "text-blue-medium md:text-gray-700" : ""
          } fas fa-th-large text-xl md:text-xs`}
        >
          <GridIcon />
        </span>
        <span className="hidden uppercase md:inline">posts</span>
      </li>
      {isOwner && (
        <>
          <li
            onClick={() => activeIndex(1)}
            className={`${
              tabIndex === 1
                ? "md:border-t opacity-100 md:border-gray-700 "
                : ""
            } opacity-50 md:-mt-2 text-gray-700  flex flex-col p-3 gap-1 items-center md:flex-row cursor-pointer`}
          >
            <span
              className={`${
                tabIndex === 1 ? "text-blue-medium md:text-gray-700" : ""
              } fas fa-th-large text-xl md:text-xs`}
            >
              <SaveIcon />
            </span>
            <span className="hidden uppercase md:inline">saved</span>
          </li>

          <li className="flex flex-col items-center gap-1 p-3 text-gray-700 opacity-50 cursor-not-allowed md:-mt-2 md:flex-row">
            <span className="text-xl fas fa-th-large md:text-xs">
              <TvIcon />
            </span>
            <span className="hidden text-gray-700 uppercase md:inline">
              igtv
            </span>
          </li>

          <li className="flex flex-col items-center gap-1 p-3 text-gray-700 opacity-50 cursor-not-allowed md:-mt-2 md:flex-row">
            <span className="text-xl fas fa-th-large md:text-xs">
              <TagIcon />
            </span>
            <span className="hidden uppercase md:inline">tagged</span>
          </li>
        </>
      )}
    </ul>
  );
};

export default ProfileTabs;
