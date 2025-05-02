import { ActivityIndicator, BackHandler, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchListRequest } from '../store/actions/productListAction';
import { POPPINS_BOLD, POPPINS_MEDIUM } from '../assets/font';
import { BLACK, GREY, ROYAL_BLUE, TEXT_COLOR, WHITE } from '../assets/colors';
import { DELETE, EDIT } from '../assets/icon';
import { fetchDeleteOrderRequest } from '../store/actions/deleteOrderAction';

const ProductList = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { loadingList, dataList, errorList } = useSelector(state => state?.listItem);
  const { loadingDeleteOrder, dataDeleteOrder, errorDeleteOrder } = useSelector(state => state?.deleteOrder);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchListRequest())
      const handleBackPress = () => {
        navigation.goBack()
        return true; // Prevents the default back action
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        backHandler.remove();
      };
    }, [dispatch, navigation, dataDeleteOrder])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchListRequest())
    setRefreshing(false);
  };
  if (loadingList) {
    return (<View style={styles.mainContainer}><ActivityIndicator size="large" color="grey" /></View>)
  }
  const renderItem = ({ item }) => {
    return (
      <View key={item?._id} style={{ backgroundColor: WHITE, borderRadius: 8, width: '95%', padding: 10, borderWidth: 1, borderColor: ROYAL_BLUE, marginTop: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
        {<TouchableOpacity onPress={() => navigation?.navigate('ListView', { data: item })} style={styles.dateTxt}>
          <View style={[styles.innerContainer, { borderBottomWidth: 1, borderColor: GREY }]}>
            <View style={{ width: '50%', borderRightWidth: 1, borderColor: GREY }}>
              <Text style={{ color: BLACK }}>Name: {item?.name ? item?.name : 'NA'}</Text>
            </View>
            <View style={{ width: '48%', paddingVertical: 10 }}>
              <Text style={{ color: BLACK }}>Phone no.: {item?.phone ? item?.phone : 'NA'}</Text>
            </View>
          </View>
          <View style={[styles.innerContainer, { borderBottomWidth: 1, borderColor: GREY }]}>
            <View style={{ width: '50%', borderRightWidth: 1, borderColor: GREY }}>
              <Text style={{ color: BLACK }}>Picked by: {item?.picked_by ? item?.picked_by : 'NA'}</Text>
            </View>
            <View style={{ width: '48%', paddingVertical: 10 }}>
              <Text style={{ color: BLACK }}>Picked Date.: {item?.picked_up_dateTime ? item?.picked_up_dateTime : 'NA'}</Text>
            </View>
          </View>
          <View style={[styles.innerContainer, { paddingVertical: 10 }]}>
            <Text style={{ color: BLACK,width:'70%',alignItems:'flex-start' }}>Dropped Date: {item?.drop_dateTime ? item?.drop_dateTime : 'NA'}</Text>
            <TouchableOpacity style={{width:'13%',justifyContent:'center',alignItems:'center'}} onPress={() => dispatch(fetchDeleteOrderRequest(item?._id))} ><Image source={DELETE} style={{ width: 18, height: 18 }} resizeMode='cover'/></TouchableOpacity> 
            <TouchableOpacity style={{width:'13%',justifyContent:'center',alignItems:'center'}} onPress={() => navigation?.navigate('AddItem',{data:item})} ><Image source={EDIT} style={{ width: 18, height: 18 }} resizeMode='cover'/></TouchableOpacity> 
          </View>
        </TouchableOpacity>}
      </View>
    )
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {!errorList && dataList && dataList?.length > 0 ?
        <>
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </>
        : (!loadingList && <Text style={{
          fontSize: 20,
          color: 'red',
          fontFamily: POPPINS_BOLD,
          alignSelf: 'center'
        }}>{'Sorry, No Subscriber Available'}</Text>)
      }
    </ScrollView>
  )
}

export default ProductList

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingBottom: 20
  },
  innerContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  dateTxt: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  textStyl: { color: TEXT_COLOR, fontFamily: POPPINS_MEDIUM, fontSize: 15 },
  summaryBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontWeight: '600',
    marginTop: 10,
  },

})