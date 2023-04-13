/**********************************************************************************************
 * Objetivo: criar criar uma API que ira disponiblizar os dados de alunos conforme seus respectivos cursos
 * Autor: Daniela Lino e João Victor
 * Data: 27/03/2023
 * Versão: 1.0
 **********************************************************************************************/
//Import das Dependencias do projeto
const dadosCursos = require('./modulo/modulo.js')

//Dependencia para criar as requisições da API
const express = require('express');

//Dependencia para gerenciar as permissões da API
const cors = require('cors');

//Dependencia para gerenciar o corpo das requisições da API
const bodyParser = require('body-parser');
const { request } = require('http');
const { response } = require('express');

//Objeto com as características do express
const app = express();

app.use((request, response, next) => {
    //API pública - fica disponível para utilização de qualquer aplicação
    //API privada - somente o IP informado poderá consumir dados da API

    //Define se a API será publica ou privada
    response.header('Access-Control-Allow-Origin', '*');

    //Permite definir quais métodos poderão ser utilizados nas requisições da API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    //Envia para o cors() as regras de permissões
    app.use(cors());

    next();
})

//EndPoint - Que retorna uma lista de todos os cursos 
//oferecidos pela escola e suas respectivas informações
app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {

    //variável para chamar a função que lista os cursos
    let cursos = dadosCursos.getListaCursos()

    //Tratamento para validar o sucesso da requisição 
    if (cursos) {
        response.status(200);
        response.json(cursos);

    } else {
        response.status(500);
        dadosEstado.message = 'Não foi possível processar por problemas internos'
    }


})
//EndPoint - Que retorna uma lista de todos os alunos 
//matriculados na escola e seus respectivos dados, ou alunos específicos de um status estipulado ou curso.
app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {

    let alunos;
    let dadosAluno = {};
    let siglaCurso = request.query.cursos
    let status = request.query.status
    let statusCode;

    if (siglaCurso !== undefined && status !== undefined) {
        //variável para chamar a função que lista os cursos
        if (!isNaN(siglaCurso) || !isNaN(status)) {
            response.status(400);
            dadosAluno.message = 'Não foi possível processar pois os dados de entrada que foi enviado não corresponde ao exigido, confira o valor, precisa ser a sigla de um dos cursos e um tipo de status'
        } else {

            let alunosCurso = dadosCursos.getListaAlunosCursoStatus(siglaCurso, status);
            if (alunosCurso) {
                
                statusCode = 200;
                dadosAluno = alunosCurso;

            } else {
                console.log(2);
                statusCode = 404;
                dadosAluno.message = 'Não foi possível encontrar os dados.'
            }
            console.log(dadosAluno);
        }

    } else if (siglaCurso !== undefined && status == undefined) {
        //variável para chamar a função que lista os cursos
        if (!isNaN(siglaCurso)) {
            console.log(33);
            response.status(400);
            dadosAluno.message = 'Não foi possível processar pois os dados de entrada que foi enviado não corresponde ao exigido, confira o valor, precisa ser a sigla de um dos cursos'
        } else {

            let alunosCurso = dadosCursos.getListaAlunosCurso(siglaCurso);

            if (alunosCurso) {
                statusCode = 200;
                dadosAluno = alunosCurso;
            } else {
                statusCode = 404;
                dadosAluno.message = 'Não foi possível encontrar os dados.'
            }
        }

    }
    else if (status !== undefined && siglaCurso == undefined) {
        
        //variável para chamar a função que lista os cursos
        if (!isNaN(status)) {
            response.status(400);
            dadosAluno.message = 'Não foi possível processar pois os dados de entrada que foi enviado não corresponde ao exigido, confira o valor, precisa ser a sigla de um dos cursos'
        } else {

            let alunoStatus = dadosCursos.getListaAlunosStatus(status);

            if (alunoStatus) {
                statusCode = 200;
                dadosAluno = alunoStatus;
            } else {
                statusCode = 404;
                dadosAluno.message = 'Não foi possível encontrar os dados.'
            }
        }

    } else {
        let alunos = dadosCursos.getListaAlunos()

        //Tratamento para validar o sucesso da requisição 
        if (alunos) {
            response.status(200);
            response.json(alunos);
        }
        response.status(500);
        dadosCursos.message = 'Não foi possível processar por problemas internos'
    }


    //Retorna o código e o JSON
    response.status(statusCode);
    response.json(dadosAluno);

})
//EndPoint - Retorna dados de um aluno específico
//com base no número de matrícula.
app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next) {

    let statusCode;
    let dadosAlunoMatricula = {};

    //Recebe a sigla do estado que será enviada pela URL da requisição
    let numeroMatricula = request.params.matricula
    console.log(numeroMatricula)

    //Tratamento para validação de entrada de dados incorreta
    if (numeroMatricula == '' || numeroMatricula == undefined || isNaN(numeroMatricula)) {
        response.status(400);
        dadosAlunoMatricula.message = 'Não foi possível processar pois os dados de entrada que foi enviado não corresponde ao exigido, confira o valor, precisa ser um conjunto de números'
    } else {

        let matricula = dadosCursos.getDadosAluno(numeroMatricula);


        if (matricula) {
            statusCode = 200;
            dadosAlunoMatricula = matricula;
        } else {
            statusCode = 404;
            dadosAlunoMatricula.message = 'Não foi possível encontrar os dados.'
        }
    }
    //Retorna o código e o JSON
    response.status(statusCode);
    response.json(dadosAlunoMatricula);

});
//Roda o serviço da API para ficar guardando requisições
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080')
})