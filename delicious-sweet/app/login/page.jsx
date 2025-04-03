import Link from "next/link";

export default function Login() {
    return (
      <div className="container  my-4">
        <form className="row g-3">
          <div className="col-12">
            <label for="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4"/>
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword4"/>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
          <div className="col-12">
            <p>If you are not <Link href="register">Sign Up </Link>? </p>
            
          </div>
        </form>
  
      </div>
    );
  }
  