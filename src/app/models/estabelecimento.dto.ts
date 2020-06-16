export interface EstabelecimentoDTO {

	id: string;
	cnpj: string;
	nome: string;
	instagram?: string;
	facebook?: string;
	site?: string;
	horario: string;
	telefones: string[];
	imageUrl?: string;
}