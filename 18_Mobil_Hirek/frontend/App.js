import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
  const [adatok,setAdatok]=useState([])

  const leToltes=async ()=>{
    //alert("hello")
    const response=await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=3896d67f06394c548239d21610ab6841")
    const data=await response.json()
    alert(JSON.stringify(data.articles))
    setAdatok(data.articles)

  }

  useEffect(()=>{
    leToltes()
  },[])


  return (
    <View style={styles.container}>
          <FlatList 
            data={adatok}
            renderItem={({item,index})=>
                <View>
                  <Text>{item.title}</Text>
                </View>
            }
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
