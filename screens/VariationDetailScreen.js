import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { fetchVariationDetail } from '../services/variation'
import { Card } from 'react-native-paper'

const VariationDetailScreen = (props) => {
  const { productId, variationId } = props.route.params
  const [loading, setLoading] = useState(true)
  const [varisationDetail, setvarisationDetail] = useState('')
  const Image1 = varisationDetail?.image?.src

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVariationDetail(productId, variationId)
        setvarisationDetail(response)
      } catch (error) {
        console.error('Error fetching variation detail:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.content}>
            {/* Conditionally render loading indicator or content */}
            {loading
              ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
              )
              : (
                <>
                  <View style={styles.imageSection}>
                    <Image
                      source={{ uri: Image1 }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.text1}>
                      <Text style={styles.boldText}>Created-at: </Text>
                      {varisationDetail?.date_created}
                    </Text>

                    <Text style={styles.text1}>
                      <Text style={styles.boldText}>Size: </Text>
                      {varisationDetail?.attributes?.[0]?.option ? varisationDetail.attributes[0].option : 'N/A'}
                    </Text>

                    <Text style={styles.text1}>
                      <Text style={styles.boldText}>Color: </Text>
                      {varisationDetail?.attributes?.[1]?.option ? varisationDetail.attributes[1].option : 'N/A'}
                    </Text>

                    <Text style={styles.text1}>
                      <Text style={styles.boldText}>Status: </Text>
                      {varisationDetail?.status}
                    </Text>
                  </View>
                </>
              )}
          </View>
        </Card>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  card: {
    width: 330,
    height: 457,
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
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 210,
    height: 205
  },
  textSection: {
    justifyContent: 'center',
    display: 'flex',
    marginLeft: 50,
    marginTop: 30

  },
  text1: {
    fontSize: 17,
    marginBottom: 5,
    width: 300,
    display: 'flex',
    paddingRight: 10,
    color: 'black',
    justifyContent: 'space-between'
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 4,
    color: 'black'
  },
  boldText: {
    fontWeight: 'bold'
  }
})

export default VariationDetailScreen
