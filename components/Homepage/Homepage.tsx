import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import featuredItems from "../../json/featuredItems.json";
import Link from "next/link";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GradientBb from "../reusable/svg/GradientBb";
import MuiSkeleton from "../Admin/Products/MuiSkeleton";

SwiperCore.use([Autoplay]);

function Homepage() {
  const router = useRouter();
  const [rvp, setRvp] = useState(undefined as any);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState(undefined as any);
  const [sliders, setSliders] = useState(undefined as any);
  const [banners, setBanners] = useState(undefined as any);

  console.log(featuredProducts);

  useEffect(() => {
    setLoading(true);
    const rvp = localStorage.getItem("rvp");
    const rvpJson = JSON.parse(rvp as string);
    setRvp(rvpJson);
    fetch("/api/Home/getfeatured")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container m-auto">
      {/* Slider Section Start */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-5">
        <div className="hidden md:grid grid-cols-1 gap-2">
          <div className="md:h-full w-full h-[160px] relative cursor-pointer overflow-hidden">
            <Image
              src={"/assets/banner/banner1.jpg"}
              alt={"Banner 1"}
              fill
              className="w-full object-cover ease-in-out duration-300 hover:scale-110"
            />
          </div>
          <div className="md:h-full w-full h-[160px] relative cursor-pointer overflow-hidden">
            <Image
              src={"/assets/banner/banner2.jpg"}
              alt={"Banner 1"}
              fill
              className="w-full object-cover ease-in-out duration-300 hover:scale-110"
            />
          </div>
        </div>
        <div className="md:col-span-2 relative hover:cursor-pointer cursor-default">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
            autoplay={{ delay: 3000 }}
            loop={true}
            speed={300}
            direction="horizontal"
            draggable={true}
          >
            <SwiperSlide>
              <img src={"/assets/Slider/1.png"} alt={"Slider Image"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"/assets/Slider/2.jpg"} alt={"Slider Image"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"/assets/Slider/3.jpg"} alt={"Slider Image"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"/assets/Slider/4.png"} alt={"Slider Image"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"/assets/Slider/5.webp"} alt={"Slider Image"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"/assets/Slider/6.webp"} alt={"Slider Image"} />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="hidden md:grid grid-cols-1 gap-2">
          <div className="md:h-full w-full h-[160px] relative cursor-pointer overflow-hidden">
            <Image
              src={"/assets/banner/banner3.jpeg"}
              alt={"Banner 1"}
              fill
              className="w-full object-cover ease-in-out duration-300 hover:scale-110"
            />
          </div>
          <div className="md:h-full w-full h-[160px] relative cursor-pointer overflow-hidden">
            <Image
              src={"/assets/banner/banner4.jpg"}
              alt={"Banner 1"}
              fill
              className="w-full object-cover ease-in-out duration-300 hover:scale-110"
            />
          </div>
        </div>
      </div>
      {/* Slider Section End */}

      {/* Featured Category */}
      <div className="w-full mt-16 px-3 md:px-0 relative">
        <div className="w-full">
          <h1 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
            Featured Category
          </h1>
          <p className="text-center text-sm mt-1 text-gray-800 dark:text-white">
            Get Your Desired Product from Featured Category!
          </p>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-8 items-center my-6 gap-[2px]">
          {featuredItems.map((item: any, index: number) => (
            <div
              onClick={() => {
                if (item.values.cg && item.values.scg && item.values.escg) {
                  router.push({
                    pathname: `/escategory/${item.values.escg
                      .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                      .toLowerCase()}`,
                    query: {
                      cg: item.values.cg,
                      scg: item.values.scg,
                      escg: item.values.escg,
                    },
                  });
                } else if (
                  item.values.cg &&
                  item.values.scg &&
                  !item.values.escg
                ) {
                  router.push({
                    pathname: `/sub-category/${item.values.scg
                      .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                      .toLowerCase()}`,
                    query: {
                      cg: item.values.cg,
                      scg: item.values.scg,
                    },
                  });
                } else {
                  router.push({
                    pathname: `/category/${item.values.cg
                      .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                      .toLowerCase()}`,
                    query: { cg: item.values.cg },
                  });
                }
              }}
              className="w-full group overflow-hidden"
              key={index}
            >
              <div className="bg-white dark:bg-gray-700 items-center hover:scale-[1.08] cursor-pointer rounded shadow-sm ease-in-out duration-200 flex flex-col p-5 overflow-hidden">
                <i
                  className={`fa-${item.style} text-gray-400 group-hover:text-sky-600 ${item.icon} text-4xl`}
                ></i>
                <h2 className="mt-2 truncate text-gray-800 group-hover:text-sky-600 dark:text-gray-200 text-sm">
                  {item.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <GradientBb />
      </div>

      {/* Featured Products */}
      <div className="w-full mt-16">
        <div className="w-full">
          <h1 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
            Featured Products
          </h1>
          <p className="text-center text-sm mt-1 text-gray-800 dark:text-white">
            Check & Get Your Desired Product!
          </p>
        </div>
        <div className="w-full mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-3 sm:px-0 gap-5 justify-center">
            {loading ? (
              <>
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
                <MuiSkeleton />
              </>
            ) : (
              <>
                {featuredProducts?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 group/main py-4 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-sky-300 hover:shadow-sky-200 relative"
                  >
                    <div className="border-b-[5px] border-b-gray-50 dark:border-b-gray-800">
                      <span
                        className={`text-xs bg-pink-600 ${
                          !item.discountPrice && "opacity-0"
                        } pr-2 text-white p-1 rounded-r-full`}
                      >
                        Save:
                        <NumericFormat
                          displayType="text"
                          className="px-1"
                          value={item.price - item.discountPrice}
                          thousandSeparator=","
                        />
                        ৳
                      </span>
                      <div className="p-3 relative w-full h-[230px] overflow-hidden my-2">
                        {item.src && (
                          <Link
                            href={{
                              pathname: `/${item.name
                                .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                                .toLowerCase()}`,
                              query: { id: item._id },
                            }}
                          >
                            <Image
                              loading="lazy"
                              src={item.src}
                              fill
                              alt={"product image"}
                              className="w-full group-hover/main:scale-105 ease-in-out duration-300 object-contain"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="px-4 pt-4">
                      <Link
                        href={{
                          pathname: `/${item.name
                            .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                            .toLowerCase()}`,
                          query: { id: item._id },
                        }}
                        className="text-sm text-ellipsis line-clamp-3 hover:underline hover:text-pink-600 dark:text-gray-100"
                      >
                        {item.name}
                      </Link>
                      <div className="pt-2 flex flex-row flex-wrap justify-start items-end">
                        <div className="flex flex-row justify-start text-sky-600 font-semibold">
                          <NumericFormat
                            displayType="text"
                            className=""
                            value={
                              item.discountPrice
                                ? item.discountPrice
                                : item.price
                            }
                            thousandSeparator=","
                          />
                          <span className="ml-1">৳</span>
                        </div>
                        {item.discountPrice && (
                          <div className="flex flex-row justify-start text-xs dark:text-gray-300 ml-3 line-through">
                            <NumericFormat
                              displayType="text"
                              className=""
                              value={item.price}
                              thousandSeparator=","
                            />
                            <span className="ml-1">৳</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <GradientBb />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Recently Viewed Products */}
      {rvp && (
        <div className="w-full mt-16">
          <div className="w-full">
            <h1 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
              Recently Viewed
            </h1>
            <p className="text-center text-sm mt-1 text-gray-800 dark:text-white">
              Check your recently viewed Products!
            </p>
          </div>
          <div className="w-full mt-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-3 sm:px-0 gap-5">
              {rvp.slice(0, 6).map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 group/main py-4 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-sky-300 hover:shadow-sky-200 relative"
                >
                  <div className="border-b-[5px] border-b-gray-50 dark:border-b-gray-800">
                    <div className="p-3 relative w-full h-[230px] overflow-hidden my-2">
                      {item.src && (
                        <Link
                          href={{
                            pathname: `/${item.name
                              .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                              .toLowerCase()}`,
                            query: { id: item._id },
                          }}
                        >
                          <Image
                            loading="lazy"
                            src={item.src}
                            fill
                            alt={"product image"}
                            className="w-full group-hover/main:scale-105 ease-in-out duration-300 object-contain"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="px-4 pt-4 flex flex-col justify-between">
                    <Link
                      href={{
                        pathname: `/${item.name
                          .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                          .toLowerCase()}`,
                        query: { id: item._id },
                      }}
                      className="text-sm text-ellipsis line-clamp-2 hover:underline hover:text-pink-600 dark:text-gray-100"
                    >
                      {item.name}
                    </Link>
                    <div className="pt-2 flex flex-row flex-wrap justify-start items-end">
                      <div className="flex flex-row justify-start text-sky-600 font-semibold">
                        <NumericFormat
                          displayType="text"
                          className=""
                          value={
                            item.discountPrice ? item.discountPrice : item.price
                          }
                          thousandSeparator=","
                        />
                        <span className="ml-1">৳</span>
                      </div>
                      {item.discountPrice && (
                        <div className="flex flex-row justify-start text-xs dark:text-gray-300 ml-3 line-through">
                          <NumericFormat
                            displayType="text"
                            className=""
                            value={item.price}
                            thousandSeparator=","
                          />
                          <span className="ml-1">৳</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <GradientBb />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
