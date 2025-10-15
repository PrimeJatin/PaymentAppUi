import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  // State to track whether the current screen size matches the query
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // 1. Create a media query list object from the query string (e.g., '(min-width: 1024px)')
    const media = window.matchMedia(query);
    
    // 2. Initial check: Set the state based on the initial screen size
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // 3. Define the listener function that updates state when the size changes
    const listener = () => setMatches(media.matches);

    // 4. Attach the listener for changes
    // Using the modern addEventListener method for media queries
    media.addEventListener('change', listener);

    // 5. Cleanup function: Remove the listener when the component unmounts
    return () => media.removeEventListener('change', listener);
    
  }, [matches, query]); // Dependency array: re-run if the query changes
  
  return matches;
};

export default useMediaQuery;