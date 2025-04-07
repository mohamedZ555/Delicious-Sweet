import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";


export default function Register() {
    return (
      <>
         <div className="container  my-4 register">
          <h2 className="text my-5 text-center ">
             <span className="d-inline-block text  border-1 border-dark pb-1 animated-underline-load">
             Sign Up
             </span> 
          </h2>
        <form className="row g-3">
          <div className="col-md-6">
            <label for="inputFName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="inputFName"/>
          </div>
          <div className="col-md-6">
            <label for="inputLName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="inputLName"/>
          </div>
          <div className="col-md-12">
            <label for="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4"/>
          </div>
          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword4"/>
          </div>
          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="inputPassword4"/>
          </div>
          <div className="col-md-12">
            <label for="inputPhone" className="form-label">Phone Number</label>
            <input type="number" className="form-control" id="inputPhone"/>
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
          </div>
         
          <div className="col-12">
            <label for="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="col-12">
            <button type="submit" className=" btn btn-submit btn-animated">Sign Up</button>
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
  