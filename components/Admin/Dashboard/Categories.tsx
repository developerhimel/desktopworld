import React, { useEffect, useState } from "react";
import UpdateProductCategoryUi from "./UpdateProductCategoryUi";

function Categories() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined as any);

  useEffect(() => {
    setLoading(true);
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-5 my-16">
      <h2>Total Products - {data?.length}</h2>
      <div>
        {data?.slice(0, 20).map((item: any, index: number) => (
          <div key={index}>
            <UpdateProductCategoryUi item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
