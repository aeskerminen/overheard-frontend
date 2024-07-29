import { createSlice } from "@reduxjs/toolkit";
import { getLocation } from "../services/serviceHandler";

const locationSlice = createSlice({
  name: "location",
  initialState: null,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
});

export const { set } = locationSlice.actions;

export const fetchLocation = () => {
  return async (dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        getLocation(loc.coords.latitude, loc.coords.longitude)
          .then((res) => {
            dispatch(set(res.data));
            console.log(res.data);
          })
          .catch((err) => {
            console.log("Error fetching location from server: ", err);
          });
      },
      () => {
        console.log("Geolocation is not supported by this browser.");
      },
      { enableHighAccuracy: true }
    );
  };
};

export default locationSlice.reducer;
