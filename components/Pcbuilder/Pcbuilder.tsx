import React, { useState, useRef, useCallback } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SaveIcon from "@mui/icons-material/Save";
import ScreenshotIcon from "@mui/icons-material/Screenshot";
import PrintIcon from "@mui/icons-material/Print";
import Link from "next/link";
import Image from "next/image";
import Components from "./Components";
import { useReactToPrint } from "react-to-print";
import { NumericFormat } from "react-number-format";
import { toPng } from "html-to-image";

function Pcbuilder() {
  const componentRef = useRef(null);
  const [cpu, setCpu] = useState(undefined as any);
  const [cpuCooler, setCpuCooler] = useState(undefined as any);
  const [motherBoard, setMotherBoard] = useState(undefined as any);
  const [ram, setRam] = useState(undefined as any);
  const [ram2, setRam2] = useState(undefined as any);
  const [storage, setStorage] = useState(undefined as any);
  const [graphicsCard, setGraphicsCard] = useState(undefined as any);
  const [powersupply, setPowersupply] = useState(undefined as any);
  const [casing, setCasing] = useState(undefined as any);
  const [monitor, setMonitor] = useState(undefined as any);
  const [casingCooler, setCasingCooler] = useState(undefined as any);
  const [keyboard, setKeyboard] = useState(undefined as any);
  const [mouse, setMouse] = useState(undefined as any);
  const [headphone, setHeadphone] = useState(undefined as any);
  const [ups, setUps] = useState(undefined as any);
  const [antivirus, setAntivirus] = useState(undefined as any);

  const builtData = [
    cpu,
    cpuCooler,
    motherBoard,
    ram,
    ram2,
    storage,
    graphicsCard,
    powersupply,
    casing,
    monitor,
    casingCooler,
    keyboard,
    mouse,
    headphone,
    ups,
    antivirus,
  ];

  const totalAmount = builtData.reduce(
    (total, currentValue) =>
      (total =
        total + (currentValue === undefined ? 0 : currentValue?.discountPrice)),
    0
  );

  const totalItems = builtData.filter((item: any) => item !== undefined);

  const printBuiltPc = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Classic Computer",
  });

  const screenShot = useCallback(() => {
    if (componentRef.current === null) {
      return;
    }

    toPng(componentRef.current, { cacheBust: true, skipFonts: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "built-pc-classiccomputer.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [componentRef]);

  return (
    <>
      {/* Print start*/}
      <div className="absolute -top-full w-[1280px] m-auto">
        <div className="p-10 bg-white" ref={componentRef}>
          <div className="flex flex-col justify-center items-center text-sm">
            <div className="relative w-32 h-12 ml-5">
              <Link className="flex items-center text-xl " href="/">
                <Image src="/assets/logo/logo1.png" alt="logo" fill />
              </Link>
            </div>
            <h2>Modern More, Goneshtola, Dinajpur</h2>
            <h2>Phone No: 01718-443892, 01711-945155</h2>
            <h2>Email: classiccomputer101@gmail.com</h2>
          </div>
          <div className=" mt-10 rounded">
            <div className="w-full flex items-center bg-indigo-100 rounded-t font-semibold text-sm">
              <div className="w-48 border-r-2 border-white p-2 mr-2">
                <h2>Component</h2>
              </div>
              <div className="w-full border-r-2 border-white p-2 mr-2">
                <h2>Product Name</h2>
              </div>
              <div className="w-40 border-r-2 border-white p-2 mr-2">
                <h2>Quantity</h2>
              </div>
              <div className="w-40">
                <h2>Price</h2>
              </div>
            </div>
            {cpu && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Processor</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{cpu.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {cpu.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={cpu.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {cpuCooler && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>CPU Cooler</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{cpuCooler.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {cpuCooler.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={cpuCooler.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {motherBoard && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Motherboard</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{motherBoard.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {motherBoard.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={motherBoard.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {ram && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Ram</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{ram.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {ram.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={ram.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {ram2 && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Ram-(Optional)</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{ram2.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {ram2.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={ram2.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {storage && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Storage</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{storage.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {storage.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={storage.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {graphicsCard && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Graphics Card</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{graphicsCard.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {graphicsCard.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={graphicsCard.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {powersupply && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Power Supply</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{powersupply.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {powersupply.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={powersupply.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {casing && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Casing</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{casing.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {casing.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={casing.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {monitor && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Monitor</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{monitor.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {monitor.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={monitor.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {casingCooler && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Casing Cooler</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{casingCooler.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {casingCooler.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={casingCooler.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {keyboard && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Keyboard</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{keyboard.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {keyboard.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={keyboard.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {mouse && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Mouse</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{mouse.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {mouse.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={mouse.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {headphone && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Headphone</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{headphone.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {headphone.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={headphone.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {ups && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>UPS</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{ups.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {ups.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={ups.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            {antivirus && (
              <div className="w-full flex items-center bg-gray-50 text-sm border-b">
                <div className="w-48 border-r-2 p-2 mr-2">
                  <h2>Antivirus</h2>
                </div>
                <div className="w-full border-r-2 p-2 mr-2">
                  <h2>{antivirus.name}</h2>
                </div>
                <div className="w-40 border-r-2 border-white p-2 mr-2">
                  <h2>1 x {antivirus.discountPrice}</h2>
                </div>
                <div className="w-40">
                  <h2>
                    <NumericFormat
                      displayType="text"
                      className=""
                      value={antivirus.discountPrice}
                      thousandSeparator=","
                    />
                    <span className="ml-1">৳</span>
                  </h2>
                </div>
              </div>
            )}
            <div className="w-full flex items-center text-base font-semibold mt-1">
              <div className="w-full border-r-2 border-white p-2 mr-2" />
              <div className="w-40 border-r p-2 bg-gray-300 rounded-l">
                <h2 className="text-right">Total</h2>
              </div>
              <div className="w-40 bg-gray-300 p-2 rounded-r text-orange-600">
                <h2 className="text-right">
                  <NumericFormat
                    displayType="text"
                    className=""
                    value={totalAmount}
                    thousandSeparator=","
                  />
                  <span className="ml-1">৳</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Print end */}
      <div className="container m-auto mb-20">
        <div className="relative dark:bg-gray-800 dark:text-white dark:border-gray-500 shadow mx-auto mt-10 flex max-w-screen-lg items-center flex-col py-4 sm:flex-row sm:items-center sm:justify-between border border-b-0 rounded-t">
          <div className="relative w-32 h-12 ml-5">
            <Link className="flex items-center text-xl " href="/">
              <Image src="/assets/logo/logo1.png" alt="logo" fill />
            </Link>
          </div>
          <nav
            aria-label="Header Navigation"
            className="peer-checked:block pl-2 py-6 sm:block sm:py-0"
          >
            <ul className="flex justify-between gap-y-4 flex-row gap-x-8 mr-5">
              <li className="flex-col flex items-center justify-center">
                <Link href={"/"}>
                  <SaveIcon className="w-6 h-6 text-indigo-500" />
                </Link>
                <span className="text-xs py-1">Save PC</span>
              </li>
              <li>
                <button
                  onClick={printBuiltPc}
                  className="flex-col flex items-center justify-center"
                >
                  <PrintIcon className="w-6 h-6 text-indigo-500" />
                  <span className="text-xs mt-1">Print</span>
                </button>
              </li>
              <li>
                <button
                  onClick={screenShot}
                  className="flex-col flex items-center justify-center"
                >
                  <ScreenshotIcon className="w-6 h-6 text-indigo-500" />
                  <span className="text-xs mt-1">Screenshot</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border rounded-b container m-auto max-w-screen-lg pb-5 dark:bg-gray-700 dark:border-gray-500 dark:text-white">
          <div className="flex justify-between p-5">
            <div className="flex flex-col">
              <h1 className="text-blue-500 text-base dark:text-white">
                PC Builder - Build Your Own Computer - Classic Computer
              </h1>
              <div className="flex gap-2 ">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 mt-3  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="mt-2">Hide Unconfigured Components</span>
              </div>
            </div>
            <div className="bg-gray-200 px-10 py-2 text-orange-500 font-semibold rounded">
              <NumericFormat
                displayType="text"
                className=""
                value={totalAmount}
                thousandSeparator=","
              />
              <span className="ml-1">৳</span>
              <p className="text-gray-600 text-xs ml-1">
                {totalItems.length} Items
              </p>
            </div>
          </div>
          <div className="bg-gray-600 rounded-sm mx-3 justify-center items-center m-auto">
            <span className="px-3 text-xs text-white ">Core Components</span>
          </div>
          <Components
            cg="Pc Components"
            scg="Processor"
            imgSrc={"/assets/Icon/Cpu.png"}
            title="CPU"
            setData={setCpu}
            data={cpu}
          />
          <Components
            cg="Pc Components"
            scg="Cooling Fan"
            imgSrc={"/assets/Icon/CpuCooler.png"}
            title="CPU Cooler"
            setData={setCpuCooler}
            data={cpuCooler}
          />
          <Components
            cg="Pc Components"
            scg="Motherboard"
            imgSrc={"/assets/Icon/Motherboard.png"}
            title="Motherboard"
            setData={setMotherBoard}
            data={motherBoard}
          />
          <Components
            cg="Pc Components"
            scg="Ram(Desktop)"
            imgSrc={"/assets/Icon/Ram.png"}
            title="Ram"
            setData={setRam}
            data={ram}
          />
          <Components
            cg="Pc Components"
            scg="Ram(Desktop)"
            imgSrc={"/assets/Icon/Ram.png"}
            title="Ram - (Optional)"
            setData={setRam2}
            data={ram2}
          />
          <Components
            cg="Pc Components"
            scg="SSD"
            imgSrc={"/assets/Icon/Storage.png"}
            title="Storage"
            setData={setStorage}
            data={storage}
          />
          <Components
            cg="Pc Components"
            scg="Graphics Card"
            imgSrc={"/assets/Icon/Graphics Card.png"}
            title="Graphics Card"
            setData={setGraphicsCard}
            data={graphicsCard}
          />
          <Components
            cg="Pc Components"
            scg="Power Supply"
            imgSrc={"/assets/Icon/powersupply.png"}
            title="Power Supply"
            setData={setPowersupply}
            data={powersupply}
          />
          <Components
            cg="Pc Components"
            scg="Casing"
            imgSrc={"/assets/Icon/2704333.png"}
            title="Casing"
            setData={setCasing}
            data={casing}
          />
          <div className="bg-gray-600 rounded-sm mx-3 justify-center items-center m-auto mt-5">
            <span className="px-3 text-xs text-white ">
              Peripherals & Others
            </span>
          </div>
          <Components
            cg="Monitor"
            scg={undefined}
            imgSrc={"/assets/Icon/3474360.png"}
            title="Monitor"
            setData={setMonitor}
            data={monitor}
          />
          <Components
            cg="Pc Components"
            scg="Cooling Fan"
            imgSrc={"/assets/Icon/9019524.png"}
            title="Casing Cooler"
            setData={setCasingCooler}
            data={casingCooler}
          />
          <Components
            cg="Accessories"
            scg="Keyboard"
            imgSrc={"/assets/Icon/2263611.png"}
            title="Keyboard"
            setData={setKeyboard}
            data={keyboard}
          />
          <Components
            cg="Accessories"
            scg="Mouse"
            imgSrc={"/assets/Icon/1786973.png"}
            title="Mouse"
            setData={setMouse}
            data={mouse}
          />
          <Components
            cg="Accessories"
            scg="Headphone"
            imgSrc={"/assets/Icon/937363.png"}
            title="Headphone"
            setData={setHeadphone}
            data={headphone}
          />
          <Components
            cg="Ups"
            scg={undefined}
            imgSrc={"/assets/Icon/1368352.png"}
            title="UPS"
            setData={setUps}
            data={ups}
          />
          <Components
            cg="Security"
            scg="Softwares"
            imgSrc={"/assets/Icon/2603242.png"}
            title="AntiVirus"
            setData={setAntivirus}
            data={antivirus}
          />
        </div>
      </div>
    </>
  );
}

export default Pcbuilder;
