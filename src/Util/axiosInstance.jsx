import axios from "axios";

export const instance = (data) =>
  axios.create({
    url: "https://cors-anywhere.herokuapp.com",
    headers: {
      "cache-control": "no-cache",
      "x-apikey": "260c55e44fcc603351421cc1b2c70921bdf32",
    },
    data: data,
  });
