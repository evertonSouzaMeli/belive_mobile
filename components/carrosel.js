import React, {useRef, useState} from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import SimplePaginationDot from './SimplePaginationDot';

const { width: windowWidth } = Dimensions.get('window');

const data = [
  {
    uri: 'https://justiceaction.org.au/wp-content/uploads/2020/09/iStock-639896942-1024x683.jpg',
  },
  {
    uri: 'https://img.pebmed.com.br/wp-content/uploads/2021/12/10191550/dia_internacional_da_saude_universal.jpg.webp',
  },
  {
    uri: 'https://images.moneycontrol.com/static-mcnews/2022/09/Health-insurance.png?impolicy=website&width=770&height=431',
  },
   {
    uri: 'https://images.moneycontrol.com/static-mcnews/2022/09/Health-insurance.png?impolicy=website&width=770&height=431',
  },
   {
    uri: 'https://images.moneycontrol.com/static-mcnews/2022/09/Health-insurance.png?impolicy=website&width=770&height=431',
  },
];

const INITIAL_INDEX = 0;
export default function ImageCarousel(props) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({ item, index }) {
    const { uri, title, content } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>

        <ImageBackground
          source={{ uri: uri }}
          style={styles.imageBackground}></ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
     <Text style={styles.texto}>Confira nossos especialistas:</Text>
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={0.7 * windowWidth}
        inActiveOpacity={0.5}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
      />
      <SimplePaginationDot currentIndex={currentIndex} length={data.length} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1E90FF', paddingVertical: 20, borderRadius: 25 },
  carousel: {
    backgroundColor: '#fff',
    aspectRatio: 1.5,
    flexGrow: 0,
    marginBottom: 20,
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3,
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white',
  },
  texto:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    color: '#FFF',
    justifyContent:'center',
    marginBottom:15
  },
});
