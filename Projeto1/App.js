import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Clipboard, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [titulo, setTitulo] = useState('');
  const [site, setSite] = useState('');
  const [ano, setAno] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [referencia, setReferencia] = useState([]);

  const handleGenerate = () => {
    const sobrenomeFormatado = sobrenome.toUpperCase();
    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
    const autor = `${sobrenomeFormatado}, ${nomeFormatado}`;
    const complemento = `${autor}. ${titulo}. ${site ? `${site}, ` : ''}${ano ? `${ano}` : ''}. Disponível em: <${url}>. Acesso em: ${data}.`;
    setReferencia([...referencia, complemento]);
  };

  const copiar = (referenciaTexto) => {
    Clipboard.setString(referenciaTexto);
    alert('Referência copiada para a área de transferência');
  };

  const deletar = (index) => {
    const novaReferencia = [...referencia];
    novaReferencia.splice(index, 1);
    setReferencia(novaReferencia);
  };

  const renderizar = ({ item, index }) => (
    <View style={styles.view1}>
      <Text style={styles.texto1}>{item}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      <TouchableOpacity activeOpacity={1} nextFocusUp={1}>
        <Button title="Copiar referência" onPress={() => copiar(item)} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} nextFocusUp={1}>
        <Button title="Excluir referência" onPress={() => deletar(index)} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.view2}>
        <Text style={styles.texto3}>Referências em ABNT</Text>
        <FontAwesome5 name="book" size={25} color="white" style={{padding: 10}} />
        </View>
      <Text style={styles.texto2}>Sobrenome do autor</Text>
      <TextInput
        style={styles.input}
        value={sobrenome}
        onChangeText={setSobrenome}
        placeholder='Ex. Duarte'
      />

      <Text style={styles.texto2}>Nome do autor</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder='Ex. Carlos'
      />

      <Text style={styles.texto2}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder='Titulo'
      />

      <Text style={styles.texto2}>Nome do site</Text>
      <TextInput
        style={styles.input}
        value={site}
        onChangeText={setSite}
        placeholder='Site'
      />

      <Text style={styles.texto2}>Ano</Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
        placeholder='Ex. 2004'
      />

      <Text style={styles.texto2}>URL</Text>
      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder='www.exemplo.com.br'
      />

      <Text style={styles.texto2}>Data de acesso</Text>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={setData}
        placeholder="DD/MM/AAAA"
      />

      
      <View style={styles.botao}>
      <TouchableOpacity activeOpacity={1} nextFocusUp={1}>
        <Button title="Gerar referência" onPress={handleGenerate} style={{color:'#1E90FF'}}/>
      </TouchableOpacity>
      </View>
      <FlatList
        data={referencia}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderizar}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },

  botao: {
    marginTop: 20,
    width: '45%',
    marginLeft: '28%',
  },


  view1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 35,
  },

  view2: {
    backgroundColor:'#1E90FF',
    width: '100%',
    height: 90,
    marginTop: 30,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },

  texto1: {
    fontSize: 16,
    marginBottom: 10,
  },

  texto2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },

  texto3: {
    fontSize: 28,
   fontWeight: 'bold',
   color: 'white',
  },

});
