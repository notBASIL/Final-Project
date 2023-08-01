import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import styles from './styles';

export default function Header() {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../../../assets/book.png')} style={{ width: 50, height: 50 }} />

        <Text style={styles.text}>
          CookBook{"\n"}
          <Text style={{ fontSize: 13, color: 'white', fontWeight: 'bold' }}>Complete Recipe App</Text>
        </Text>
      </View>

      {/* <TouchableWithoutFeedback onPress={openModal}>
        <MaterialCommunityIcons style={styles.text2} name="cart" size={35} color="white" />
      </TouchableWithoutFeedback> */}

      <Modal visible={isModalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>

          {/* Your shopping cart content goes here */}
          
          <Text style={{ color: 'black', fontSize: 18, marginBottom: 20 }}>Shopping Cart</Text>

          {/* Add your cart items and any other relevant content */}

          <TouchableWithoutFeedback onPress={closeModal}>
            <Text style={{ color: 'blue', fontSize: 16 }}>Close</Text>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
}
