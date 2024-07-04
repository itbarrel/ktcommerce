import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Menu, Button } from 'react-native-paper'

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
          <Button mode="contained" onPress={onSelect && openMainMenu}>
            {item.name}
          </Button>
        }
      >
        {currentItem?.children?.length > 0 && currentItem?.children?.map((firstChild) => (
          <Menu.Item onPress={() => checkSubMenu(firstChild)} key={firstChild.ID} title={firstChild?.name} />
        ))}
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonSelected: {
    backgroundColor: 'blue'
  },
  buttonText: {
    fontSize: 15,
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconButton: {
    marginLeft: -10
  }

})

export default CategoryCard
