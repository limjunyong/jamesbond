import React from 'react';
import {View,Text,StyleSheet,TouchableHighlight} from 'react-native';
import moment from 'moment';
import LongBreak from './LongBreak';
import ShortBreak from './ShortBreak';
import PomodoroBreak from './Pomodoro';
import CustomBreak from './CustomBreak';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component{

  state = {
    emptyScreentoggle: true,
    longBreaktoggle: false,
    shortBreaktoggle:false,
    pomodoroBreaktoggle:false,
    custombreaktoggle:false
  }

  longBreak = () => {
    if (this.state.longBreaktoggle == true){
      return(
        <LongBreak/>
      )}
  }

  shortBreak = () => {
    if (this.state.shortBreaktoggle == true){
      return(
        <ShortBreak/>
      )
    }
  }

  pomodoroBreak = () => {
    if (this.state.pomodoroBreaktoggle == true){
      return(
        <PomodoroBreak/>
      )
    }
  }

  customBreak = () => {
    if (this.state.custombreaktoggle == true){
      return(
        <CustomBreak/>
      )
    }
  }


  emptyScreen = () => {
    if (this.state.emptyScreentoggle == true){
      return(
        <View style ={styles.emptyScreenStyle}>
          <Text> Start a Timer Now! </Text>
        </View>
      )}
  }
  render(){
    return(
      <View style = {styles.containerstyle}>
          <TouchableHighlight onPress = {()=> {this.setState({emptyScreentoggle:true,longBreaktoggle:false,shortBreaktoggle:false,pomodoroBreaktoggle:false,custombreaktoggle:false})}}>
              <Ionicons name = 'home-outline' color = {'#f2a5a5'} size = {30}/>
          </TouchableHighlight>
        <View style={styles.buttonColumnStyle}>

            <TouchableHighlight onPress = {()=> {this.setState({emptyScreentoggle:false,longBreaktoggle:false,shortBreaktoggle:true,pomodoroBreaktoggle:false,custombreaktoggle:false})}}>
              <Ionicons name = 'remove-outline' color = {'#f2a5a5'} size = {40}/>
            </TouchableHighlight>

            <TouchableHighlight onPress = {()=> {this.setState({emptyScreentoggle:false,longBreaktoggle:true,shortBreaktoggle:false,pomodoroBreaktoggle:false,custombreaktoggle:false})}}>
              <Ionicons name = 'reorder-two-outline' color = {'#f2a5a5'} size = {40}/>
            </TouchableHighlight>

            <TouchableHighlight onPress = {()=> {this.setState({emptyScreentoggle:false,longBreaktoggle:false,shortBreaktoggle:false,pomodoroBreaktoggle:true,custombreaktoggle:false})}}>
              <Ionicons name = 'reorder-three-outline' color = {'#f2a5a5'} size = {40}/>
            </TouchableHighlight>

            <TouchableHighlight onPress = {()=> {this.setState({emptyScreentoggle:false,longBreaktoggle:false,shortBreaktoggle:false,pomodoroBreaktoggle:false,custombreaktoggle:true})}}>
              <Ionicons name = 'reorder-four-outline' color = {'#f2a5a5'} size = {40}/>
            </TouchableHighlight>




          </View>
        {this.emptyScreen()}
        {this.longBreak()}
        {this.shortBreak()}
        {this.pomodoroBreak()}
        {this.customBreak()}
        
      </View>

    )
  }}

const styles = StyleSheet.create({
  containerstyle :{
    flex: 1,
    backgroundColor: 'white',
    paddingTop:40,
    marginLeft:20
  },
  buttonColumnStyle:{
    alignSelf: 'flex-end',
    marginTop: -5,
  },
  emptyScreenStyle:{
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom:100,
    backgroundColor:'white'
    }
})