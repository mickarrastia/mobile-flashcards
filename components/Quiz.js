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

  render() {
    const { deck } = this.props
    const { questionIdx, showAnswer } = this.state
    const showResult = questionIdx < deck.questions.length ? true : false

    return(
      <View style={styles.quiz}>
        {showResult
          ?
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
