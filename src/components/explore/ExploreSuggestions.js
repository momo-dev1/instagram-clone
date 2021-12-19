import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ExploreSuggestionsItem from "./ExploreSuggestionsItem";

import { useQuery } from "@apollo/client";
import { SUGGEST_USERS } from "graphql/queries";
import { useUserContext } from "auth/userContext";
import LoadingScreen from "components/shared/LoadingScreen";

const ExploreSuggestions = () => {
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
    ],
  };

  return (
    <div className="mb-8 ">
      <h2 className="ml-3 text-base font-semibold leading-4 text-gray-600">
        Discover People
      </h2>
      <div className="mt-4">
        {loading ? (
          <LoadingScreen />
        ) : (
          <Slider {...settings}>
            {data?.users.map((user) => (
              <ExploreSuggestionsItem key={user.id} {...user} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ExploreSuggestions;
