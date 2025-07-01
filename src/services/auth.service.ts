import { useApiMutation } from '../api/useApiCall.tsx';

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  agreeToTerms: boolean;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  agreeToTerms?: string;
  general?: string;
}

export interface SignupResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: 'ADMIN' | 'MANAGER';
  };
}

// Validation regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

// Validation functions
export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  return undefined;
};

export const validateConfirmPassword = (confirmPassword: string, password: string): string | undefined => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (confirmPassword !== password) {
    return 'Passwords do not match';
  }
  return undefined;
};

export const validateFirstName = (firstName: string): string | undefined => {
  if (!firstName.trim()) {
    return 'First name is required';
  }
  return undefined;
};

export const validateLastName = (lastName: string): string | undefined => {
  if (!lastName.trim()) {
    return 'Last name is required';
  }
  return undefined;
};

export const validatePhoneNumber = (phoneNumber: string): string | undefined => {
  if (!phoneNumber.trim()) {
    return 'Phone number is required';
  }
  if (!phoneRegex.test(phoneNumber)) {
    return 'Please enter a valid phone number';
  }
  return undefined;
};

export const validateAgreeToTerms = (agreeToTerms: boolean): string | undefined => {
  if (!agreeToTerms) {
    return 'You must agree to the terms and conditions';
  }
  return undefined;
};

export const validateForm = (formData: SignupFormData): ValidationErrors => {
  const newErrors: ValidationErrors = {};
  
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);
  const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
  const firstNameError = validateFirstName(formData.firstName);
  const lastNameError = validateLastName(formData.lastName);
  const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
  const agreeToTermsError = validateAgreeToTerms(formData.agreeToTerms);
  
  if (emailError) newErrors.email = emailError;
  if (passwordError) newErrors.password = passwordError;
  if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
  if (firstNameError) newErrors.firstName = firstNameError;
  if (lastNameError) newErrors.lastName = lastNameError;
  if (phoneNumberError) newErrors.phoneNumber = phoneNumberError;
  if (agreeToTermsError) newErrors.agreeToTerms = agreeToTermsError;
  
  return newErrors;
};

export const useSignupMutation = () => {
  return useApiMutation<SignupResponse, Omit<SignupFormData, 'confirmPassword' | 'agreeToTerms'> & { role: 'MANAGER' }>(
    '/auth/signup',
    'post'
  );
}; 