const { NODE_ENV } = process.env
const BASE_URL = (NODE_ENV === 'production') ? 'https://api.mesto-project-36.nomoreparties.sbs' : 'http://localhost:3000';
export default BASE_URL;
