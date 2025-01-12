import { useState } from "react";
import Navigation from "./Navigation/Nav.jsx";
import Products from "./Products/Products.jsx";
import Recommended from "./Recommended/Recommended.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";
// Database
import productsData from "./db/data.jsx";
import Card from "./components/Card.jsx";

import "./index.css";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  // --------------- Input Filter ---------------
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = (products) => {
    return products.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase())
    );
  };

  // --------------- Radio Filter ---------------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // --------------- Buttons Filter ---------------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems(products);
    }

    // Seleted Filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => {
        return (
          <Card
            key={Math.random()}
            img={img}
            title={title}
            star={star}
            reviews={reviews}
            prevPrice={prevPrice}
            newPrice={newPrice}
          />
        );
      }
    );
  }

  const result = filteredData(productsData, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
};

export default App;
