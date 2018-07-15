import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {white, purple} from '../utils/colors'
import {withNavigation} from "react-navigation";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params
    return {
      title: deckName
    }
  }

  render() {
    const { deckId } = this.props
    const { title, questions } = this.props.deck
    return (
      <View style={styles.deck}>
        <Text>{title}</Text>
        <Text>{questions.length}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('AddCard', {deckId: deckId})}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: purple}]}>
          <Text style={{color: white}}>Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId],
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: white,
    borderRadius: 16,
    borderColor: purple,
    borderWidth: 1,
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
    deck: state[deckId],
  }
}

export default connect(mapStateToProps)(Deck)
