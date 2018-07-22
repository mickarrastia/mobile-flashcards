import { AsyncStorage } from 'react-native'
import { init, DECKS_STORAGE_KEY } from './_decks'

export function getDecks () {
  // This is helpful during development
  // AsyncStorage.clear()
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(init)
}

export function saveDeck(key, deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function saveCard(key, question, answer) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
    let decks = JSON.parse(result)
    decks[key].questions.concat({question: question, answer: answer})
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      decks
    }))
  })
}
