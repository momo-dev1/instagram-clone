import FollowSuggestionsItem from "./FollowSuggestionsItem";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@apollo/client";
import { SUGGEST_USERS } from "graphql/queries";
import { useUserContext } from "auth/userContext";
import { LoadingLargeIcon } from "assets/icons";

const FollowSuggestions = () => {
  const { followerIds, currentUserData } = useUserContext();
  const { data, loading } = useQuery(SUGGEST_USERS, {
    variables: {
      limit: 10,
      followerIds,
      createdAt: currentUserData?.created_at
        ? currentUserData?.created_at
        : null,
    },
  });
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-8 ">
      <h2 className="text-base font-semibold leading-4 text-gray-600">
        Suggestions For You
      </h2>
      <div className="mt-4">
        {loading ? (
          <LoadingLargeIcon />
        ) : (
          <Slider {...settings}>
            {data?.users.map((user) => (
              <FollowSuggestionsItem key={user.id} {...user} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default FollowSuggestions;
