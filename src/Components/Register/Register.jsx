
import React, { useEffect, useState } from 'react';
import { register } from '../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo2 from "./assets/Screenshot 2025-03-16 162057.png"
import "./Register.css"

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        // termsAccepted: false,
    });
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { loading, error, isAuthenticated } = useSelector(state => state.auth);

    const validateForm = () => {
        const errors = {};
        if (!formData.name || formData.name.length < 3 || formData.name.length > 13) {
            errors.name = "UserName must be 3-13 characters and contain only letters and numbers";
        }
        if (!formData.surname || formData.surname.length < 3 || formData.surname.length > 20) {
            errors.surname = "UserName must be 3-20 characters and contain only letters and numbers";
        }
        if (!formData.email || !formData.email.includes("@gmail.com")) {
            errors.email = "Email must be a valid Gmail address (e.g. example@gmail.com)";
        }
        if (!formData.phone || formData.phone.length < 5 || formData.phone.length > 10) {
            errors.phone = "Phone must be at least 5 characters";
        }
        if (!formData.password || formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (!formData.termsAccepted) {
            errors.termsAccepted = "You must accept the terms and conditions";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // const handleChange = (e) => {
    //     const { name, value,type, checked } = e.target;
    //     if (type === "checkbox") {
    //         setFormData({ ...formData, [name]: checked }); // Update checkbox state
    //     } else {
    //         setFormData({ ...formData, [name]: value });
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(register(formData));
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
                    {error && <div className="error-message">{error}</div>}
                    <div className='form-group'>
                        <label htmlFor='name'>Ad <span className='important'>*</span></label>
                        <input type='text' name='name' id='name' value={formData.name} onChange={handleChange} />
                        <div className='error-message'>{formErrors.name}</div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='surname'>Soyad <span className='important'>*</span></label>
                        <input type='text' name='surname' id='surname' value={formData.surname} onChange={handleChange} />
                        <div className='error-message'>{formErrors.surname}</div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phone'>Mobil nömrə <span className='important'>*</span></label>
                        <input type='tel' name='phone' id='phone' value={formData.phone} onChange={handleChange} />
                        <div className='error-message'>{formErrors.phone}</div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>E-mail <span className='important'>*</span></label>
                        <input type='text' name='email' id='email' value={formData.email} onChange={handleChange} />
                        <div className='error-message'>{formErrors.email}</div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Şifrə <span className='important'>*</span></label>
                        <input type='password' name='password' id='password' value={formData.password} onChange={handleChange} />
                        <div className='error-message'>{formErrors.password}</div>
                    </div>
                    {/* <div className='check'>
                            <input 
                                type='checkbox' 
                                name='termsAccepted' 
                                id='termsAccepted'
                                checked={formData.termsAccepted} 
                                onChange={handleChange} 
                            />
                            <label  htmlFor="termsAccepted">Şərt və qaydalari qəbul edirəm</label>
                       
                        <div className='error-message'>{formErrors.termsAccepted}</div>
                    </div> */}
                    <button type="submit" disabled={loading} className="auth-button">
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <p className="auth-redirect">
                        Artıq hesabınız var? <Link to="/login">Giriş</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;

