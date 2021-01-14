import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import params from './src/params'
import MineField from './src/components/MineField'
import { createMineBoard } from './src/logics'

export default () => {

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMineBoard(rows, cols, minesAmount()),
    }
  }

  const [state, setState] = useState(createState())

  return (
    <SafeAreaView style={styles.container}>
      <Text>Iniciando o Mines...</Text>
      <Text>Tamanho da grade:
        {params.getRowsAmount()}X{params.getColumnsAmount()}</Text>
      <View style={styles.board}>
        <MineField board={state.board} />
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