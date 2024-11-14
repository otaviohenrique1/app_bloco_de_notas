import { StyleSheet, View } from 'react-native';
import Container from '../components/Container';
import { Appbar, HelperText, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './routes';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    titulo: yup.string().required(),
    conteudo: yup.string().required(),
  })
  .required()

type Props = NativeStackScreenProps<RootStackParamList, "Formulario">;

export default function Formulario({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      titulo: "",
      conteudo: "",
    },
  })

  return (
    <Container>
      <Appbar.Header style={{ backgroundColor: "cadetblue" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Formulario" />
        <Appbar.Action icon="close" onPress={reset} />
        <Appbar.Action icon="check" onPress={handleSubmit((values) => {
          navigation.goBack()
        })} />
      </Appbar.Header>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Titulo"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.campoTexto}
          />
        )}
        name="titulo"
      />
      {errors.titulo && <HelperText type="error">Campo vazio.</HelperText>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Conteudo"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.campoTextoArea}
            multiline
          />
        )}
        name="conteudo"
      />
      {errors.conteudo && <HelperText type="error">Campo vazio.</HelperText>}
    </Container>
  );
}

const styles = StyleSheet.create({
  campoTexto: {
    margin: 10,
  },
  campoTextoArea: {
    flex: 1,
    margin: 10,
  },
});
