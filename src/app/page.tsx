"use client" // had to because of onClick

import AppButton from "@/components/button";
import AppInput from "@/components/input";
import Logo from "@/components/logo";

export default function Home() {
  const scrollIntoView = () => {
    const target = document.getElementById("generated");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen m-auto px-8">
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

        <div className="flex items-center gap-4">
          <AppInput placeholder="Game of Thrones S8..." />
          <AppButton onClick={scrollIntoView}>Generate</AppButton>
        </div>
      </section>

      <section
        id="generated"
        // className="flex flex-col items-center justify-center"
      >
        <div className="flex">
          {Array.from({ length: 6 })
            .fill(0)
            .map((item, ind) => (
              <div key={ind} className="flex flex-col items-center">
                <div className="bg-purple-500 w-[400px] h-[300px] rounded-2xl" />

                <div className="bg-white w-[350px] h-[175px] px-10 py-12 rounded-2xl -mt-[88px] shadow-2xl">
                  <p className="text-sm mb-1 font-semibold text-slate-500">
                    Game of Thrones S8
                  </p>
                  <p className="text-2xl font-semibold mb-4 capitalize">
                    Path to destruction
                  </p>
                  <button
                    type="button"
                    className="cursor-pointer transition duration-300 p-1 rounded-md text-violet-500 hover:bg-violet-50 active:bg-violet-200 active:scale-[0.99"
                  >
                    Read more
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
