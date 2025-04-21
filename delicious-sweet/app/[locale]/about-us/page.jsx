import Image from "next/image";

export default function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="row pt-5">
          <div className="col-6 m-auto px-5">
            <h2 className="text">Welcome To Our Shop</h2>
            <p className="mt-3">
              Candy is made by dissolving sugar in water or milk to form a
              syrup, which is boiled until it reaches the desired concentration
              or starts to caramelize. Candy comes in a wide variety of
              textures, from soft and chewy to hard and brittle. The texture of
              candy depends on the ingredients.
            </p>
          </div>
          <div className="col-6 text-center">
            <Image
              src="/images/bannar.jpg"
              style={{ borderRadius: "10px" }}
              width={550}
              height={300}
            ></Image>
          </div>
        </div>

        <div className="row by-5">
          <div className="col-6 text-center">
            <Image
              src="/images/banner2.jpg"
              style={{ borderRadius: "10px" }}
              width={550}
              height={300}
            ></Image>
          </div>
          <div className="col-6 mb-5 m-auto px-5">
            <h2 className="text">Sweet Box For Her</h2>
            <p className="mt-3">
              Some desserts are made with coffee, such as tiramisu, or a
              coffee-flavoured version of a dessert can be made. Alcohol can
              also be used as an ingredient, to make desserts.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-5">
            <h2 className="text text-center mt-5 mb-4"> Our Store Location</h2>
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://maps.app.goo.gl/kzfyGfTxwPm5m4p56"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
