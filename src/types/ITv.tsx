import IEpisodeRunTime from "./IEpisodeRunTime";
import ISeason from "./ISeason";

export default interface ITv {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: [];
  id: number;
  origin_country: [];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title?: string;
  original_name?: string;
  name?: string;
  vote_average: number;
  vote_count: number;
  seasons: ISeason[];
  episode_run_time: IEpisodeRunTime[];
}
