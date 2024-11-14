import { useSQLiteContext } from "expo-sqlite";

export type NotasDatabase = { 
  id: number;
  titulo: string;
  conteudo: string;
  data_criacao: string;
}

export function useNotaDatabase() {
  const database = useSQLiteContext()

  async function criar(data: Omit<NotasDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO notas (titulo, conteudo, data_criacao) VALUES ($titulo, $conteudo, $data_criacao)"
    );

    try {
      const resultado = await statement.executeAsync({
        $titulo: data.titulo,
        $conteudo: data.conteudo,
        $data_criacao: data.data_criacao,
      });
      const insertedRowId = resultado.lastInsertRowId.toLocaleString();      
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function atualizar(data: NotasDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE notas SET titulo = $titulo, conteudo = $conteudo, data_criacao = $data_criacao WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id,
        $titulo: data.titulo,
        $conteudo: data.conteudo,
        $data_criacao: data.data_criacao,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remover(id: number) {
    try {
      await database.execAsync("DELETE FROM notas WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function listarUm(id: number) {
    try {
      const query = "SELECT * FROM notas WHERE id = ?";

      const response = await database.getFirstAsync<NotasDatabase>(query, [
        id,
      ]);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function listarTodos() {
    try {
      const query = "SELECT * FROM notas";

      const response = await database.getAllAsync<NotasDatabase>(query);

      return response.map((item) => {
        return {
          id: item.id,
          titulo: item.titulo,
          conteudo: item.conteudo,
          data_criacao: item.data_criacao,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  return { criar, atualizar, remover, listarUm, listarTodos };
}
