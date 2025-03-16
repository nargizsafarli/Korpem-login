import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
 import logo2 from "./assets/Screenshot 2025-03-16 162057.png"
import { register } from '../../redux/features/auth/authSlice';
import "./Register.css"

function Register() {
      const [name, setName] = useState("");
      const [surname, setSurname] = useState("");
      const [phone, setPhone] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [termsAccepted, setTermsAccepted] = useState(false);
      const [formErrors, setFormErrors] = useState({});

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const { loading, error, isAuthenticated } = useSelector(state => state.auth);
      const validateForm = () => {
        let errors = {};
    
        if (!name) errors.name = "Ad daxil edilməlidir.";
        if (!surname) errors.surname = "Soyad daxil edilməlidir.";
        if (!phone || !/^\d{1,10}$/.test(phone))
          errors.phone = "Mobil nömrə düzgün deyil!";
        if (!email || !/\S+@\S+\.\S+/.test(email))
          errors.email = "Email (@gmail.com) formatinda olmalidir!";
        if (!password || password.length < 5)
          errors.password = "Şifrə ən azı 6 simvoldan ibarət olmalıdır.";
        if (!termsAccepted) errors.terms = "Şərtləri qəbul etməlisiniz.";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      };

       const handleSubmit = (e) => {
          e.preventDefault();
      
          if (validateForm()) {
            const userData = { name, surname, email, phone, password };
         dispatch(register(userData))
            setName("");
            setSurname("");
            setPhone("");
            setEmail("");
            setPassword("");
            setTermsAccepted(false);
          }
        };
        useEffect(() => {
                    if (isAuthenticated) {
                        navigate("/login");
                    }
                }, [isAuthenticated, navigate]);

  return (
         <div className='register-container'>
           <div className='register-text'>
                <img src={logo2}/>
                <h2>Yeni hesab yaradın</h2>
               <p>   Korpem.az ailesinə qoşulun və unikal endirimlər, yeni kolleksiyalar və fərdi təkliflərdən faydalanın.
                </p>
            </div>
            <div className='form-container'>
                <form className='auth-form' onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Ad <span className='important'>*</span></label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && (
              <p className="error-message">{formErrors.name}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="surname">Soyad <span className='important'>*</span></label>
            <input
              type="text"
              id="surname"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            {formErrors.surname && (
              <p className="error-message">{formErrors.surname}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Mobil nömrə <span className='important'>*</span></label>
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {formErrors.phone && (
              <p className="error-message">{formErrors.phone}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-poçt <span className='important'>*</span></label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifrə <span className='important'>*</span></label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p className="error-message">{formErrors.password}</p>
            )}
          </div>
          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="terms"> Şərtləri və qaydaları qəbul edirəm <span className='important'>*</span></label>
            {formErrors.terms && (
              <p className="error-message">{formErrors.terms}</p>
            )}
          </div>
          <button type="submit" disabled={loading} className="auth-button">
                       {loading ? "Registering..." : "Register"}
                  </button>
          {error && <p className="error-message">{error}</p>}
          <p className="auth-redirect">
                       Artıq hesabınız var? <Link to="/login">Giriş</Link>
                 </p>

                </form>
             </div>

      </div>
  
  )
}

export default Register
