import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { purple } from '../utils/colors'
import QuizCard from './QuizCard'
import QuizScore from './QuizScore'

class Quiz extends Component {

  state = {
    questionIdx: 0,
    correct: 0,
    incorrect: 0,
    showAnswer: false,
    viewResult: false
  }

  componentDidMount() {
    // Assuming the user will take the quiz
    clearLocalNotification().then(setLocalNotification)
  }

  handleToggleButton = () => {
    this.setState((state) => ({
      showAnswer: !state.showAnswer
    }))
  }

  handleAnswer = (result) => {
    this.setState((state) => ({
      questionIdx : state.questionIdx + 1,
      correct : result === 'correct' ? state.correct + 1 : state.correct,
      incorrect : result === 'incorrect' ? state.incorrect + 1 : state.incorrect,
      showAnswer: false
    }))
  }

  restart = () => {
    this.setState(() => ({
      questionIdx : 0,
      correct : 0,
      incorrect : 0,
      showAnswer: false,
      viewResult: false
    }))
  }

  render() {
    const { deckId, deck } = this.props
    const { questionIdx, showAnswer, correct, incorrect } = this.state
    const showCard = questionIdx < deck.questions.length ? true : false

    return(
      <View style={styles.center}>
        <Text style={styles.counter}>{ showCard ? questionIdx + 1 : questionIdx }/{ deck.questions.length }</Text>
        {showCard ?
            <QuizCard
              deck={deck}
              questionIdx={questionIdx}
              showAnswer={showAnswer}
              flip={this.handleToggleButton}
              mark={this.handleAnswer}
            />
          :
            <QuizScore
              deckId={deckId}
              deck={deck}
              correct={correct}
              incorrect={incorrect}
              restart={this.restart}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
    color: purple,
    fontSize: 18
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)
