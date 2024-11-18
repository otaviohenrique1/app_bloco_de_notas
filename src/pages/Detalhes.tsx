import { ScrollView, StyleSheet, View } from 'react-native';
import { Container } from "../components/Container";
import { Appbar, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './routes';
import { useEffect, useState } from 'react';
import { NotasDatabase, useNotaDatabase } from '../database/useNotasDatabase';
import { ModalRemover } from '../components/ModalRemover';
import { dadosIniciais } from '../utils/constantes';

type Props = NativeStackScreenProps<RootStackParamList, "Detalhes">;

export default function Detalhes({ navigation, route }: Props) {
  const [nota, setNota] = useState<NotasDatabase>(dadosIniciais);
  const [exibeModal, setExibeModal] = useState(false);
  const notaDatabase = useNotaDatabase();

  const { id } = route.params;

  async function buscaUmaNota() {
    const resposta = await notaDatabase.listarUm(id);
    setNota((resposta === null) ? dadosIniciais : resposta);
  }

  useEffect(() => {
    buscaUmaNota();
  }, [nota]);

  const abreModal = () => setExibeModal(true);
  const fechaModal = () => setExibeModal(false);

  return (
    <Container>
      <Appbar.Header style={{ backgroundColor: "cadetblue" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalhes" />
        <Appbar.Action icon="delete" onPress={abreModal} />
        <Appbar.Action icon="note-edit-outline" onPress={() => navigation.push("FormularioEditar", { id: id })} />
      </Appbar.Header>
      <View style={styles.main}>
        <ScrollView>
          <Text variant="displaySmall" style={styles.titulo}>{nota.titulo}</Text>
          <Text variant="bodyLarge" style={styles.conteudo}>{nota.conteudo}</Text>
          <Text variant="bodyLarge">Data de criação: {nota.data_criacao}</Text>
        </ScrollView>
      </View>
      <ModalRemover
        visible={exibeModal}
        onDismiss={fechaModal}
        onPressSim={async () => {
          await notaDatabase.remover(id);
          navigation.goBack();
        }}
        onPressNao={fechaModal}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 20,
    flex: 1,
  },
  titulo: {
    textAlign: "center",
  },
  conteudo: {
    textAlign: "justify",
    paddingVertical: 40,
  },
});
