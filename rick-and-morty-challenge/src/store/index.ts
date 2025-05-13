import { defineStore } from "pinia";

// Interfaces
import { IGeneralInfos } from "@interfaces/index";
import { Character } from "@interfaces/character";
import { Episode } from "@interfaces/episode";
import { Location } from "@interfaces/location";

import * as service from "../api/rickAndMortyAPI";

//RNM = Rick and Morty
export const useRNMStore = defineStore("RNM", {
  state: () => ({
    characters: new Array() as Character[],
    locations: new Object() as Location[],
    episodes: new Object() as Episode[],
    infos: new Object() as IGeneralInfos,
  }),
  getters: {
    _characters(): Character[] {
      return this.characters;
    },
    _locations(): Location[] {
      return this.locations;
    },
    _episodes(): Episode[] {
      return this.episodes;
    },
    _infos(): IGeneralInfos {
      return this.infos;
    },
  },
  actions: {
    async getCharacters() {
      try {
        const data = await service.getCharacters();
        this.characters = data.results;
        this.infos = data.info;
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    },
    async getCharactersByPage(payload: string) {
      try {
        const data = await service.getCharactersByPage(payload);
        this.characters = data.results;
        this.infos = data.info;
      } catch (error) {
        console.error("Error fetching characters by page:", error);
      }
    },
    async getLocations() {
      try {
        const data = await service.getLocations();
        this.locations = data.results;
        this.infos = data.info;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    },
    async getEpisodes() {
      try {
        const data = await service.getEpisodes();
        this.episodes = data.results;
        this.infos = data.info;
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    },
    async filterCharacters(payload: string) {
      try {
        const data = await service.filterCharacters(payload);
        if (data.results.length) {
          this.characters = data.results;
          this.infos = data.info;
        }
      } catch (error) {
        console.error("Error filtering characters:", error);
      }
    },
  },
});
