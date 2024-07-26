import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../reducers/postsSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          const lat = Math.round(res.coords.latitude);
          const lon = Math.round(res.coords.longitude);

          console.log(lat, lon);
        },
        (err) => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [dispatch]);

  return (
    <div
      className="flex flex-row justify-center items-center p-2 text-white"
      style={{ backgroundColor: "#3D3D3D" }}
    >
      <h1>{"location"}</h1>
    </div>
  );
};

export default Navbar;
