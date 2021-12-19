const EditSideTabs = () => {
  const tabs = [
    "Edit Profile",
    "Change Password",
    "Apps and Websites",
    "Email and SMS",
    "Push Notifications",
    "Manage Contacts",
    "Privacy and Security",
    "Login Activity",
    "Emails from Instagram",
  ];

  return (
    <div className="hidden md:col-span-1 md:block">
      <div className="px-4 sm:px-0">
        <ul className="flex flex-col text-lg font-medium leading-6 text-gray-900 ">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`${
                index === 0
                  ? "border-l-4 border-gray-primary font-bold bg-gray-100 "
                  : ""
              } px-8 py-4 `}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditSideTabs;
