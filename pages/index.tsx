import Head from "next/head";
import ccdetails from "../json/ccdetails.json";
import { NextPage } from "next";
import Homepage from "../components/Homepage/Homepage";

const Home: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title>
          Classic Computer || Largest tech accessories shop in Bangladesh
        </title>
        <meta
          name="description"
          content="Classic Computer has the most comprehensive array of Desktop PCs. We offer top-of-the-line Custom PC, Brand PC, All-in-One PC, and Portable Mini PC at our stores spread all over Bangladesh. Get your new iMac Desktop or Apple Mac Mini with an international warranty and servicing plan. To build a Desktop PC with the components of your choice, you can always depend on the experts of the Classic Computer PC shop. Take your gaming or professional content creation to the next level with a large collection of high-end Gaming and Rendering PC from Classic Computer. You can choose and build a complete Personal computer with our PC Builder feature anytime, anywhere. Or, build a Desktop PC to your taste right in front of you at the Classic Computer PC Shop."
        />
        <meta
          name="keywords"
          content="classiccomputer, classiccomputerbd, classic computer, Classic Computer, Laptop shop in Bangladesh, Laptop shop in bd, computer shop in Bangladesh, PC shop in Bangladesh, computer shop in BD, Gaming PC shop in Bangladesh, PC accessories shop in Bangladesh, best computer shop in Bangladesh, Gadget shop in bd, Gadget Shop in Bangladesh, Online Shop in BD, online computer shop in bd, computer accessories online shop in Bangladesh, computer parts shop in bd, Laptop in Bangladesh, Notebook, Laptop, Desktop, Brand PC, computer, computer store Bangladesh, laptop store Bangladesh, gaming, desktop, monitor, computer accessories, Desktop accessories, Laptop accessories, Laptop Online Store in BD, adata, apacer, apple, asus, bangladesh, baseus, belkin, benq, best, boya, brother, cable, camera, canon, GPU, graphics card, Classic Computer & Engineering Ltd,"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="w-full mt-8">
        <Homepage />
        <div className="w-full py-16">
          <div className="container m-auto px-3 md:px-0">
            <div className="w-full pb-8">
              <h1 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
                Classic Computer Info
              </h1>
              <p className="text-center text-sm mt-1 text-gray-800 dark:text-white">
                Look & Get Information About Classic Computer!
              </p>
            </div>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item bg-white dark:bg-gray-700 dark:border-gray-600 border border-gray-200 p-1">
                <h2 className="accordion-header mb-0" id="headingOne">
                  <button
                    className="accordion-button collapsed relative flex items-center w-full py-3 px-5 text-sm font-bold text-gray-600 text-left bg-white dark:bg-gray-700 dark:text-gray-200 border-0 rounded-none transition focus:outline-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Expand and get information about classic computer
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body py-4 px-5 border-t">
                    {ccdetails.map((item: any, index: number) => (
                      <div className="bg-white dark:bg-gray-700" key={index}>
                        <h1 className="text-gray-800 dark:text-white text-base font-semibold py-2">
                          {item.title}
                        </h1>
                        <p className="text-justify text-gray-500 dark:text-gray-200 text-sm pb-4">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
