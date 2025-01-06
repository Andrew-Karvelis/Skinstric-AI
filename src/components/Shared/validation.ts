export const validateInput = (value: string): string | null => {
    const invalidPattern = /\d|[^a-zA-Z\s]/; // Disallow numbers and special characters
    if (invalidPattern.test(value)) return "Input must only contain letters and spaces.";
    return null;
  };
  