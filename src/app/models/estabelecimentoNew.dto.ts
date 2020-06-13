export interface EstabelecimentoNewDTO {
    
    cnpj : string;
	instagram?: string;
	facebook?: string;
	site?: string;
    horario : string;
    categorias: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cep: string;
    cidadeId: string;
    UsuarioId: string;
    telefone1: string;
    telefone2?: string;
    telefone3?: string;
}