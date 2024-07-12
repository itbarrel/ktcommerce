import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Menu } from 'react-native-paper'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters'

const CategoryCard = ({ item, isSelected, onSelect }) => {
  const [visibleMainMenu, setVisibleMainMenu] = useState(false)
  const [currentItem, setCurrentItem] = useState(item)

  const openMainMenu = () => setVisibleMainMenu(true)
  const closeMainMenu = () => {
    if (currentItem.term_id !== item.term_id) {
      setCurrentItem(item)
      return
    }

    setVisibleMainMenu(false)
  }

  const checkSubMenu = (obj) => {
    if (!obj?.children || obj?.children.length <= 0) { return }

    setCurrentItem(obj)
  }

  useEffect(() => {
    setCurrentItem(item)
  }, [item.term_id])

  return (
    <View style={styles.container}>
      <Menu
        visible={visibleMainMenu}
        onDismiss={closeMainMenu}
        anchor={
          <TouchableOpacity onPress={onSelect && openMainMenu} style={styles.invisibleButton}>
            <Text style={{ color: 'black' }}>
              {item.name}
            </Text>
            <View style={styles.line} />
          </TouchableOpacity>
        }
      >
        {currentItem?.children?.length > 0 && currentItem?.children?.map((firstChild) => (
          <Menu.Item style={styles.subMenuContainer} onPress={() => checkSubMenu(firstChild)} key={firstChild.ID} title={firstChild?.name} />
        ))}
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonSelected: {
    backgroundColor: 'blue'
  },
  buttonText: {
    fontSize: moderateScale(15),
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1000
  },
  subMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    marginLeft: 20
  },
  iconButton: {
    marginLeft: scale(-10)
  },
  line: {
    height: verticalScale(1),
    backgroundColor: '#F5F5F5',
    alignSelf: 'stretch',
    marginTop: verticalScale(4)
  },
  invisibleButton: {
    padding: moderateScale(10)
  }
})

export default CategoryCard
