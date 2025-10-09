import {useState,useEffect} from 'react';
import {Alert, Button, StyleSheet, View,Text, Image, FlatList,TouchableOpacity} from 'react-native';
import Cim from './Cim';

const App = () => {
  const [adatok,setAdatok]=useState([])

  const leTolt=async()=>{
    //alert("Hello")
      const response=await fetch(Cim.Cim+"film")
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
      
          <FlatList
            data={adatok}
            renderItem={({item}) => 
                  (<View>
                    <Text style={styles.alcim}>{item.film_cim}</Text>
                    <Image 
                      source={{uri: Cim.Cim+item.film_kep }} 
                      style={{width:250,height:250}}
                      />
                    <TouchableOpacity>
                      <Text>Erre szavazok...</Text>
                    </TouchableOpacity>
                  </View>)
            }
            keyExtractor={item => item.film_id}
          />
       {/*
          {adatok.map((elem,index)=>(
            <View>
              <Text style={styles.alcim}>{elem.film_cim}</Text>
              <Image 
                source={{uri: Cim.Cim+elem.film_kep }} 
                style={{width:250,height:250}}
                />
            </View>
          ))}
        */}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sajat:{
    alignItems:"center",
    margin:"auto",
    marginTop:50
  },
  cim:{
    fontSize:30,
    fontWeight:"bold",
    textAlign:"center"
  },
  alcim:{
    textAlign:"center",
    fontSize:20,
    marginTop:20,
    fontWeight:"bold"
  }
});

export default App;