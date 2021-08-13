import { model, Schema } from 'mongoose';

const company = new Schema(
    {
        cnpj: { type: String, required: true },
        identificador_matriz_filial: { type: Number, required: true },
        descricao_matriz_filial: { type: String, required: true },
        razao_social: { type: String, required: true },
        nome_fantasia: { type: String, required: true },
        situacao_cadastral: { type: Number, required: true },
        descricao_situacao_cadastral: { type: String, required: true },
        data_situacao_cadastral: { type: String, required: true },
        motivo_situacao_cadastral: { type: Number, required: true },
        nome_cidade_exterior: { type: String },
        codigo_natureza_juridica: { type: Number, required: true },
        data_inicio_atividade: { type: String, required: true },
        cnae_fiscal: { type: Number, required: true },
        cnae_fiscal_descricao: { type: String, required: true },
        logradouro: { type: String, required: true },
        numero: { type: String, required: true },
        complemento: { type: String, required: true },
        bairro: { type: String, required: true },
        cep: { type: Number, required: true },
        uf: { type: String, required: true },
        codigo_municipio: { type: Number, required: true },
        municipio: { type: String, required: true },
        ddd_telefone_1: { type: String, required: true },
        ddd_telefone_2: { type: String },
        ddd_fax: { type: String },
        qualificacao_do_responsavel: { type: Number, required: true },
        capital_social: { type: Number, required: true },
        porte: { type: Number, required: true },
        descricao_porte: { type: String, required: true },
        opcao_pelo_simples: { type: Boolean, required: true },
        data_opcao_pelo_simples: { type: String },
        data_exclusao_pelo_simples: { type: String },
        opcao_pelo_mei: { type: Boolean, required: true },
        situacao_especial: { type: String },
        data_situacao_especial: { type: String },
        cnaes_secundarios: [
                {
                        codigo: { type: Number, required: true },
                        descricao: { type: String, required: true }
                },
        ],
        qsa: [
                {
                    identificador_de_socio: { type: Number, required: true },
                    nome_socio: { type: String, required: true },
                    cnpj_cpf_do_socio: { type: String },
                    codigo_qualificacao_socio: { type: Number },
                    percentual_capital_social: { type: Number },
                    data_entrada_sociedade: { type: String },
                    cpf_representante_legal: { type: String },
                    nome_representante_legal: { type: String },
                    codigo_qualificacao_representante_legal: { type: String },
                },
        ]
    }
);
const Company = model('Company', company, 'Company');

export { Company };
