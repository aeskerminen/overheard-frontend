import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../reducers/postsSlice";
import { fetchLocation } from "../reducers/locationSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  useEffect(() => {
    if (location === null) {
      dispatch(fetchLocation());
    }
    if (location !== null) dispatch(fetchPosts(location.name));
  }, [dispatch, location]);

  if (location === null)
    return (
      <div
        className="flex flex-row justify-center items-center p-2 text-white"
        style={{ backgroundColor: "#3D3D3D" }}
      >
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div
      className="flex flex-row justify-center items-center p-2 text-white"
      style={{ backgroundColor: "#3D3D3D" }}
    >
      <h1>{location.name}</h1>
    </div>
  );
};

export default Navbar;
