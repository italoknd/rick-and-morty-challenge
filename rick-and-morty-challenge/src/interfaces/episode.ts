export interface Episode {
  name: string;
  air_date: string;
  episode: string;
}
export interface EpisodeResponse {
  data: {
    episodesByIds: Episode[];
  };
}
