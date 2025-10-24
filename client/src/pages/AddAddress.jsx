import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border shadow-sm border-orange-700/30 rounded outline-none placeholder:text-gray-500/80 focus:placeholder:text-orange-500/80 text-orange-600/90 focus:border-gray-500/70 focus:shadow-md transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const { user, navigate, axios } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        navigate("/cart");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("User login required");
      navigate("/cart");
    }
  }, []);

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add <span className="font-semibold text-orange-500/70">Shipping Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-6">
        <div className="flex-1 max-w-md">
          <form className="space-y-3 mt-6 text-sm" onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email Address"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="number"
                placeholder="Zipcode"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone"
            />

            <button className="w-full mt-6 shadow-md bg-orange-500/70 text-white py-3 hover:bg-orange-600/80 transition cursor-pointer rounded-lg uppercase">
              Save Address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-10 md:mt-0"
          src={assets.add_address_image}
          alt="add_address_image"
        />
      </div>
    </div>
  );
};

export default AddAddress;
