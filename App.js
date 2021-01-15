import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';

import params from './src/params'
import MineField from './src/components/MineField'
import {
  createMinedBoard,
  cloneBoard,
  hadExplosion,
  openField,
  showMines,
  wonGame
} from './src/logics'

export default () => {

  const cols = params.getColumnsAmount()
  const rows = params.getRowsAmount()

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  const [board, setBoard] = useState(createMinedBoard(rows, cols, minesAmount()))
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)

  onOpenField = (row, column) => {
    const clonedBoard = cloneBoard(board)
    openField(clonedBoard, row, column)
    const lost = hadExplosion(clonedBoard)
    const won = wonGame(clonedBoard)

    if (lost) {
      showMines(clonedBoard)
      Alert.alert('Você Perdeuuu!!!', 'Que Penaaa!!!')
    }

    if (won) {
      Alert.alert('PARABÉNS', 'Você Venceu!!!')
    }

    setBoard(clonedBoard)
    setWon(won)
    setLost(lost)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Iniciando o Mines...</Text>
      <Text>Tamanho da grade:
        {params.getRowsAmount()}X{params.getColumnsAmount()}</Text>
      <View style={styles.board}>
        <MineField board={board} onOpenField={onOpenField} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  }
});