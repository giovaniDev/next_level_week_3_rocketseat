import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/happyMarker.png';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

export default function OrphanagesMap() {

    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

    useEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      })
    }, [])

    const navigation = useNavigation();
    
    function handleNavigateToOrphanage(id: number) {
      navigation.navigate('OrphanageDetails', { id })
    }

    function handleNavigateToCreateOrphanage() {

      navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
          <MapView 
            provider={PROVIDER_GOOGLE}
            style={styles.map} 
            initialRegion={{
              latitude: -22.7244976 ,
              longitude: -47.6356764 ,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008
            }}
          >
            {orphanages.map(orphanage => {
              return (
                <Marker
                  key={orphanage.id}
                  icon={mapMarker}
                  coordinate={{
                    latitude: orphanage.latitude,
                    longitude: orphanage.longitude
                  }}
                  calloutAnchor={{
                    x: 2.7 ,
                    y: 0.8
                  }}
                >
                  <Callout tooltip onPress={() => handleNavigateToOrphanage(orphanage.id)} >
                    <View style={styles.calloutContainer} >
                      <Text style={styles.calloutText} >{orphanage.name}</Text>
        
                    </View>
                  </Callout>
      
              </Marker>
              )
            }) }
    
          </MapView>
    
          <View style={styles.footer} >
            <Text style={styles.footerText} >{orphanages.length} orfanatos encontrados</Text>
    
            <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage} >
              <Feather name='plus' size={20} color='#fff' />
            </RectButton>
          </View>
        </View>
      );
}
    
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
  
      elevation: 3
    },
    calloutText: {
      color: "#0089a5",
      fontSize: 14
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
  
    },
  
    footerText: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });