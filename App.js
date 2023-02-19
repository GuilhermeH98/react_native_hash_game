import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';


export default function App() {
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(0);

  const initializeGame = () => {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setPlayer(1);
    setWinner(0);
  };

  const onTilePress = (row, col) => {
    let value = board[row][col];
    if (value !== 0) {
      return;
    }

    let currentPlayer = player;

    let arr = board.slice();
    arr[row][col] = currentPlayer;
    setBoard(arr);

    let nextPlayer = currentPlayer == 1 ? -1 : 1;
    setPlayer(nextPlayer);

    let winner = getWinner();
    if (winner == 1) {
      Alert.alert('Jogar "X" é o vencedor');
      initializeGame();
    } else if (winner == -1) {
      Alert.alert('Jogador "O" é o vencedor');
      initializeGame();
    }
  };

  function getWinner() {
    const NUM_TILES = 3;
    let arr = board;
    let sum;

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    return 0;
  }

  const renderIcon = (row, col) => {
    let value = board[row][col];
 
    switch (value) {
      case 1:
        return <AntDesign name="close" size={24} style={styles.tileX} />;
      case -1:
        return <Entypo name="circle" size={24} style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  const onNewGamePress = () => {
    initializeGame();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => onTilePress(0, 0)}
          style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
        >
          {renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(0, 1)}
          style={[styles.tile, { borderTopWidth: 0 }]}
        >
          {renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(0, 2)}
          style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}
        >
          {renderIcon(0, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => onTilePress(1, 0)}
          style={[styles.tile, { borderLeftWidth: 0 }]}
        >
          {renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(1, 1)}
          style={styles.tile}
        >
          {renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(1, 2)}
          style={[styles.tile, { borderRightWidth: 0 }]}
        >
          {renderIcon(1, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => onTilePress(2, 0)}
          style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(2, 1)}
          style={[styles.tile, { borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(2, 2)}
          style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 50 }} />
      <TouchableOpacity onPress={onNewGamePress}>
        <Text style={styles.restart}>Recomeçar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
  },
  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    color: 'red',
    fontSize: 60,
  },
  tileO: {
    color: 'green',
    fontSize: 60,
  },
  restart: {
    color: 'blue',
    fontSize: 30,
  },

});
