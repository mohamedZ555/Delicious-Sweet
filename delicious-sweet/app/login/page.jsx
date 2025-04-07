import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import Image from 'next/image';


export default function Login() {
    return (
      <section className="login">
        <div className="container  my-4">
          <form className="row g-3">
            <h2 className="text my-5 text-center ">
             <span className="d-inline-block text  border-bottom  pb-1 animated-underline-load">
             LogIn
             </span> 
          </h2>
          <div className="row gap-12">
            <div className="col-6">
              <div className="col">
                <label for="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4"/>
              </div>
              <div className="col">
                <label for="inputPassword4" className="form-label">Password</label>
                <input type="password" className="form-control border-bottom" id="inputPassword4"/>
              </div>
              <div className="col mt-5 d-flex">
                <button type="submit" className="btn btn-submit  col-3">Sign in</button>
                <Link href="#" className="col-9 textDark" style={{textAlign:'right'}}>Forget Password?</Link>
              </div>
            </div>
            <div className="col-6 edit-img text-center">
              <Image src="/images/pic1.png"
              className="borderRadius-3"  
              width={300}
              height={300}></Image>
            </div>
          </div>
           

            <div className="row my-4 text-center m-auto">
              <a href="#" className=" col-md btn-social">
                <FaGoogle className="pr-4"/> 
                sign in by Google Email
              </a>
              <a href="#" className="col-md ml-1 btn-social"> 
                <FaFacebookF className="pr-4"/> 
                Sigin in by Facebook Account 
              </a>
            </div>
          
            <div className="col-12">
              <p>If you are not <Link href="register">Sign Up </Link>? </p>
              
            </div>
          </form>
        </div>
      </section>
    );
  }
  