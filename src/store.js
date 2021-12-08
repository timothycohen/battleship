import { writable } from "svelte/store";

export const players = writable()

export const view = writable('new')

export const boards = writable([])

export const playerUp = writable()
