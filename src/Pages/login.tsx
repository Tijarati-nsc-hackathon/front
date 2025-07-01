import React, { useState } from "react";
import { Check, Database } from "lucide-react";
import edahabyaCard from "../Components/assets/edahabya.png";
import "./CSS/Login.css";
import { useNavigate } from "react-router-dom";
import { useApiMutation } from '../api/useApiCall.tsx';

interface LoginFormData {
  email: string;
  password: string;
}
interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    role: "MANAGER" | "ADMIN";
    name: string;
  };
  token?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const signinMutation = useApiMutation<
    {
      accessToken: string;
      refreshToken: string;
      user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        role: string;
      };
    },
    LoginFormData
  >('/auth/signin', 'post');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user types
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setErrors({});
    signinMutation.mutate(formData, {
      onSuccess: (response) => {
        if (response && response.accessToken && response.refreshToken && response.user) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('userData', JSON.stringify(response.user));

          if (response.user) {
            navigate('/dashboard');
          }
        } else {
          setErrors({ general: 'Login failed: Invalid response from server.' });
        }
      },
      onError: (error: any) => {
        setErrors({ general: error?.response?.data?.message || 'Login failed' });
      },
    });
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      {/* Floating icons with different types */}
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

      {/* Edahabya Card */}
      <img src={edahabyaCard} className="edahabya-card" alt="Edahabya Card" />

      {/* Login Card */}
      <div className="login-card">
        <h2>Login</h2>
        <p className="subtext">to get started</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            placeholder="exemple@exemple.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={signinMutation.status === 'pending'}
          />
          {errors.email && (
            <div
              style={{ color: "#e74c3c", fontSize: "13px", marginTop: "5px" }}
            >
              {errors.email}
            </div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={signinMutation.status === 'pending'}
          />
          {errors.password && (
            <div
              style={{ color: "#e74c3c", fontSize: "13px", marginTop: "5px" }}
            >
              {errors.password}
            </div>
          )}

          {signinMutation.isError && (
            <div
              style={{
                color: "#e74c3c",
                fontSize: "14px",
                textAlign: "center",
                margin: "10px 0",
              }}
            >
              {errors.general || 'Login failed'}
            </div>
          )}

          <div className="forgot">Forgot Password?</div>
          <button type="submit" disabled={signinMutation.status === 'pending'}>
            {signinMutation.status === 'pending' ? "Signing in..." : "Continue"}
          </button>
        </form>

        <p className="register-text">
          New User? <span onClick={handleRegister}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

