import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export function createLocalStorageStore(key: string) {
  const store = writable<string | null>();
  if (browser) {
    store.set(localStorage.getItem(key))
    store.subscribe(currentValue => {
      localStorage.setItem(key, currentValue ?? "");
    });
  }
  return store;
}
