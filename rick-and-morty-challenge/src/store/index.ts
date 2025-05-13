import { defineStore } from "pinia";

// Interfaces
import { CharacterResponse } from "@interfaces/character";
import { EpisodeResponse } from "@interfaces/episode";
import { LocationResponse } from "@interfaces/location";

import * as service from "../api/rickAndMortyAPI";

//RNM = Rick and Morty
export const useRNMStore = defineStore("RNM", {
  state: () => ({
    characters: new Object() as CharacterResponse,
    locations: new Object() as LocationResponse,
    episodes: new Object() as EpisodeResponse,
  }),
  getters: {
    _characters(): CharacterResponse {
      return this.characters;
    },
    _locations(): LocationResponse {
      return this.locations;
    },
    _episodes(): EpisodeResponse {
      return this.episodes;
    },
  },
  actions: {
    async getCharacters() {
      try {
        const data = await service.getCharacters();
        this.characters = data;
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    },
    async getLocations() {
      try {
        const data = await service.getLocations();
        this.locations = data;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    },
    async getEpisodes() {
      try {
        const data = await service.getEpisodes();
        this.episodes = data;
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    },
  },
});
