import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, FlatList,Image, TouchableOpacity,Linking,ActivityIndicator } from 'react-native';

export default function App() {
  const [adatok,setAdatok]=useState([])
  const [tolt,setTolt]=useState(true)

  const leToltes=async ()=>{
    //alert("hello")
    const response=await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=3896d67f06394c548239d21610ab6841")
    const data=await response.json()
    //alert(JSON.stringify(data.articles))
    setAdatok(data.articles)
    setTolt(false)
  }

  useEffect(()=>{
    leToltes()
  },[])


  return (
    <View style={styles.container}>
          <Text style={styles.cim}>Hírek</Text>
          { tolt ? 
           <ActivityIndicator style={{ marginTop:200,transform: [{ scale: 4 }] }}/>
            : 
              <FlatList 
                data={adatok}
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item,index})=>
                    <View style={{borderBottomWidth:2,borderBottomColor:"blue"}}>
                      <Text style={styles.cikkCim}>{item.title}</Text>
                      <Image source={{uri:item.urlToImage}} style={{width:200,height:200,margin:"auto"}}/>
                      <Text style={styles.leiras}>{item.description}</Text>
                      <Text style={styles.tartalom}>{item.content}</Text>
                      <Text style={styles.datum}>
                        {item.publishedAt.split("T")[0]}  {item.publishedAt.split("T")[1].split(":")[0]}:{item.publishedAt.split("T")[1].split(":")[1]}
                        </Text>
                      <Text style={styles.forras}>{item.source.name}</Text>
                      <TouchableOpacity
                          style={styles.gomb}
                          onPress={()=>Linking.openURL(item.url)}
                          >
                          <Text style={{color:"white"}}>Olvass tovább</Text>
                      </TouchableOpacity>
                    </View>
                }
                />
              }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000066',
    alignItems: 'center',
    
    marginTop:50
  },
  cim:{
    fontSize:20,
    fontWeight:'bold',
    fontFamily:'fantasy',
    color:"white",
    margin:10
  },
  cikkCim:{
    color:"white",
    textAlign:"center",
    fontWeight:"bold",
    margin:10
  },
  leiras:{
    color:"#8080ff",
    textAlign:"justify",
    margin:10
  },
  tartalom:{
    color:"#b3b3ff",
    textAlign:"justify",
    marginLeft:10,
    marginRight:10
  },
  datum:{
    color:"#4545ff",
    marginLeft:20
  },
  forras:{
    color:"darkred",
    marginLeft:20,
    fontSize:15
  },
  gomb:{
    backgroundColor:"blue",
    alignItems:"center",
    padding:10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20 
  }
});
