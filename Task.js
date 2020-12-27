import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage'
import { ProgressBar, Colors } from 'react-native-paper';

export default class App extends React.Component {
  state = {
    data:[
        
        
    ],
    AddPrompt : false,
    EditPrompt: false,
    tempTask : '',
    tempid: '',
    progressCheck:0,
    emptyTask: true,
    editprogressCheck: false
  }

  PromptUserInput = () => {
    this.setState({ AddPrompt: true});
  };


  deleteItem = (item) => {
    console.log('Deleting')
    console.log(this.state.data)
    const filterData = this.state.data.filter(each => each.id !== item.id);
    this.setState({data:filterData}, () => {this.saveData()})

    if (item.checked === true){
      this.setState({progressCheck:this.state.progressCheck-1},() => {this.saveData()})
    }

    if (this.state.data.length == 1){
      this.setState({emptyTask:true})
    }
  }
  

  handleClose = () => {
    this.setState({AddPrompt:false,EditPrompt:false})
  }

  handleSubmit = () => {
    //Add New Entry
    console.log("Submitted")

    if (this.state.data.length === 0){
      var previousID = 0
    } else{
      previousID = this.state.data[this.state.data.length -1].id}
    
    const newID = parseInt(previousID) + 1
    let newEntry = {
      task: this.state.tempTask,
      id:newID,
      checked:false
    }
    this.setState({data:[...this.state.data,newEntry],tempTask:"",emptyTask:false},() => {this.saveData()})
  }

  saveData = async () => {
    console.log("Saving");
     try {
        await AsyncStorage.setItem('dataset', JSON.stringify(this.state.data));
      } catch (error) {
        console.log("Error saving")
      }
    console.log(this.state.data, this.state.progressCheck)
  }

  loadData = async () => {
    try {
    const value = await AsyncStorage.getItem('dataset');
    if (value !== null) {
      console.log("Old data loaded")
      this.setState( {data: JSON.parse(value)})
    } 
   } catch (error) {
     alert("Problem retriving data");
   }
  }

  componentDidMount = () => {
    // initial load
    this.loadData();
  }

  renderUserInput = () => {
    return(
      <Dialog.Container visible={this.state.AddPrompt}>
          <Dialog.Title>New Task</Dialog.Title>
          <Dialog.Input
          placeholder = 'Type here...'
          onChangeText={ (text) => {this.setState({tempTask:text})}}
          />
          <Dialog.Button label="Cancel" onPress={this.handleClose} />
          <Dialog.Button label="Save" onPress={() => {this.handleClose();this.handleSubmit()}}/>
      </Dialog.Container>
    )

  }

  handleEdit = () => {
    console.log('Editing')
    let newEdit = {
      task: this.state.tempTask,
      id: this.state.tempid,
      checked: false
    }

   let index = this.state.data.findIndex((each) => {
        return each.id == this.state.tempid;  
      });
    let data = [...this.state.data]
    data[index] = newEdit;
    this.setState({data},() => this.saveData());
    if (this.state.editprogressCheck === true){
      this.setState({progressCheck:this.state.progressCheck-1})
    }
    this.setState({editprogressCheck:false})
    console.log(this.state.data)


  }

  renderEditInput = (item) => {
    let tempitem = this.state.data.find(each => each.id == item.id)
    let tempname = tempitem.task
    let tempID = tempitem.id
    if (item.checked === true){
      this.setState({editprogressCheck:true},() => {this.saveData()})
    }
  
    this.setState({EditPrompt:true,tempTask:tempname,tempid:tempID})
  }
    

  enableEditDialog = () => {
    return(
      <Dialog.Container visible={this.state.EditPrompt}>
          <Dialog.Title>Edit Task</Dialog.Title>
          <Dialog.Input
            defaultValue = {this.state.tempTask}
            onChangeText = {(text) => this.setState({tempTask:text})}
          />
          <Dialog.Button label="Cancel" onPress={this.handleClose} />
          <Dialog.Button label="Save" onPress={() => {this.handleClose();this.handleEdit()}}/>
      </Dialog.Container>
    )
  }
  
  toggleCheckBox = (currentItem) => {
    const todos = [...this.state.data];   
    let foundIndex = null;
    for (let i = 0; i < this.state.data.length; i++) {
      if (todos[i].id == currentItem.id) {
        foundIndex = i;
      }
    }         
    if (foundIndex != null) {
      const newTodo = {...currentItem};
      newTodo.checked = !newTodo.checked;
      if (newTodo.checked === true){
        this.setState({progressCheck:this.state.progressCheck+1},() => {this.saveData()})
      } else{
        this.setState({progressCheck:this.state.progressCheck-1},() => {this.saveData()})
      }

      todos[foundIndex]=newTodo;
    }
    this.setState({
      data: todos
    },() => this.saveData())
  }

  emptyTaskScreen = () => {
    if (this.state.emptyTask){
      return(
        <View style = {styles.emptyScreenStyle}>
          <Text> You do not have any task at the moment!</Text>
          <Text> Create one now!</Text>
        </View>
      )
    }
  }

  
  Item =({ item }) => {
  return (
    <View style={styles.listItem}>

      <TouchableOpacity onPress = {() => {this.toggleCheckBox(item)}}>
        <Ionicons name = {[item.checked? "checkmark-done-outline":'alert-outline']} color = {'#f2a5a5'} size = {20}/>
      </TouchableOpacity>

      <View style={{alignItems:"center",flex:1}}>
      
        <Text style={{fontWeight:"bold"}}>{item.task}</Text>
      </View>
      
      <TouchableOpacity onPress = {() => {this.renderEditInput(item)}}>
        <Ionicons name = 'create-outline' color = {'#f2a5a5'} size = {20}/>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {this.deleteItem(item)}}>
        <Ionicons name = 'trash-outline' color = {'#f2a5a5'} size = {20}/>
      </TouchableOpacity>
      
    </View>
  );
}
  render(){
    return (
      <View style = {styles.container}>
        <ProgressBar style = {{marginBottom:20}} progress={this.state.progressCheck>0? this.state.progressCheck/this.state.data.length:0} color={Colors.red800} />
        {this.emptyTaskScreen()}
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          
          renderItem={({ item }) => <this.Item item={item}/>}
          keyExtractor={item => item.id}
        />
        {this.enableEditDialog()}


        <View style={styles.addButtonStyle}>
          <TouchableOpacity onPress ={ () => {this.PromptUserInput()}}>
            {!!this.state.AddPrompt && this.renderUserInput()}
            <Ionicons name = 'add-circle-outline' color = {'#f2a5a5'} size = {40}/>
          </TouchableOpacity>
        </View>
        <ProgressBar style = {{marginBottom:20}} progress={this.state.progressCheck>0? this.state.progressCheck/this.state.data.length:0} color={Colors.red800} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:50

  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5,
  },
  addButtonStyle:{
    alignSelf: 'flex-end',
    marginRight:20,
    marginBottom:10
  },
  emptyScreenStyle:{
    flex: 1,
    paddingTop:100,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  }
});