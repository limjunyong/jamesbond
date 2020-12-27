import React from 'react';
import {View,Text,StyleSheet,TouchableHighlight} from 'react-native';
import moment from 'moment';

export default class App extends React.Component{

state = {
    TempMinutes:15,
    TempSeconds:0,
    countDown:moment.duration().add({minutes:15,seconds:0}),
    running: false,
    tempCount: false
    };
    Timer = null

    startStopTimer = () => {
      console.log(this.state.running)
      if (this.state.tempCount == false){
      this.setState({
        tempCount:true})
        }

        //stop button is pressed; if running is true
        if (this.state.running){
          console.log("Stopped")
          clearInterval(this.Timer)
          this.setState({running:!this.state.running})
          return;         
        } else{

        console.log("Running....")
        this.setState({running:!this.state.running})
        console.log(this.state.countDown)
        this.Timer = setInterval(() => {
            if (this.state.countDown <= 0){ //timer runs out
                clearInterval(this.Timer)
                Alert.alert("Time is up")
            } else {
              
                this.state.countDown = this.state.countDown.subtract(1,'s')
                const hours = this.state.countDown.hours()
                const minutes = this.state.countDown.minutes()
                const seconds = this.state.countDown.seconds()
                this.setState({
                    TempHours: hours, TempMinutes: minutes, TempSeconds:seconds})}
            },1000)}}
          
    resetTimer = () =>{
      if (!this.state.running){
        console.log("Reset")
        clearInterval(this.Timer)
        this.setState({TempMinutes:15,TempSeconds:0,countDown:moment.duration().add({minutes:15,seconds:0}),tempCount:false})
      }}


 render(){
        return(
        <View style = {styles.containerStyle}>
            <Text style = {styles.timerStyle}> {` ${this.state.TempMinutes} : ${this.state.TempSeconds}`} </Text>
           
            <View style = {styles.buttonRowStyle}>
              <TouchableHighlight 
              onPress = {this.resetTimer} 
              style = {styles.resetButtonStyle}
              underlayColor='#fff'
              > 
                <Text style = {styles.textStyle}> Reset </Text> 
              </TouchableHighlight> 

              <TouchableHighlight onPress = {this.startStopTimer} style = {styles.startButtonStyle}>
                <Text style = {styles.textStyle}> {this.state.running? 'Stop':'Start'} </Text>
              </TouchableHighlight>

            </View>
        </View>
        )}}

const styles = StyleSheet.create({

    containerStyle:{
        flexDirection: 'column',
        justifyContent:'space-around',
        paddingBottom: 200,
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1
    },
    timerStyle:{
        padding: 30,
        fontSize: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    resetButtonStyle:{
      height: 80, 
      width: 80, 
      borderRadius:40,
      borderWidth: 1, 
      borderColor: '#f2a5a5', 
      alignItems:'center',
      justifyContent: 'center',
      marginRight:20

    },
    startButtonStyle:{
      height: 80, 
      width: 80, 
      borderRadius:40,
      borderWidth: 1, 
      borderColor: '#f2a5a5', 
      alignItems:'center',
      justifyContent: 'center',
      marginLeft:20

    },

    buttonRowStyle: {
        paddingTop: 50,
        flexDirection: 'row',
        alignContent: 'flex-end',
        justifyContent: 'center'

    },

    textStyle: {
      fontWeight: 'bold'
    }





})