import { writable } from "svelte/store";

export const players = writable([])

export const view = writable('new')

export const boards = writable([])

export const playerUp = writable(0)

export const boardSize = 8;

export const lastAttackLocation = writable([])

export const twoPlayerMode = writable(true)
