import { writable } from "svelte/store";

export const players = writable([])

export const view = writable('new')

export const boards = writable([])

export const playerUp = writable(0)

export const boardSize = writable(8);

export const numberOfShips = writable(5);

export const lastAttackLocation = writable([])

export const twoPlayerMode = writable(true)

export const quickStart = writable(false);

export const audio = writable(true);
