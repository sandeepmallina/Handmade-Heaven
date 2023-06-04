import React from "react";
import Product from "../Product-Components/Product";
import "./Home.css";
// import DispalyProducts from './Display-products/DispalyProducts';
function Home() {
  return (
    <div className="home-container">
      <div className="home-banner">
        <div className="banner-content">
          <h1 className="banner-heading">
            Add artisanal flair to your surroundings.
          </h1>
          <p className="banner-paragraph">
            Bringing beauty to your home, one handcrafted piece at a time.
          </p>
          <button className="banner-button">Shop Now</button>
        </div>
        <img
          className="banner-img"
          src="https://i.ibb.co/74trfw4/Screenshot-2023-03-24-23201033-removebg-preview-1.png"
          alt=""
          srcset=""
        />
      </div>
      <h2 className="home-heading">Todays Best Deals For You!</h2>
      <Product
        id="12321341"
        title="Folk Art Pot"
        description="Handcrafted traditional designs are an excellent way to incorporate a touch of history and cultural significance into modern décor. "
        price={19.99}
        rating={5}
        image="https://i.ibb.co/8gDf7mx/Screenshot-2023-03-24-001918-removebg-preview.png"
      />
      <Product
        id="12321343"
        title="Charming floral  pot"
        description="Bring the beauty of nature indoors with this handcrafted pot featuring colorful plant leaf design and a charming floral motif."
        price={39.93}
        rating={5}
        image="https://i.ibb.co/Z6XzgBP/Screenshot-2023-03-24-002854-removebg-preview.png"
      />
      <Product
        id="49538094"
        title="Jute penholder "
        description="Stay organized in style with this handcrafted jute penholder, featuring colorful threads and a lovely floral design."
        price={239.0}
        rating={4}
        image="https://i.ibb.co/RpRbZkk/Screenshot-2023-03-24-003331-removebg-preview.png"
      />
      <Product
        id="4903850"
        title="Simple kylix"
        description="Minimalist handcrafted pottery pieces are an excellent way to showcase simplicity and elegance in any living space."
        price={199.99}
        rating={3}
        image="https://i.ibb.co/3C2JdWf/Screenshot-2023-03-24-004929-removebg-preview.png"
      />
      <Product
        id="23445930"
        title="Bamboo bowl"
        description="Bring natural beauty to your home with this simple, yet stylish handcrafted bamboo bowl, perfect for storage or decorative purposes"
        price={98.99}
        rating={5}
        image="https://i.ibb.co/MgKHNPB/Screenshot-2023-03-24-010802-removebg-preview-1.png"
      />
      <Product
        id="3254354345"
        title="Handcrafted Lebes "
        description="Elevate your decor with this stunning handcrafted Lebes, embellished with colorful pebbles and vibrant pearl necklaces for a bold statement piece."
        price={598.99}
        rating={4}
        image="https://i.ibb.co/zPVwSLp/Screenshot-2023-03-24-011548-removebg-preview.png"
      />
      <Product
        id="123213435"
        title="Handcrafted Figurine "
        description="This handcrafted human figurine is a unique and rustic addition to your home decor. Made from natural mud and expertly crafted by skilled artisans."
        price={1609.3}
        rating={5}
        image="https://i.ibb.co/VN344tJ/Screenshot-2023-03-24-02002922-removebg-preview.png"
      />
      <Product
        id="1232134"
        title="Teracotta clay pot"
        description="This handcrafted Teracotta clay pot is a perfect blend of traditional and contemporary style, adding a touch of rustic charm to your home decor. "
        price={1609.3}
        rating={5}
        image="https://i.ibb.co/Z1xcHTc/Screenshot-2023-03-24-20382022-removebg-preview.png"
      />

      <Product
        id="90829332"
        title="Natural Bamboo Baskets "
        description="Bring rustic charm and eco-friendliness to your home with this set of 3 handcrafted bamboo baskets."
        price={1094.98}
        rating={4}
        image="https://i.ibb.co/09nvdd1/Screenshot-2023-03-24-003257-removebg-preview.png"
      />
      <Product
        id="90829334"
        title="Artisanal Ceramic Jars"
        description="This set of 3 artisanal ceramic jars.Each jar is expertly hand-designed with unique and colorful patterns. "
        price={1094.98}
        rating={4}
        image="https://i.ibb.co/NVD7v1B/Screenshot-2023-03-24-010447-removebg-preview.png"
      />
      <Product
        id="908293341"
        title="Work table decor set"
        description="Introducing the Earthly Delights penholder, a unique and handcrafted addition to your desk or workspace."
        price={1094.98}
        rating={4}
        image="https://i.ibb.co/PZKQRxp/Screenshot-2023-03-24-003409-removebg-preview.png"
      />
      <Product
        id="9082933411"
        title="Wali Art"
        description="Wali Art is the perfect way to add a touch of elegance and sophistication to any living space."
        price={1094.98}
        rating={4}
        image="https://i.ibb.co/1vYJb3k/Screenshot-2023-04-04-012641.png"
      />
    </div>
  );
}

export default Home;
