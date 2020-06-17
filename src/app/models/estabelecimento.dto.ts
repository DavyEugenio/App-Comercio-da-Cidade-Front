import { EnderecoDTO } from './endereco.dto';
import { ProdutoServicoDTO } from './produtoServico.dto';

export interface EstabelecimentoDTO {

	id: string;
	cnpj: string;
	nome: string;
	instagram?: string;
	facebook?: string;
	site?: string;
	horario: string;
	telefones: string[];
	endereco?: EnderecoDTO;
	produtoServicos?: ProdutoServicoDTO[];
	imageUrl?: string;
}