import { EnderecoDTO } from './endereco.dto';
import { EstabelecimentoDTO } from './estabelecimento.dto';

export interface UsuarioDTO {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    estabelecimentos?: EstabelecimentoDTO[];
    endereco?: EnderecoDTO;
    imageUrl?: string;
}