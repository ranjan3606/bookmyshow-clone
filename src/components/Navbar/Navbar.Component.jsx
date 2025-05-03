import { BiChevronDown, BiMenu, BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import CustomModal from "../Modal/Modal.Component";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;

function NavSm({ defaultLocation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchRef = useRef(null);
  
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      try {
        const response = await axios.get(`/search/movie?query=${query}`);
        setSearchResults(response.data.results.slice(0, 5));
        setShowResults(true);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    } else {
      setShowResults(false);
    }
  };
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <div className="text-white flex items-center justify-between" ref={searchRef}>
        {showSearchInput ? (
          <div className="w-full relative">
            <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-md">
              <BiSearch className="text-gray-500" />
              <input
                type="search"
                className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={handleSearch}
                autoFocus
              />
              <button 
                className="text-gray-500"
                onClick={() => {
                  setShowSearchInput(false);
                  setSearchQuery("");
                  setShowResults(false);
                }}
              >
                ✕
              </button>
            </div>
            
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-20 top-10 left-0 w-full bg-white rounded-md shadow-lg py-2">
                {searchResults.map((movie) => (
                  <Link 
                    key={movie.id} 
                    to={`/movie/${movie.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => {
                      setShowResults(false);
                      setSearchQuery("");
                      setShowSearchInput(false);
                    }}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div>
              <h3 className="text-xl font-bold">It All Starts Here!</h3>
              <span className="text-gray-400 text-xs flex items-center cursor-pointer hover:text-white">
                {defaultLocation || "Select you..."} <BiChevronDown />
              </span>
            </div>
            <div 
              className="w-8 h-8 cursor-pointer"
              onClick={() => setShowSearchInput(true)}
            >
              <BiSearch className="w-full h-full" />
            </div>
          </>
        )}
      </div>
    </>
  );
}

function NavMd() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      try {
        const response = await axios.get(`/search/movie?query=${query}`);
        setSearchResults(response.data.results.slice(0, 5));
        setShowResults(true);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    } else {
      setShowResults(false);
    }
  };
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <div className="w-full relative" ref={searchRef}>
        <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-md">
          <BiSearch />
          <input
            type="search"
            className="w-full bg-transparent border-none focus:outline-none"
            placeholder="Search for movies, events, plays, sports and activities"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-20 top-10 left-0 w-full bg-white rounded-md shadow-lg py-2">
            {searchResults.map((movie) => (
              <Link 
                key={movie.id} 
                to={`/movie/${movie.id}`}
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setShowResults(false);
                  setSearchQuery("");
                }}
              >
                {movie.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function NavLg({ defaultLocation }) {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      try {
        const response = await axios.get(`/search/movie?query=${query}`);
        setSearchResults(response.data.results.slice(0, 5));
        setShowResults(true);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    } else {
      setShowResults(false);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&language=en&q=${latitude}+${longitude}`
              );

              const state = response.data.results[0].components.state;
              setLocation(state || defaultLocation);
            } catch (error) {
              console.error("Error getting user location:", error);
              setLocation(defaultLocation);
            }
          },
          (error) => {
            console.error("Error getting user location:", error);
            setLocation(defaultLocation);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser");
        setLocation(defaultLocation);
      }
    };

    getUserLocation();
  }, [defaultLocation]);

  return (
    <>
      <div className="container flex mx-auto px-4 items-center justify-between">
        <div className="flex items-center w-1/2 gap-3">
          <div className="w-10 h-10">
            <img
              src="https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png"
              alt="logo"
              className="w-full h-full"
            />
          </div>
          <div className="w-full relative" ref={searchRef}>
            <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-md">
              <BiSearch />
              <input
                type="search"
                className="w-full bg-transparent border-none focus:outline-none"
                placeholder="Search for movies, events, plays, sports and activities"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-20 top-10 left-0 w-full bg-white rounded-md shadow-lg py-2">
                {searchResults.map((movie) => (
                  <Link 
                    key={movie.id} 
                    to={`/movie/${movie.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => {
                      setShowResults(false);
                      setSearchQuery("");
                    }}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-200 text-base flex items-center cursor-pointer hover:text-white ">
            {location || "Select you..."} <BiChevronDown />
          </span>
          <CustomModal />

          <div className="w-8 h-8 text-white">
            <BiMenu className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
}

// Main NavBar Component
const Navbar = ({ defaultLocation }) => {
  return (
    <nav className="bg-darkBackground-700 px-4 py-3">
      {/* Mobile Screen Navbar */}
      <div className="md:hidden">
        <NavSm defaultLocation={defaultLocation} />
      </div>
      {/* Medium Screen Size */}
      <div className="hidden md:flex lg:hidden">
        <NavMd />
      </div>
      {/* Large Screen Size */}
      <div className="hidden md:hidden lg:flex">
        <NavLg defaultLocation={defaultLocation} />
      </div>
    </nav>
  );
};

export default Navbar;
