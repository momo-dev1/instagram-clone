import { getStories } from "data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeedStories = () => {
  const settings = {
    infinite: true,
    arrows: false,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div>
      <h3 className="mb-2 font-semibold text-gray-600">Stories</h3>
      <Slider {...settings}>
        {getStories.map((story) => (
          <SingleStory key={story} {...story} />
        ))}
      </Slider>
    </div>
  );
};

export default FeedStories;

function SingleStory({ img, name }) {
  return (
    <div className="mb-3 text-center">
      <li className="flex flex-col items-center flex-shrink-0 gap-2">
        <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
          <div className="p-1 bg-white rounded-full ">
            <img
              className="object-cover w-10 h-10 rounded-full md:w-16 md:h-16 sm:w-12 sm:h-12"
              src={img}
              alt={`${name}Img`}
            />
          </div>
        </div>
        <h4 className="text-sm ">{name}</h4>
      </li>
    </div>
  );
}
