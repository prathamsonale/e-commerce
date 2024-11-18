import womenHomeImage from "../assets/images/Home/womenHome.jpeg";
import menHomeImage from "../assets/images/Home/menHomeImage.jpeg";
import kidImage_S from "../assets/images/Home/kidImage_S.jpeg";
import kidImage_L from "../assets/images/Home/kidImage_L.jpeg";
function Home() {
  return (
    <>
      {/* Carousel Section */}
      <div className="container-fluid" id="home">
        <div
          className="carousel slide"
          data-bs-ride="carousel"
          id="withControl"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">
            {/* Carousel Items */}
            {[
              {
                src: "https://img.freepik.com/premium-photo/interactive-product-carousel-showcasing-latest-nike-running-shoes-teal-yellow_1036975-154971.jpg",
                alt: "First slide",
                isActive: true,
              },
              {
                src: "https://c4.wallpaperflare.com/wallpaper/296/606/453/sports-shoes-wallpaper-preview.jpg",
                alt: "Second slide",
              },
              {
                src: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
                alt: "Third slide",
              },
            ].map((item, index) => (
              <div
                className={`carousel-item ${item.isActive ? "active" : ""}`}
                key={index}
              >
                <img src={item.src} alt={item.alt} className="carousel-image" />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#withControl"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#withControl"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </button>
        </div>

        {/* Introductory Heading */}
        <div className="container text-center heading mt-4">
          <h2 className="fs-1">
            It started with a simple idea: Create quality, well-designed
            products that I wanted myself.
          </h2>
        </div>

        {/* Product Info Section */}
        <div className="container-fluid mt-5 product-info text-center">
          <div className="row">
            {/* Collection Cards */}
            {[
              {
                src: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/c/t/2/8-kia-1001-8-action-light-grey-peach-original-imahfu9dp2prfha7.jpeg?q=70",
                alt: "Women's shoes",
                title: "Shop Women's Collection",
                imageSrcSet: womenHomeImage,
              },
              {
                src: "https://cdn.thewirecutter.com/wp-content/media/2024/05/runningshoesforyou-2048px-2251.jpg?auto=webp&quality=75&crop=1.91:1&width=459&height=612",
                alt: "Men's shoes",
                title: "Shop Men's Collection",
                imageSrcSet: menHomeImage,
              },
              {
                src: kidImage_L,
                alt: "Kid's shoes",
                title: "Shop Kid's Collection",
                imageSrcSet: kidImage_S,
              },
            ].map((collection, index) => (
              <div className="col-lg-4 text-center" key={index}>
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet={collection.imageSrcSet}
                  />
                  <img
                    src={collection.src}
                    alt={collection.alt}
                    className="img-fluid"
                  />
                </picture>
                <h1 className="mt-1 mb-3">{collection.title}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
