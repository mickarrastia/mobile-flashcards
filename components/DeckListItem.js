import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { white, purple } from '../utils/colors'
import { withNavigation } from 'react-navigation'

class DeckListItem extends Component {
  render() {
    const { id, title, cardCount, navigation } = this.props
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Deck', {deckId: id, deckName: title})}>
        <Text>{title}</Text>
        <Text style={{marginTop: 10}}>{cardCount} {cardCount === 1 ? `card` : `cards`}</Text>
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(decks, props) {
  const { id } = props
  return {
    id: id,
    title: decks[id].title,
    cardCount: decks[id].questions.length
  }
}

const styles = StyleSheet.create({
  item: {
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

export default withNavigation(connect(mapStateToProps)(DeckListItem))
