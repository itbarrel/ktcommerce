import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Menu } from 'react-native-paper'
import { moderateScale, scale } from 'react-native-size-matters'

const CategoryCard = ({ key, item, isSelected, onSelect }) => {
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
    if (!obj?.children || obj?.children.length <= 0) {
      onSelect(obj.term_id)
      if (currentItem.term_id !== item.term_id) {
        setCurrentItem(item)
      }
      setVisibleMainMenu(false)
      return
    }
    setCurrentItem(obj)
  }

  useEffect(() => {
    setCurrentItem(item)
  }, [item.term_id])

  return (
    <View style={styles.container} key={key}>
      <Menu
        visible={visibleMainMenu}
        onDismiss={closeMainMenu}
        anchor={
          <TouchableOpacity onPress={openMainMenu} style={styles.invisibleButton}>
            {item.children.some((child) => child.children && child.children.length > 0) && (
              <Text style={{ color: 'black' }}>
                {item.name}
              </Text>
            )}
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
  invisibleButton: {
    padding: moderateScale(10),
    backgroundColor: 'gray',
    borderRadius: 8

  }
})

export default CategoryCard
