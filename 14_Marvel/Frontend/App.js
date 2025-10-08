import {useState,useEffect} from 'react';
import {Alert, Button, StyleSheet, View,Text} from 'react-native';

const App = () => {

  const leTolt=()=>{
    alert("Hello")
  }

  useEffect(()=>{
      leTolt()
  },[])

  return (
    <View style={styles.sajat}>
        <View>
          <Text style={styles.cim}>Marvel filmek</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sajat:{
    alignItems:"center",
    marginTop:50
  },
  cim:{
    fontSize:20,
    fontWeight:"bold",
    //textAlign:"center"
  }
});

export default App;