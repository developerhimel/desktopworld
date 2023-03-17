import React from "react";

function Brands() {
  const [brands, setBrands] = React.useState([{ value: "", label: "" }]);
  const [brandInput, setBrandInput] = React.useState("");

  const handleEnter = (e: any) => {
    e.preventDefault();
    if (brandInput === "") {
      return;
    } else {
      setBrands([...brands, { value: brandInput, label: brandInput }]);
      setBrandInput("");
    }
  };

  return (
    <div className="w-full h-screen bg-white pt-5">
      <div className="container m-auto bg-gray-50 h-96 grid grid-cols-2 gap-3 p-3 rounded shadow">
        <div>
          <div className="mb-3 xl:w-full">
            <label
              htmlFor="productName"
              className="form-label inline-block mb-2 text-indigo-700 text-base"
            >
              Enter Brands Name <span className="text-red-500">*</span>
            </label>
            <form action="#" onSubmit={handleEnter}>
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 h-48 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="productName"
                placeholder="Brand Name..."
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
              />
            </form>
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              onClick={() => {
                const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                  JSON.stringify(brands)
                )}`;
                const link = document.createElement("a");
                link.href = jsonString;
                link.download = "brands.json";

                link.click();
              }}
              className="inline-block mt-10 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Download Json
            </button>
          </div>
        </div>
        <div className="overflow-scroll overflow-x-hidden">
          <div className="flex flex-col-reverse gap-2">
            {brands.map((item, index) => (
              <div
                className="bg-white mx-5 p-2 border rounded shadow"
                key={index}
              >
                {item.value !== "" ? <span>{item.value}</span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brands;
