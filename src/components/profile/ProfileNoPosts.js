import RightImg from "assets/images/no-posts-right.png";
import GridtImg from "assets/images/no-posts-grid.png";

const ProfileNoPosts = () => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 justify-items-center place-items-center">
      <div className="order-2 md:order-none">
        <img src={GridtImg} alt="gridImg" />
      </div>
      <div className="order-1 p-4 md:order-none">
        <img src={RightImg} alt="capturing" />
      </div>
    </div>
  );
};

export default ProfileNoPosts;
