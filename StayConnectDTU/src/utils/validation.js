/**
 * Email validation utility functions
 * Provides comprehensive email validation for both signup and login forms
 */

/**
 * Validates email format using regex pattern
 * @param {string} email - The email to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
export const isValidEmailFormat = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Comprehensive email regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  return emailRegex.test(email.trim());
};

/**
 * Validates email for common issues and provides detailed error messages
 * @param {string} email - The email to validate
 * @returns {object} - Object with isValid boolean and error message if invalid
 */
export const validateEmail = (email) => {
  // Check if email is provided
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  const trimmedEmail = email.trim();

  // Check email length
  if (trimmedEmail.length > 254) {
    return {
      isValid: false,
      error: 'Email is too long (maximum 254 characters)'
    };
  }

  // Check for basic format issues
  if (!trimmedEmail.includes('@')) {
    return {
      isValid: false,
      error: 'Email must contain @ symbol'
    };
  }

  if (!trimmedEmail.includes('.')) {
    return {
      isValid: false,
      error: 'Email must contain a domain (e.g., .com, .org)'
    };
  }

  // Check for common invalid patterns
  if (trimmedEmail.startsWith('@') || trimmedEmail.endsWith('@')) {
    return {
      isValid: false,
      error: 'Email cannot start or end with @ symbol'
    };
  }

  if (trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
    return {
      isValid: false,
      error: 'Email cannot start or end with a dot'
    };
  }

  // Check for consecutive dots
  if (trimmedEmail.includes('..')) {
    return {
      isValid: false,
      error: 'Email cannot contain consecutive dots'
    };
  }

  // Check for spaces
  if (trimmedEmail.includes(' ')) {
    return {
      isValid: false,
      error: 'Email cannot contain spaces'
    };
  }

  // Final regex validation
  if (!isValidEmailFormat(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates email specifically for DTU domain (optional enhancement)
 * @param {string} email - The email to validate
 * @param {boolean} requireDTU - Whether to require DTU domain
 * @returns {object} - Object with isValid boolean and error message if invalid
 */
export const validateDTUEmail = (email, requireDTU = false) => {
  // First do basic email validation
  const basicValidation = validateEmail(email);
  if (!basicValidation.isValid) {
    return basicValidation;
  }

  // If DTU domain is required, check for it
  if (requireDTU) {
    const trimmedEmail = email.trim().toLowerCase();
    const dtuDomains = ['dce.ac.in', 'dtu.ac.in', 'dce.edu'];
    const hasDTUDomain = dtuDomains.some(domain => trimmedEmail.endsWith(`@${domain}`));
    
    if (!hasDTUDomain) {
      return {
        isValid: false,
        error: 'Please use your DTU email address'
      };
    }
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Real-time email validation for form inputs
 * @param {string} email - The email to validate
 * @param {string} fieldName - Name of the field for error context
 * @returns {object} - Object with validation state and error message
 */
export const getEmailValidationState = (email, fieldName = 'Email') => {
  if (!email || email.trim() === '') {
    return {
      isValid: null, // null means not validated yet
      error: null,
      showError: false
    };
  }

  const validation = validateEmail(email);
  
  return {
    isValid: validation.isValid,
    error: validation.error,
    showError: !validation.isValid && email.trim().length > 0
  };
}; 