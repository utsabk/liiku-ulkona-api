'use strict';
import fetch from 'node-fetch';
import fetchResources from './fetch.js';

const URL = `${process.env.API_URL}categories?lang=en`;

const getCategories = async (req, res) => {
  const categories = await fetchResources(URL);
  return categories;
};

export { getCategories };
