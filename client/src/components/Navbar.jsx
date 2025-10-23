import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    } else if (searchQuery.length === 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  const logInHandler = () => {
    setOpen(false);
    setShowUserLogin(true);
  };

  const logOutHandler = async () => {
    try {
      const { data } = await axios.get("api/user/logout");
      if (data.success) {
        setUser(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      navigate("/");
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the click is outside the menu's container
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        className={
          "bg-white/80 backdrop-blur-xs border-b border-gray-100/10 sticky top-0 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 z-30 transition-all duration-300"
        }
      >
        {/* Left: Logo */}
        <NavLink
          to="/"
          onClick={() => {
            setOpen(false);
          }}
        >
          <img className="w-40 h-10" src={assets.logo} alt="logo" />
        </NavLink>

        {/* Center: Desktop Menu Links & Search */}
        <div className="hidden sm:flex items-center gap-8 text-lg">
          <NavLink
            className="transition-transform duration-200 hover:scale-110 font-medium hover:font-semibold"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="transition-transform duration-200 hover:scale-110 font-medium hover:font-semibold"
            to="/products"
          >
            Products
          </NavLink>
          <div className="hidden shadow-md lg:flex hover:bg-orange-300/10 hover:shadow-xl items-center text-sm gap-2 border-2 border-orange-600/90 hover:border-black/40 px-3 rounded-full">
            <input
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setSearchInput(e.target.value);
                } else {
                  setSearchQuery(e.target.value);
                }
              }}
              className="py-1.5 w-full bg-transparent text-orange-600/70 outline-none hover:border-orange-800 placeholder-gray-500/70 hover:placeholder-orange-600/50 hover:font-medium"
              type="text"
              placeholder="Search products"
            />
            <button
              className="transition hover:scale-140 cursor-pointer"
              onClick={() => setSearchQuery(searchInput)}
            >
              <img src={assets.search_icon} alt="search" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Cart & Profile/Login */}
        <div className="hidden sm:flex items-center gap-8">
          <div
            onClick={() => navigate("/wishlist")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.wishlist_icon_outline}
              alt="cart"
              className="w-6 opacity-80 transition duration-150 hover:scale-110"
            />
          </div>
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.cart}
              alt="cart"
              className="w-6 opacity-100 transition duration-150 hover:scale-110"
            />
            <button className="absolute -top-2 -right-2 text-xs justify-center items-center text-white bg-orange-500/90 w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-8 py-2.5 bg-orange-500/70 hover:bg-orange-600/80 transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <div className="relative group" ref={profileMenuRef}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <img
                  className="w-5.5 opacity-80 cursor-pointer transition duration-150 hover:scale-110"
                  src={assets.profile_icon}
                  alt="profile"
                />
              </button>
              {showProfileMenu && (
                <ul className="absolute top-10 -right-2 shadow border py-2 w-30 rounded-md z-40 text-sm bg-white/70 backdrop-blur-xl border-b border-gray-100/10">
                  <li
                    onClick={() => {
                      navigate("/myOrders");
                      setShowProfileMenu(!showProfileMenu);
                    }}
                    className="flex p-1.5 pl-3 gap-2 items-center hover:bg-orange-500/10 cursor-pointer font-medium"
                  >
                    <img className="w-4.5" src={assets.order_icon} alt="" />
                    <p>Orders</p>
                  </li>
                  <li
                    onClick={() => {
                      navigate("/wishlist");
                      setShowProfileMenu(!showProfileMenu);
                    }}
                    className="flex p-1.5 pl-3 gap-2 items-center hover:bg-orange-500/10 cursor-pointer font-medium"
                  >
                    <img
                      className="w-4.5 opacity-80"
                      src={assets.wishlist_icon_outline}
                      alt=""
                    />
                    <p>Wishlist</p>
                  </li>
                  <li
                    onClick={() => {
                      logOutHandler();
                      setShowProfileMenu(!showProfileMenu);
                    }}
                    className="flex p-1.5 pl-3 gap-2 hover:bg-orange-500/10 cursor-pointer font-medium"
                  >
                    <img
                      className="w-4.5 opacity-80"
                      src={assets.logout}
                      alt=""
                    />
                    <p>Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icons */}
        <div className="flex items-center gap-6 sm:hidden">
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img src={assets.cart} alt="cart" className="w-6 opacity-90" />
            <button className="absolute -top-2 -right-2 text-xs text-white bg-orange-400 w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>
          <button
            onClick={() => (open ? setOpen(false) : setOpen(true))}
            aria-label="Menu"
          >
            <img src={assets.menu_icon} alt="menu" />
          </button>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR & OVERLAY --- */}
      <div className={`md:hidden`}>
        {/* Background Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* The Actual Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 text-black shadow-sm p-9 flex flex-col items-start gap-4 text-base transition-transform duration-300 ease-in-out z-50 bg-white/70 backdrop-blur-xs border-b border-gray-100/30 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="flex gap-2 items-center justify-center"
          >
            <img src={assets.home} alt="home_icon" className="w-5" />
            <p>Home</p>
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className="flex gap-2 items-center justify-center"
          >
            <img
              src={assets.product_list_icon}
              alt="product_icon"
              className="w-5"
            />
            <p>Products</p>
          </NavLink>
          {user && (
            <NavLink
              to="/myOrders"
              onClick={() => setOpen(false)}
              className="flex gap-2 items-center justify-center"
            >
              <img src={assets.order_icon} alt="order_icon" className="w-5" />
              <p>Orders</p>
            </NavLink>
          )}
          <NavLink
            to="/wishlist"
            onClick={() => setOpen(false)}
            className="flex gap-2 items-center justify-center"
          >
            <img src={assets.wishlist_icon_outline} alt="order_icon" className="w-5" />
              <p>Wishlist</p>
          </NavLink>

          <div className="mt-4 w-full">
            {!user ? (
              <button
                onClick={logInHandler}
                className="cursor-pointer w-full px-6 py-2 bg-orange-500/70 hover:bg-orange-600/70 transition text-white rounded-full"
              >
                Login
              </button>
            ) : (
              <button
                onClick={logOutHandler}
                className="cursor-pointer w-full px-6 py-2 bg-orange-500/70 hover:bg-orange-600/70 transition text-white rounded-full"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
