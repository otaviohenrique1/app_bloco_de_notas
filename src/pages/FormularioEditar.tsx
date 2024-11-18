import { StyleSheet } from "react-native";
import { Container } from "../components/Container";
import { Appbar } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CampoTexto } from "../components/CampoTexto";
import { NotasDatabase, useNotaDatabase } from "../database/useNotasDatabase";
import { useEffect, useState } from "react";
import { dadosIniciais, schema, valoresIniciais } from "../utils/constantes";

type Props = NativeStackScreenProps<RootStackParamList, "FormularioEditar">;

export default function FormularioEditar({ navigation, route }: Props) {
  const [nota, setNota] = useState<NotasDatabase>(dadosIniciais);
  const notaDatabase = useNotaDatabase();

  const { id } = route.params;

  const buscaUmaTarefa = async () => {
    const data = await notaDatabase.listarUm(id);
    setNota((data !== null) ? data : dadosIniciais);
  };

  useEffect(() => {
    buscaUmaTarefa();
  }, [nota])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: valoresIniciais,
    values: {
      titulo: nota.titulo,
      conteudo: nota.conteudo,
    }
  })

  return (
    <Container>
      <Appbar.Header style={{ backgroundColor: "cadetblue" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Editar" />
        <Appbar.Action icon="close" onPress={reset} />
        <Appbar.Action icon="check" onPress={handleSubmit(async (values) => {
          try {
            await notaDatabase.atualizar({
              id: id,
              titulo: values.titulo,
              conteudo: values.conteudo,
              data_criacao: nota.data_criacao,
            });
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
