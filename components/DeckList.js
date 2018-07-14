import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import DeckListItem from './DeckListItem'

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    getDecks().then((decks) => dispatch(receiveDecks(decks)))
  }

  render() {
    const { decks } = this.props
    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <FlatList
          data={Object.keys(decks).map(id => { return { key: id } })}
          renderItem={({item}) => (<DeckListItem key={item.key} id={item.key}/>)}
        />
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
