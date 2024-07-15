import axios from "axios";
import { Photo } from "../App/App.type";

const API_KEY = "VpFMteQPlMd_SzGGuVteYDkRgFOFataPOK9OTRx35JY";
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
}

interface SearchPhotosResponse {
  total_pages: number;
  results: Photo[];
}

export const getPhotos = async (
  query: string,
  page: number
): Promise<SearchPhotosResponse> => {
  const { data } = await axios.get<SearchPhotosResponse>("/search/photos", {
    params: {
      query,
      page,
    },
  });

  return data;
}
