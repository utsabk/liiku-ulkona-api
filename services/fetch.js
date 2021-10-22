'use strict';
import fetch from 'node-fetch';

const fetchResources = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Couldn't fetch:", err);
  }
};

export default fetchResources;
