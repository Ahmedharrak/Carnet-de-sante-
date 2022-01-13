import React, { Component } from 'react';
import { StyleSheet,TextInput, ScrollView, ActivityIndicator, View ,} from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';
import { SearchBar } from 'react-native-elements';

class ServicesScreen extends Component {

  constructor() {
    super();
    this.firestoreRefS = firebase.firestore().collection('Services').orderBy("location");
    this.state = {
      isLoading: true,
      servicesArr: [],
     
    };
    
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRefS.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  

  getCollection = (querySnapshot) => {
    const servicesArr = [];
    querySnapshot.forEach((res) => {
      const { name, image, location, telephone, desc,latitude,longitude } = res.data();
      servicesArr.push({
        key: res.id,
        res,
        name,
        image, location, telephone, desc,latitude,longitude
      });
    });
    this.setState({
      servicesArr,
      isLoading: false,
   });
  }
  
  
    

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    
    return (
      <ScrollView style={styles.container}>
                
          {
            this.state.servicesArr.map((item, i) => {
              return (
                
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  leftAvatar={{ style:{width:80,height :80, margin:3},  source: { uri: item.image } }}
                  title={item.name}
                  subtitle={item.location}
                  onPress={() => {
                    this.props.navigation.navigate('ServicesDetailScreen', {
                      serviceskey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ServicesScreen;