import { AsyncStorage } from 'react-native'
import { init, DECKS_STORAGE_KEY } from './_decks'

export function getDecks () {
  AsyncStorage.clear()
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(init)
}

export function saveDeck(key, deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}
