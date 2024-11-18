import { StyleSheet } from 'react-native';
import { Container } from "../components/Container";
import { Appbar, FAB } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './routes';
import { useEffect, useState } from 'react';
import { NotasDatabase, useNotaDatabase } from '../database/useNotasDatabase';
import { ItemListaGrid } from '../components/ItemListaGrid';

type Props = NativeStackScreenProps<RootStackParamList, "HomePage">;

export default function HomePage({ navigation }: Props) {
  const [notas, setNotas] = useState<NotasDatabase[]>([]);
  const notaDatabase = useNotaDatabase();
  
  async function buscaTodos() {
    const resposta = await notaDatabase.listarTodos();
    setNotas(resposta);
  }

  useEffect(() => {
    buscaTodos();
  }, [notas])


  const data = [
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' },
    { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' },
    { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' },
    { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' },
    { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' },
    { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' },
    { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' },
    { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' },
    { name: 'ASBESTOS', code: '#7f8c8d' },
  ];

  

  return (
    <Container>
      <Appbar.Header style={{ backgroundColor: "cadetblue" }}>
        <Appbar.Content title="HomePage" />
      </Appbar.Header>
      <FlatGrid
        itemDimension={130}
        data={notas}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <ItemListaGrid
            data={item}
            navigation={navigation}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push("Formulario")}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
});
