import { StyleSheet } from "react-native";
import Container from "../components/Container";
import { Appbar, HelperText, TextInput } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./routes";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormTypes } from "../types/types";
import { CampoTexto } from "../components/CampoTexto";
import { format } from "date-fns";
import { useNotaDatabase } from "../database/useNotasDatabase";

const schema = yup.object().shape({
  titulo: yup.string().required("Campo vazio"),
  conteudo: yup.string().required("Campo vazio"),
});

const valoresIniciais: FormTypes = {
  titulo: "",
  conteudo: "",
};

type Props = NativeStackScreenProps<RootStackParamList, "Formulario">;

export default function Formulario({ navigation }: Props) {
  const notaDatabase = useNotaDatabase();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: valoresIniciais,
  })

  return (
    <Container>
      <Appbar.Header style={{ backgroundColor: "cadetblue" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Formulario" />
        <Appbar.Action icon="close" onPress={reset} />
        <Appbar.Action icon="check" onPress={handleSubmit(async (values) => {
          try {
            const data = format(new Date(), "MM/dd/yyyy HH:mm");
            const resposta = await notaDatabase.criar({
              titulo: values.titulo,
              conteudo: values.conteudo,
              data_criacao: data,
            });
            console.log(resposta.insertedRowId);
            reset();
            navigation.goBack();
          } catch (error) {
            console.error(error);
          }
        })} />
      </Appbar.Header>
      <CampoTexto
        control={control}
        label="Titulo"
        name="titulo"
        errors={errors.titulo}
        style={styles.campoTexto}
      />
      <CampoTexto
        control={control}
        label="Conteudo"
        name="conteudo"
        errors={errors.conteudo}
        style={styles.campoTextoArea}
        multiline
      />
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
