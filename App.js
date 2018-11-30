import React, { Component } from 'react';
import {
  Alert, AppRegistry, Button, View, StyleSheet, Text,
  TextInput, Image, ImageBackground, ScrollView
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { styles } from './styles.js';
import connect from './apiConnection.js';

export default class setting extends Component {

  state = {
    gameStarted: false,
    text: '',
    words: ['thief', 'nail', 'boot', 'staff', 'root', 'water', 'teacher',
      'knife', 'suit', 'snowman', 'pupil', 'ham', 'gold', 'death',
      'dinosaur', 'ground', 'button', 'stream', 'train', 'satellite',
      'cold', 'capital', 'boom', 'jet', 'face'],
    labels: ['R', 'B', 'N', 'N', 'B', 'B', 'N', 'R', 'R', 'B', 'R', 'R',
      'B', 'R', 'B', 'N', 'B', 'N', 'R', 'A', 'R', 'B', 'N', 'N', 'B',],
  }

  add = () => {
    if (this.state.text !== '') {
      this.state.words.push(this.state.text)
      this.state.labels.push("N")
    }
    this.state.text = ""
    this.textInput.clear()

    this.forceUpdate()
  }

  startGame = () => {
    this.setState({
      gameStarted: true
    })
    console.log(this.state)
  }
  hint = () => {
    console.log(JSON.stringify(this.state.words))
    console.log(JSON.stringify(this.state.labels))
    // this.state.words = []
    // this.state.labels = []
    // this.forceUpdate()
    Alert.alert(
      'Which team do you want to generate a clue for?',
      '',
      [
        { text: 'Cancel', onPress: () => console.log('Ask me later pressed'), style: 'cancel' },
        {
          text: 'Blue Team', onPress: () => {
            connect(this.state.words, this.state.labels, "blue")
          }
        },
        {
          text: 'Red Team', onPress: () => {
            connect(this.state.words, this.state.labels, "red")
          }
        },
      ],
      { cancelable: false }
    )
  }

  labelChange(index) {
    labelList = ['N', 'B', 'R', 'A']
    this.state.labels[index] = labelList[(labelList.indexOf(this.state.labels[index]) + 1) % 4]
    this.forceUpdate()
  }

  wordBackground(index) {
    if (this.state.labels[index] === "B") {
      return styles.Blue;
    }
    if (this.state.labels[index] === "R") {
      return styles.Red;
    }
    if (this.state.labels[index] === "A") {
      return styles.Assassin;
    }
    if (this.state.labels[index] === "N") {
      return styles.Neutral;
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>

        {/* Title Bar */}
        <View style={{
          height: 60, flexDirection: 'row',
          justifyContent: 'center', backgroundColor: '#393D46'
        }}>
          <Text style={{
            textAlignVertical: 'bottom', fontSize: 20, color: 'white',
            fontWeight: 'bold', fontFamily: 'monospace', paddingBottom: 5
          }}>
            SpyMaster
          </Text>
        </View>

        {/* List of inputted words */}
        <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}>
          {this.state.words.map((item, key) => (
            <Text key={key} onPress={() => { this.labelChange(key) }}
              style={this.wordBackground(key)}>
              {key + 1 + ". " + item}
            </Text>)
          )}
          <View style={{ height: 10 }}/>
          {/* This adds padding to the bottom of the list */}
        </ScrollView>

        {/* Text Input Field, this is a javascript hack for conditional display */}
        {!this.state.gameStarted &&
          <View style={{
            height: 40, flexDirection: 'column',
            backgroundColor: '#393D46', paddingLeft: 10, paddingTop: 10
          }}>
            <TextInput
              style={{ color: 'white' }}
              ref={text => { this.textInput = text }}
              placeholder="Type Your Word Here!"
              onChangeText={(text) => this.setState({ text })}
            />
          </View>
        }

        {/* Button */}
        <View style={{
          height: 55, flexDirection: 'row', paddingTop: 10, paddingBottom: 10,
          justifyContent: 'center', backgroundColor: '#393D46'
        }}>
          <View style={styles.buttonContainer}>
            <Button
              title={this.state.gameStarted ? 'Get Hint' : 'Add Word'}
              color='#585858'
              onPress={this.add}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={this.state.gameStarted ? 'End Game' : 'Start Game'}
              color='#585858'
              onPress={this.state.gameStarted ? this.hint : this.startGame}
            />
          </View>

        </View>

      </KeyboardAvoidingView>
    );
  }
}
