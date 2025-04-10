import { FaGoogle, FaFacebookF, FaFacebookMessenger,FaMapMarkerAlt,FaPhoneAlt } from "react-icons/fa";
import Image from 'next/image';


import { CiInstagram } from "react-icons/ci";


export default function Footer() {
  return (
    <footer className="text-light py-4 mt-auto ">
      <div className="container text-center">
        <div className="row">
          <div className="col-12 my-3">
          <Image src="/images/logo.jpg"
          alt="logo"
            width={100}
            height={100}
            style={{borderRadius:"50%"}}/>
          </div>
          <div className="col-12 mt-3 mb-3">
            
            <h2 className="text-white">Delicious Sweets</h2>
          </div>
          <div className="col-12 mb-4">
            <p>Creative Mall 2, Line 10, Third District, Above Amir Beirut, Cairo, Egypt</p>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-3">
            <h4>Contact Us</h4>
            <p>Working Hours: </p>
            10:00AM To 11:00PM
          </div>
          <div className="col-3">
            <h4>About</h4>
          </div>
          <div className="col-3">
            <h4>Departments</h4>
          </div>
          <div className="col-3">
            <h4>Follow Us </h4> */}
            <div className="row">
              <div className="col icons mb-5">
                <a href="#" ><FaGoogle className="icon"/></a>
                <a href="tel:+201124788758" ><FaPhoneAlt className="icon" style={{color:'white'}}/></a>
                <a href="https://www.facebook.com/profile.php?id=100063773178711"><FaFacebookF className="icon"/></a>
                <a href="https://www.facebook.com/messages/t/104493548261061/"><FaFacebookMessenger className="icon"/></a>
                <a href="#"><CiInstagram className="icon"/></a>
                <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fg.co%2Fkgs%2Fs5Tj168%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR4r2czuMnP8H2VLh6mEu27uBHm03hJ84tAg6S6MY7dq1qbYjvrnBfVXYShhLA_aem_ez9itWInGNO0XOuEw-PPtQ&h=AT2fZuAiBEZ-C3OSsIIJ7SLlZ45d7yWAL-_NFRUS_on3OvmxuO-SoGiymATN8CaqD7YYFnIZGpRU_1MGcqVmn3RktbpauGMoineEvSeUGHf7fAgHfs3hVuqne5LXebAi9XqbiNu-p0b5nzcf&__tn__=-UK-R&c[0]=AT0lwv2F7pq4hSI_p-6DbU44tSOkJcS9pyC62syMTou0KNE8CcMONTC_t2rdOvQYJv7pH1oSYFW3tAyg1AGotLzl9dkalb67o2GlYdXIUmUuigEaA8cpQ83JwVEJyoR5YWmmFqHgyckWB0ZVr9jSfZaL96nKF-dp0fSA_PQMdy_SJkMFh_ACnBaLMhawlDX3sabl5a_AXtJqdcaxyxNcsHgzNQ"><FaMapMarkerAlt className="icon"/></a>
                
              </div>
            </div>
          </div>
          {/* <hr className="my-4"/>
          <p className="my-2 text-center">© 2025 Delicious Sweet. All rights reserved.</p>
        </div> */}
      {/* </div> */}
    </footer>
  );
}
