import { NotasDatabase } from "../database/useNotasDatabase";
import { FormTypes } from "../types/types";
import * as yup from "yup";

export const schema = yup.object().shape({
  titulo: yup.string().required("Campo vazio"),
  conteudo: yup.string().required("Campo vazio"),
});

export const dadosIniciais: NotasDatabase = {
  id: 0,
  titulo: "",
  conteudo: "",
  data_criacao: "",
};

export const valoresIniciais: FormTypes = {
  titulo: "",
  conteudo: "",
};
