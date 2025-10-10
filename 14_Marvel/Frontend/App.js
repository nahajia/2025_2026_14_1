import {useState,useEffect} from 'react';
import {Alert, Button, StyleSheet, View,Text, Image, FlatList,TouchableOpacity,ActivityIndicator} from 'react-native';
import Cim from './Cim';

const App = () => {
  const [adatok,setAdatok]=useState([])
  const [betoltes,setBetoltes]=useState(true)

  const leTolt=async()=>{
    //alert("Hello")
    try{
      const response=await fetch(Cim.Cim+"film")
      const data=await response.json()
      //alert(JSON.stringify(data))
      setAdatok(data)
    }
    catch (error){
      alert("Hiba")
    }
    finally{
      setBetoltes(false)
    }

  }

  useEffect(()=>{
      leTolt()
  },[])

  const szavazas=async (id)=>{
    try{
        //alert("kattintva")
        let bemenet={
          "szavazat_film":id
        }
        const response=await fetch(Cim.Cim+"szavazatFelvitel",{
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(bemenet)
                  })
        const data=await response.json()
        if (response.ok)
            alert(data["message"])
        else 
          alert(data["error"])
      }
      catch (error){
          alert("Hiba")
      }
  }

  return (
    <View style={styles.sajat}>
        <View>
          <Text style={styles.cim}>Marvel filmek</Text>
      
          {  betoltes  ? 
              <View>
                <ActivityIndicator />
                <Text>Adatok betöltése...</Text>
              </View>
             :     
                <FlatList
                  data={adatok}
                  renderItem={({item}) => 
                        (<View>
                          <Text style={styles.alcim}>{item.film_cim}</Text>
                          <Image 
                            source={{uri: Cim.Cim+item.film_kep }} 
                            style={{width:250,height:250}}
                            />
                          <TouchableOpacity 
                                style={styles.gomb} 
                                onPress={()=>szavazas(item.film_id)}
                                >
                            <Text style={styles.gombFelirat}>Erre szavazok...</Text>
                          </TouchableOpacity>
                        </View>)
                  }
                  keyExtractor={item => item.film_id}
                  style={{
                          height: '100vh',        // vagy pl. 500
                          overflowY: 'auto',      // fontos weben
                        }}
                />
                }
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
  },
  gomb:{
    backgroundColor:"#0000ff",
    padding:10,
    marginTop:5,
    borderRadius:10
  },
  gombFelirat:{
    color:"white",
    fontSize:20
  }
});

export default App;