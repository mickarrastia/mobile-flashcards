import {RECEIVE_DECKS, ADD_DECK, ADD_CARD} from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deckId]: action.deck
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          title: state[action.deckId].title,
          questions: state[action.deckId].questions.concat({
            question: action.question,
            answer: action.answer
          })
        }
      }
    default:
      return state
  }
}

export default decks
