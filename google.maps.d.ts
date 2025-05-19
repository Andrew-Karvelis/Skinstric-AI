// src/types/google.maps.d.ts or another location in your project
declare global {
    interface Window {
      google: typeof google;
    }
  }
  
  export {}; // This ensures the file is treated as a module
  