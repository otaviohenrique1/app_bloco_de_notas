import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

interface ModalRemoverProps {
  onPressSim: ((e: GestureResponderEvent) => void);
  onPressNao: ((e: GestureResponderEvent) => void);
  visible: boolean;
  onDismiss: (() => void);
}

export function ModalRemover(props: ModalRemoverProps) {
  const { onPressSim, onPressNao, visible, onDismiss } = props;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text variant="headlineSmall">Aviso</Text>
        <Text
          variant="bodyLarge"
          style={styles.texto}
        >Deseja remover a tarefa?</Text>
        <View style={styles.botoesModal}>
          <Button
            mode="contained"
            style={styles.botaoSimModal}
            onPress={onPressSim}
          >Sim</Button>
          <Button
            mode="elevated"
            onPress={onPressNao}
          >Não</Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  texto: {
    marginVertical: 20
  },
  botoesModal: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  botaoSimModal: {
    marginEnd: 10
  }
});
