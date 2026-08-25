import { useState, useEffect } from "react";

//accept initial value and key to store
//using this for dark mode setting
export function useLocalStorageState(initialValue, key) {
  //define a callback function as initial value
  //try to get the key value from storage and return either it or default value
  const [value, setValue] = useState(function () {
    //get key value from storage
    const storedValue = localStorage.getItem(key);
    //return the value if found; otherwise return default\
    //parse from JSON in case its an object
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  //any time the key or value passed into hook change, set the value into local storage
  //stringify in case it's an object
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );

  return [value, setValue];
}
