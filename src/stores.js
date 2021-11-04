import { writable } from "svelte/store";

export const level = writable(0);

export const crntFB = writable(null);
export const crntKB = writable(null);
