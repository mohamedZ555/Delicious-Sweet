import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function Login() {
    return (
      <section className="login">
        <div className="container  my-4">
          <form className="row g-3">
            <div className="col-12">
            <h2 className="text my-5 text-center ">
             <span className="d-inline-block text  border-1 border-dark pb-1 animated-underline-load">
             LogIn
             </span> 
          </h2>
              <label for="inputEmail4" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail4"/>
            </div>
            <div className="col-12">
              <label for="inputPassword4" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4"/>
            </div>
            <div className="row my-4 text-center m-auto">
              <a href="#" className=" col-md btn-social">
                <FaGoogle /> 
                sigin in by Google Email
              </a>
              <a href="#" className="col-md btn-social"> 
                <FaFacebookF/> 
                Sigin in by Facebook Account 
              </a>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-submit ">Sign in</button>
            </div>
            <div className="col-12">
              <p>If you are not <Link href="register">Sign Up </Link>? </p>
              
            </div>
          </form>
        </div>
      </section>
    );
  }
  