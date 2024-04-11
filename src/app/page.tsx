"use client" // had to because of onClick

import * as React from 'react';

import AppButton from "@/components/button";
import AppInput from "@/components/input";
import Logo from "@/components/logo";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [selected, setSelected] = React.useState<null | number>(null);
  const [open, setOpen] = React.useState(false);
  const sliderRef = React.useRef<Slider | null>(null);

  const handleOpen = (index: number) => {
    setOpen(true)
    setSelected(index)
  };

  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  }

  const sliderSettings = {
    centerMode: true,
    centerPadding: "0px",
    dots: true,
    arrrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500, // animation speed
    variableWidth: true,
    adaptiveHeight: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    pauseOnHover: true,
    afterChange: () => handleClose(),
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const scrollIntoView = () => {
    const target = document.getElementById("generated");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }

  const changeSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  }

  return (
    <main className="min-h-screen m-auto px-8 pb-8">
      <div className="navbar fixed top-2 left-2 w-full p-4 z-10">
        <Logo />
      </div>

      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="max-w-5xl font-extrabold text-xl sm:text-5xl lg:text-6xl text-center w-[100%] lg:[w-75%]">
          <span className="-mb-1 lg:-mb-4 block uppercase bold text-base lg:text-lg opacity-45">
            Ending Maker
          </span>

          <span className="leading-normal block">
            Rewrite the{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  bg-clip-text text-transparent">
              endings{" "}
            </span>
            of your
          </span>

          <span className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  bg-clip-text text-transparent">
            favourite TV Shows & Movies
          </span>
        </h1>

        <div className="flex items-center justify-center flex-wrap gap-4">
          <AppInput placeholder="Game of Thrones S8..." />
          <AppButton onClick={scrollIntoView}>Generate</AppButton>
        </div>
      </section>

      <section
        id="generated"
        className="flex items-center justify-center overflow-hidden -mx-8"
      >
        <div className="min-w-0">
          <Slider
              {...sliderSettings}
            ref={sliderRef}
          >
            {Array.from({ length: 5 })
              .fill(0)
              .map((item, ind) => {
                const isSelected = ind === selected;

                return (
                  <div
                    key={ind}
                    className="!flex flex-col items-center mx-6 py-10 cursor-pointer"
                    onClick={() => changeSlide(ind)}
                  >
                    <div className="bg-purple-500 w-[400px] h-[300px] rounded-2xl" />

                    <div
                      className={`bg-white w-[350px] h-[${
                        isSelected ? "300px" : "175px"
                      }] px-10 py-12 rounded-2xl -mt-[88px] shadow-[0_10px_10px_0px_rgba(0,0,0,0.1)] overflow-y-auto`}
                    >
                      <p className="text-sm mb-1 font-semibold text-slate-500">
                        Game of Thrones S{ind}
                      </p>
                      <p className="text-2xl font-semibold mb-4 capitalize">
                        Path to destruction
                      </p>
                      {!isSelected && (
                        <button
                          type="button"
                          onClick={() => handleOpen(ind)}
                          className="cursor-pointer transition duration-300 p-1 rounded-md text-violet-500 hover:bg-violet-50 active:bg-violet-200 active:scale-[0.99"
                        >
                          More
                        </button>
                      )}

                      {isSelected && (
                        <div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Reprehenderit eveniet possimus reiciendis
                            perferendis? Quibusdam nulla exercitationem amet
                            nisi, labore, consequuntur vel ducimus, perferendis
                            in ipsum pariatur fugit sapiente repellendus eius!
                          </p>

                          <button
                            type="button"
                            onClick={handleClose}
                            className="mt-4 cursor-pointer transition duration-300 p-1 rounded-md text-violet-500 hover:bg-violet-50 active:bg-violet-200 active:scale-[0.99"
                          >
                            Less
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </section>
    </main>
  );
}
