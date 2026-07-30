export interface Causa {
  id: string;
  nome: string;
  causa: string;
  descricao?: string;
  imagem: string;
}

// Lista inicial de causas
export const listaCausas: Causa[] = [
  { id: '1', nome: 'Patinhas Livres', causa: 'Proteção Animal', imagem: 'https://picsum.photos/200' },
  { id: '2', nome: 'Verde Infinito', causa: 'Meio Ambiente', imagem: 'https://picsum.photos/201' },
  { id: '3', nome: 'Educa Mais', causa: 'Educação', imagem: 'https://picsum.photos/202' },
];

// Função para adicionar nova causa no topo
export const adicionarCausaNaLista = (novaCausa: Causa) => {
  listaCausas.unshift(novaCausa);
};