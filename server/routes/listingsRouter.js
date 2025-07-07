import express from 'express';
import { getListings, getListing, createListing, updateListing, deleteListing } from '../controllers/listingController.js';
const listingsRouter = express.Router();

listingsRouter.get('/', getListings);
listingsRouter.get('/:id', getListing);
listingsRouter.post('/', createListing);
listingsRouter.put('/:id', updateListing);
listingsRouter.delete('/:id', deleteListing);

export default listingsRouter;