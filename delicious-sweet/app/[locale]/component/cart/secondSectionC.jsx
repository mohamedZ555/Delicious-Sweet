"use client"
import { useState } from "react";
import { Table } from "react-bootstrap";
import "../../../../styles/pagesStyle/cart/Cart.css";

const TableHead = [ "Product", "Price", "Quantity", "Subtotal"];

const tableDetails = [
  { img: "/images/pic2.jpg", title: "Strawberries", price: 60 },
  {
    img: "/images/pic2.jpg",
    title: "Potato",
    price: 20,
  },
  {
    img: "/images/pic2.jpg",
    title: "Mango",
    price: 50,
  },
  //   { img: img2, title: "Healthy", price: 65 },
  //   { img: img2, title: "Healthy", price: 65 },
  //   { img: img2, title: "Healthy", price: 65 },
  //   { img: img2, title: "Healthy", price: 65 },
  //   { img: img2, title: "Tomato", price: 65 },
];

function SecondSectionC() {
  const [quantities, setQuantities] = useState(tableDetails.map(() => 1));

  const handleIncrease = (index) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] += 1;
      return updatedQuantities;
    });
  };

  const handleDecrease = (index) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      if (updatedQuantities[index] > 1) {
        updatedQuantities[index] -= 1;
      }
      return updatedQuantities;
    });
  };

  return (
    <main className="container mt-sm-5 pt-5 pb-sm-5 mb-3">
      <Table responsive className="text-center tableSpaces">
        <thead>
          <tr>
            {TableHead.map((item, index) => (
              <th key={index} className="TabBGHeader fw-bold">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableDetails.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="tableBoxs px-lg-4 px-md-3 px-sm-2">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="cartIMGS w-100 "
                  />
                </div>
              </td>
              <td>
                <div className="tableBoxs tablePrice ">
                  ${item.price.toFixed(0)}
                </div>
              </td>
              <td>
                <div className="tableBoxs borr">
                  <div className="quantity-controls d-flex justify-content-center align-items-center gap-md-3 px-md-3 gap-2 px-2">
                    <div
                      className="pointer plusSize"
                      onClick={() => handleDecrease(index)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </div>
                    {String(quantities[index]).padStart(2, "0")}
                    <div
                      className="pointer plusSize"
                      onClick={() => handleIncrease(index)}
                      aria-label="Increase quantity"
                    >
                      +
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="tableBoxs lastBorr">
                  <div className="d-flex align-items-center justify-content-center gap-md-5 gap-2 tableTotal">
                    ${(item.price * quantities[index]).toFixed(0)}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
}

export default SecondSectionC;
