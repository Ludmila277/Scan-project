import { useRef } from "react";
import "./WhyUs.css";
import why_us_large_picture from "../../../assets/why_us_large_picture.svg";
import why_us_icon_magnifier from "../../../assets/why_us_icon_magnifier.svg";
import why_us_icon_shield from "../../../assets/why_us_icon_shield.svg";
import why_us_icon_watch from "../../../assets/why_us_icon_watch.svg";
import arrow_right_icon_why_us_carousel from "../../../assets/arrow_right_icon_why_us_carousel.svg";

interface CarouselItem {
  icon: string;
  description: string;
}

const WhyUs = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = (): void => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= window.innerWidth / 3;
    }
  };

  const scrollRight = (): void => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += window.innerWidth / 3;
    }
  };

  const carouselItems: CarouselItem[] = [
    {
      icon: why_us_icon_shield,
      description:
        "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
    {
      icon: why_us_icon_watch,
      description: "Высокая и оперативная скорость обработки заявки",
    },
    {
      icon: why_us_icon_magnifier,
      description:
        "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    },
    {
      icon: why_us_icon_shield,
      description:
        "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
    {
      icon: why_us_icon_watch,
      description: "Высокая и оперативная скорость обработки заявки",
    },
  ];

  return (
    <div className="whyUs-block">
      <h2>Почему именно мы</h2>

      <div className="carousel">
        <div className="carousel-arrow left-arrow" onClick={scrollLeft}>
          <img
            src={arrow_right_icon_why_us_carousel}
            alt="arrow"
            role="button"
          />
        </div>

        <div className="carousel-content" ref={carouselRef}>
          {carouselItems.map((item, index) => (
            <div key={index} className="carousel-item">
              <img className="why_us_icon" src={item.icon} alt="icon" />
              <p>{item.description.split("<br />").join("\n")}</p>
            </div>
          ))}
        </div>

        <div className="carousel-arrow right-arrow" onClick={scrollRight}>
          <img
            src={arrow_right_icon_why_us_carousel}
            alt="arrow"
            role="button"
          />
        </div>
      </div>

      <div className="why-us-image-container">
        <img
          className="why-us-large-image"
          src={why_us_large_picture}
          alt="Why us Scan image"
        />
      </div>
    </div>
  );
};

export default WhyUs;
