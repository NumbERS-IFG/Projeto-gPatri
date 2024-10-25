const Atividade = require("../models/atividade");

class AtividadeController {
    //LISTA TODOS OS ELEMENTOS
    async index(req, res) {
        try {
            let atividades = await Atividade.findAll();
            return res.status(200).json(atividades);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível consultar atividades.", detalhes: error});
        }
    }

    //LISTA DE ACORDO COM ID
    async show(req, res) {
        try {
            let atividade = await Atividade.findById(req.params.id);
            return res.status(200).json(atividade);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível encontrar a atividade.", detalhes: error});
        }
    }

    //INSERE ELEMENTOS
    async store(req, res) {
        const { nome = null, descricao = null } = req.body;

        try {
            let id = await Atividade.save(nome, descricao);
            res.status(201).json({mensagem: "Atividade inserida com sucesso!", "id": id});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao inserir atividade.", detalhes: error});
        }
    }

    //ATUALIZA ELEMENTOS
    async update(req, res) {
        const { nome = null, descricao = null } = req.body;
        const id = req.params.id;

        try {
            await Atividade.update(nome, descricao, id);
            res.status(201).json({mensagem: "Atividade atualizada com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao atualizar atividade.", detalhes: error});
        }
    }

    //ELIMINA ELEMENTOS
    async delete(req, res) {
        const id = req.params.id;

        try {
            await Atividade.delete(id);
            res.status(200).json({mensagem: "Atividade excluída com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao excluir atividade", detalhes: error});
        }
    }
}

module.exports = AtividadeController;