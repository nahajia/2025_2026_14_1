import {useState,useEffect} from 'react';
import {Alert, Button, StyleSheet, View,Text, Image} from 'react-native';

const App = () => {
  const [adatok,setAdatok]=useState([])

  const leTolt=async()=>{
    //alert("Hello")
      const response=await fetch("http://localhost:3000/film")
      const data=await response.json()
      //alert(JSON.stringify(data))
      setAdatok(data)

  }

  useEffect(()=>{
      leTolt()
  },[])

  return (
    <View style={styles.sajat}>
        <View>
          <Text style={styles.cim}>Marvel filmek</Text>
          {adatok.map((elem,index)=>(
            <View>
              <Text >{elem.film_cim}</Text>
              <Image 
                source={{uri: "http://localhost:3000/"+elem.film_kep }} 
                style={{width:250,height:250}}
                />
            </View>
          ))}
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