export const getListings = (req, res) => {
    res.send('GET all listings');
};
export const getListing = (req, res) => {
    res.send('GET a single listing');
};
export const createListing = (req, res) => {
    res.send('CREATE a new listing');
};
export const updateListing = (req, res) => {
    res.send('UPDATE a listing');
};
export const deleteListing = (req, res) => {
    res.send('DELETE a listing');
}