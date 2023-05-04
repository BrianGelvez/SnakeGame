import React from 'react'
import { Coordinate } from '../types/types';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface SnakeProps {
    snake: Coordinate[];
}

export const Snake = ({snake}: SnakeProps) :JSX.Element => {
  return (
    <>
    {snake.map((segment: any, index: number) => {
        const segmentStyle = {
            left: segment.x * 10, // ajusta el tamano de cada segmento
            top: segment.y * 10 
        }
        return <View key={index} style={[styles.snake, segmentStyle]}/>
    })}
    </>
  )
}


const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: Colors.primary,
        position: 'absolute'
    }
})