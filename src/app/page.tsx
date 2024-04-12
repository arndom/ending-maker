"use client" // had to because of onClick

import * as React from 'react';

import AppButton from "@/components/button";
import AppInput from "@/components/input";
import Logo from "@/components/logo";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { Ending } from '@/utils';
import axios from 'axios';
import Progress from '@/components/progress';

export default function Home() {
  const [selected, setSelected] = React.useState<null | number>(null);
  const sliderRef = React.useRef<Slider | null>(null);
  const [input, setInput] = React.useState("");
  const [inputError, setInpuError] =React. useState('');
  const [data, setData] = React.useState<Ending[]>([]);
  const [loading, setLoading] = React.useState(false);

  const isError = inputError.replace(/\s/g, '').length !== 0;

  const handleOpen = (index: number) => {
    setSelected(index)
  };

  const handleClose = () => {
    setSelected(null);
  }

  const sliderSettings = {
    centerMode: true,
    centerPadding: "0px",
    dots: true,
    arrrows: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500, // animation speed
    variableWidth: true,
    adaptiveHeight: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    afterChange: () => handleClose(),
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  const changeSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(String(e.target.value))
  }

  const handleInputSubmit = async () => {
    setInpuError('');
    setData([]);
    setLoading(true);

    await axios
    .post(`/api/gen`, { prompt: input.trimEnd() })
    .then((res) => {
      console.log(res.data)
      if (Array.from(res.data).length === 5) {
        setData(res.data);
      } else {
        setInpuError('Sorry, something went wrong');
      }

      setLoading(false);
    })
    .catch((error) => {
      console.log('failed to fetch');
      console.log(error);
      setInpuError('Sorry, an error occured, check console');
      setLoading(false);
    });
  }

  React.useEffect(() => {
    const scrollIntoView = () => {
      const target = document.getElementById("generated");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }

    if (data.length === 5) {
      scrollIntoView();
    }
  }, [data.length])

  return (
    <main className="min-h-screen m-auto px-8 pb-8">
      <div className="navbar fixed top-2 left-2 w-full p-4 z-10">
        <Logo />
      </div>

      <div className="footer fixed bottom-2 right-2  w-full p-4 z-10">
        <div className='flex gap-4 justify-end text-pink-500 font-bold cursor-pointer'>
          <a href='https://developers.cloudflare.com/workers-ai/' target='__blank'>Cloudfare 💫</a>
          <a href='https://github.com/arndom/ending-maker' target='__blank'>Github 🌟</a>
        </div>
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

        <div className="flex items-start justify-center flex-wrap gap-4">
          <div className='flex flex-col items-center'>
            <AppInput
              placeholder="Game of Thrones"
              value={input}
              onChange={handleInputChange}
            />

            {isError && (
              <p className='text-red-600 text-sm mt-2'>
                {inputError}
              </p>
            )}
          </div>

          {!loading && (
            <AppButton
              disabled={input.replace(/\s/g, "").length === 0}
              onClick={handleInputSubmit}
            >
              Generate
            </AppButton>
          )}

          {loading && <Progress />}
        </div>
      </section>

      {Boolean(data.length) && (
        <section
          id="generated"
          className="flex items-center justify-center overflow-hidden -mx-8"
        >
          <div className="min-w-0">
            <Slider {...sliderSettings} ref={sliderRef}>
              {data.map((item, ind) => {
                const isSelected = ind === selected;

                return (
                  <div
                    key={ind}
                    className="!flex flex-col items-center mx-6 py-5 lg:py-10 cursor-pointer mapped-slide"
                    onClick={() => changeSlide(ind)}
                  >
                    <Image
                      src={item.image}
                      alt="ses"
                      width={0}
                      height={0}
                      className="bg-purple-500 w-[400px] h-[300px] rounded-2xl object-cover object-top"
                    />

                    <div
                      className={`bg-white w-[350px] h-[${
                        isSelected ? "300px" : "175px"
                      }] px-10 py-12 rounded-2xl -mt-[88px] shadow-[0_10px_10px_0px_rgba(0,0,0,0.1)] overflow-y-auto`}
                    >
                      <p className="text-sm mb-1 font-semibold text-slate-500 capitalize">
                        {input}
                      </p>
                      <p className="text-2xl font-semibold mb-4 capitalize">
                        {item.title}
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
                          <p>{item.content}</p>

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
      )}
    </main>
  );
}
