import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";


export default function Register() {
    return (
      <>
         <div className="container  my-4">
          <h2 className="text my-5 text-center ">
             <span className="d-inline-block text  border-1 border-dark pb-1 animated-underline-load">
             Sign Up
             </span> 
          </h2>
        <form className="row g-3">
          <div className="col-md-6">
            <label for="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4"/>
          </div>
          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword4"/>
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
          </div>
          <div className="col-12">
            <label for="inputAddress2" className="form-label">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
          </div>
          <div className="col-md-6">
            <label for="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="col-md-4">
            <label for="inputState" className="form-label">State</label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
         
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck"/>
              <label className="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-submit btn-animated">Sign Up</button>
          </div>
           <div className="row my-4 text-center m-auto">
              <a href="#" className=" col-md btn-social"><FaGoogle className="btn-icon" /> sigin in by Google Email</a>
              <a href="#" className="col-md btn-social"> <FaFacebookF className="btn-icon"/> sigin in by Facebook Account </a>
            </div>
          <div className="col-12">
            <p>If you are already <Link href="login"> login </Link> ? </p>
          </div>
        </form>       
       </div>  
      </>
    );
  }
  