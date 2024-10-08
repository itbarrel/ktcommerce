import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { fetchVariationDetail } from '../services/variation'
import { Card } from 'react-native-paper'

const VarisationDetailScreen = (props) => {
  const { productId, variationId } = props.route.params

  const [varisationDetail, setvarisationDetail] = useState('')
  const Image1 = varisationDetail?.image?.src
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVariationDetail(productId, variationId)
        setvarisationDetail(response)
      } catch (error) {
        console.error('Error fetching variation detail:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.content}>
            <View style={styles.imageSection}>
              <Image
                source={{ uri: Image1 }}
                style={styles.image}
              />
            </View>
            <View style={styles.textSection}>
              <View style={styles.icon}>
                <Text style={styles.text1}>
                 Created-at {varisationDetail?.date_created}
                </Text>
              </View>
              <Text style={styles.text1}>
              Size: {varisationDetail?.attributes?.[0]?.option ? varisationDetail.attributes[0].option : 'N/A'}
              </Text>
              <Text style={styles.text1}>
              Color: {varisationDetail?.attributes?.[1]?.option ? varisationDetail.attributes[1].option : 'N/A'}
              </Text>
              <Text style={styles.text1}>
                Price: {varisationDetail?.price}/-
              </Text>
              <Text style={styles.text1}>
                Status: {varisationDetail?.status}
              </Text>
            </View>
            <View>
            </View>
          </View>
        </Card>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 150,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 2
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flexDirection: 'row'
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 99,
    height: 95
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingBottom: 10
  },
  text1: {
    fontSize: 13,
    marginBottom: 5,
    width: 150,
    paddingRight: 10,
    color: 'black'
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 4,
    color: 'black'
  }
})

export default VarisationDetailScreen
