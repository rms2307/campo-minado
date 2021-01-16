import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';

import params from './src/params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelect from './src/screens/LevelSelect'
import {
  createMinedBoard,
  cloneBoard,
  hadExplosion,
  openField,
  showMines,
  wonGame,
  invertFlag,
  flagsUsed
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
  const [showLevelSelection, setShowLevelSelection] = useState(false)

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

  onSelectField = (row, column) => {
    const clonedBoard = cloneBoard(board)
    invertFlag(clonedBoard, row, column)
    const won = wonGame(clonedBoard)

    if (won) {
      Alert.alert('PARABÉNS', 'Você Venceu!!!')
    }

    setBoard(clonedBoard)
    setWon(won)
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    setBoard(createMinedBoard(rows, cols, minesAmount()))
    setShowLevelSelection(false)
    setWon(false)
    setLost(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <LevelSelect isVisible={showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() => setShowLevelSelection(false)} />
      <Header flagsLeft={minesAmount() - flagsUsed(board)}
        onNewGame={() => {
          setBoard(createMinedBoard(rows, cols, minesAmount()))
          setLost(false)
          setWon(false)
        }}
        onFlagPress={() => setShowLevelSelection(true)}
      />
      <View style={styles.board}>
        <MineField board={board}
          onOpenField={onOpenField}
          onSelectField={onSelectField} />
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