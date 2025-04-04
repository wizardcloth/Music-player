import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://music-player-psi-kohl.vercel.app/api', 
});

export default axiosInstance;