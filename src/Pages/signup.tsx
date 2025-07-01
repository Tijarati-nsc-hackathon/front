import React, { useState } from 'react';
import { Check, Database } from 'lucide-react';
import edahabyaCard from '../Components/assets/edahabya.png';
import './CSS/signup.css';
import { useNavigate } from 'react-router-dom';
import type { SignupFormData, ValidationErrors } from '../services/auth.service';
import { validateForm, useSignupMutation } from '../services/auth.service';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const signupMutation = useSignupMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { confirmPassword, agreeToTerms, ...signupData } = formData;
      
      const response = await signupMutation.mutateAsync({
        ...signupData,
        role: 'MANAGER'
      });
      
      if (response.accessToken && response.refreshToken && response.user) {
        document.cookie = `accessToken=${response.accessToken}; path=/; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}`;
        document.cookie = `refreshToken=${response.refreshToken}; path=/; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}`;
        
        localStorage.setItem('userData', JSON.stringify(response.user));
          navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Signup failed. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-page">
      <div className="floating-icon top-left orange">
        <Database size={20} />
      </div>
      <div className="floating-icon top-right orange">
        <Database size={20} />
      </div>
      <div className="floating-icon bottom-left blue">
        <Check size={12} />
      </div>
      <div className="floating-icon bottom-right blue">
        <Check size={12} />
      </div>

      <img src={edahabyaCard} className="edahabya-card" alt="Edahabya Card" />

      <div className="login-card">
        <h2>Sign Up</h2>
        <p className="subtext">to get started</p>

        <form onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
          </div>

          {/* Last Name Field */}
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          {/* Phone Number Field */}
          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number (e.g., +213560620999)"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
          </div>
          
          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 characters)"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          {/* Confirm Password Field */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          
          {/* Terms and Conditions */}
          <div className="terms-container">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <span className="terms-text">
              I agree to the <span className="terms-link">Terms and Conditions</span>
            </span>
          </div>
          {errors.agreeToTerms && <div className="error-message">{errors.agreeToTerms}</div>}
          
          {/* General Error */}
          {errors.general && <div className="general-error">{errors.general}</div>}
          
          {/* Submit Button */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <p className="register-text">
          Already have an account? <span onClick={handleLogin}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;