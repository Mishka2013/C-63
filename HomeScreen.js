import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
       isSearchedPressed: false,
              word: '',
              lexicalCategory: '',
              examples: '',
              definition: '',
              };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        var lexicalCategory = response[0].meanings[0].partOfSpeech
        var example = response[0].meanings[0].definitions[0].example
      
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
          lexicalCategory:lexicalCategory,
          examples:example
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'blue'}
          centerComponent={{
            text: 'Pocket Dictionary',

            style: {fontWeight: 'bold', color: 'orange', fontSize:19, fontFamily: 'ALGERIAN' },
          }}
          />

        <TextInput
          style={styles.inputBox}
          placeholder = ""
          onChangeText={(text) => {
            this.setState({
              text: text
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}> Search ._.</Text>{' '}
        </TouchableOpacity>

        <Text style={{ color: 'yellow', fontSize: 18 , fontWeight:"bold"}}>WORD :{this.state.word}</Text>
        
        <Text style={{ color: 'yellow', fontSize: 18 , fontWeight:"bold", marginTop:20}}>DEFINITION:{this.state.definition}</Text>
         <Text style={{ color: 'yellow', fontSize: 18 , fontWeight:"bold", marginTop:20}}>PART OF SPEECH :{this.state.lexicalCategory}</Text>
         <Text style={{ color: 'yellow', fontSize: 18 , fontWeight:"bold", marginTop:20}}>EXAMPLES :'{this.state.examples}'</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'lime',
    outline: 'none',
  },
  searchButton: {
    width: 100,
    height: 80,
    alignSelf: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'lime',
    backgroundColor: 'white'
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'times',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    textShadowColor: 'orange'
  },
});
