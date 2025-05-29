import React from "react";
import ContactForm from "./ContactForm";
import "../../../../styles/pagesStyle/contactUs.css";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import ContactMap from "./ContactMap";
const ContactUsContainer = () => {
  return (
    <>
      <div className="container py-sm-5 pt-md-3">
        <div className="row py-lg-5 my-lg-3">
          <div className="col-12 col-md-5 d-flex flex-column gap-4 gap-lg-3 gap-xl-4">
            <div className="mainText text-capitalize pe-1">

            </div>
            <div className="subText text-capitalize mt-3">

            </div>
            <div>
              <div className="subText text-capitalize mt-3">
                <span className="me-3 fs-5 fw-bold">
                  <FiPhone />
                </span>

              </div>
              <div className="subText text-capitalize mt-3">
                <span className="me-3 fs-5 fw-bold">
                  <SlLocationPin />
                </span>

              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 ms-md-auto my-4 mt-md-3">
            <ContactForm/>
          </div>
        </div>
      </div>
      <div className="mapBG">
        <ContactMap />
      </div>
    </>
  );
};

export default ContactUsContainer;
