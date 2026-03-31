import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TarefaItem({ tarefa, onRemover, onConcluir }) {
  
  return (
    tarefa.completed?
    <View style={styles.containerCompleted}>
      <Text style={styles.textoCompleted}>{tarefa.texto}</Text>
      <TouchableOpacity onPress={() => onRemover(tarefa.id)}>
        <Text style={styles.remover}>❌</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onConcluir(tarefa.id)}>
        <Text style={styles.concluir}>✅</Text>
      </TouchableOpacity>
    </View>:
    <View style={styles.container}>
      <Text style={styles.texto}>{tarefa.texto}</Text>
      <TouchableOpacity onPress={() => onRemover(tarefa.id)}>
        <Text style={styles.remover}>❌</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onConcluir(tarefa.id)}>
        <Text style={styles.concluir}>✅</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  containerCompleted:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#098f1b',
    borderRadius: 8,
  },
  texto: { fontSize: 16 },
  textoCompleted: {color:'#fff'},
  remover: { fontSize: 18 },
  concluir: {fontSize: 18 },
});