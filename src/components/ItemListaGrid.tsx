import { StyleSheet, TouchableHighlight, View } from "react-native";
import { NotasDatabase, useNotaDatabase } from "../database/useNotasDatabase";
import { IconButton, Menu, Text } from "react-native-paper";
import { useState } from "react";
import { limitarTamanhoString } from "../utils/funcoes";
import { ModalRemover } from "./ModalRemover";
import React from "react";

interface ItemListaGridProps {
  data: NotasDatabase;
  navigation: any;
}

export function ItemListaGrid(props: ItemListaGridProps) {
  const [exibeMenu, setExibeMenu] = useState(false);
  const [exibeModal, setExibeModal] = useState(false);
  const notaDatabase = useNotaDatabase();

  const { data, navigation } = props;

  const abreMenu = () => setExibeMenu(true);
  const fechaMenu = () => setExibeMenu(false);

  const abreModal = () => {
    setExibeModal(true);
    setExibeMenu(false);
  };
  const fechaModal = () => setExibeModal(false);

  return (
    <>
      <TouchableHighlight
        style={{ borderRadius: 5 }}
        onPress={() => navigation.push("Detalhes", { id: data.id })}
      >
        <View style={styles.itemContainer}>
          <View style={styles.tituloContainer}>
            <Text style={styles.itemTitulo}>{limitarTamanhoString(data.titulo, 10)}</Text>
            <Menu
              visible={exibeMenu}
              onDismiss={fechaMenu}
              anchor={<IconButton icon="dots-vertical" onPress={abreMenu} />}
              anchorPosition="bottom"
            >
              <Menu.Item
                onPress={() => navigation.push("FormularioEditar", { id: data.id })}
                title="Editar"
              />
              <Menu.Item
                onPress={abreModal}
                title="Remover" />
            </Menu>
          </View>
          <Text style={styles.itemConteudo}>{limitarTamanhoString(data.conteudo, 100)}</Text>
        </View>
      </TouchableHighlight>
      <ModalRemover
        visible={exibeModal}
        onDismiss={fechaModal}
        onPressSim={async () => {
          await notaDatabase.remover(data.id);
        }}
        onPressNao={fechaModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    // justifyContent: 'flex-end',
    backgroundColor: "#bdc3c7",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  tituloContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemTitulo: {
    fontSize: 20,
    // color: '#000',
    fontWeight: '600',
  },
  itemConteudo: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 12,
    // color: '#000',
  },
});