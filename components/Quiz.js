import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import {red, green, white, purple} from '../utils/colors'

class Quiz extends Component {

  state = {
    questionIdx: 0,
    correct: 0,
    incorrect: 0,
    showAnswer: false,
    viewResult: false
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
    //TODO: currently this is a bit of a dump. Needs refactoring into components and functions

    const { deckId, deck, navigation } = this.props
    const { questionIdx, showAnswer } = this.state
    const showCard = questionIdx < deck.questions.length ? true : false

    return(
      <View style={styles.quiz}>
        <Text style={styles.counter}>{showCard ? questionIdx + 1 : questionIdx}/{deck.questions.length}</Text>
        {showCard ?
            <View style={styles.quiz}>
              <Text>{showAnswer ? deck.questions[questionIdx].answer : deck.questions[questionIdx].question}</Text>
              <TextButton
                onPress={this.handleToggleButton}
                style={{marginTop: 20, marginBottom: 50}}
              >{showAnswer ? 'Question' : 'Answer'}</TextButton>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleAnswer('correct')}
              >
                <Text style={{color: white}}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: red}]}
                onPress={() => this.handleAnswer('incorrect')}
              >
                <Text style={{color: white}}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          :
            <View style={styles.quiz}>
              <Text>Correct: {this.state.correct}</Text>
              <Text>Incorrect: {this.state.incorrect}</Text>
              <Text>{Math.round((this.state.correct/deck.questions.length)*100)}%</Text>

              <TouchableOpacity
                style={[styles.button, {backgroundColor: purple, marginTop: 25}]}
                onPress={this.restart}
              >
                <Text style={{color: white}}>Restart Quiz</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, {backgroundColor: white, marginTop: 25}]}
                onPress={() => navigation.navigate('Deck', {deckId: deckId, deckName: deck.title})}
              >
                <Text style={{color: purple}}>Back to Deck</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quiz: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: green,
    borderRadius: 16,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center'
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
