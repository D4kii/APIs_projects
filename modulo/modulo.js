/**********************************************************************************************
 * Objetivo: criar funções para no futuro integra-las a uma API que terá como 
 * objetivo retornar dados de alunos conforme seus respectivos cursos
 * Autor: Daniela Lino e João Victor
 * Data: 24/03/2023
 * Versão: 1.0
 **********************************************************************************************/
//Importando os JSON's
const alunos = require('./json/alunos.js');

const cursos = require('./json/cursos.js');

//criando variáveis para receber o caminho feito dentro do JSON
const caminhoAlunos = alunos.alunos;
const caminhoCursos = cursos.cursos;

//Função que recupera uma lista de todos os cursos oferecidos pela escola
const getListaCursos = function () {
    const cursosArray = caminhoCursos.slice();
    const cursosNewJson = {};
    const cursosNewArray = [];
    let status;

    cursosArray.forEach(dadosCurso => {
        if (cursosArray !== undefined) {

            cursosNewArray.push(dadosCurso);
            cursosNewJson.cursos = cursosNewArray;
            status = true;

        } else {
            status = false;
        }
    });
    if (status) {
        return cursosNewJson;
    } else {
        return status;
    }

};

//Função que recupera uma lista de todos os alunos matriculados na escola.
const getListaAlunos = function () {
    const alunosArray = caminhoAlunos.slice()
    const alunosNewJson = {}
    const alunosNewArray = []
    let status;

    if (alunosArray !== undefined) {
        alunosArray.forEach(infoAluno => {
            const dadosAlunos = {}

            dadosAlunos.nome = infoAluno.nome
            dadosAlunos.matricula = infoAluno.matricula
            dadosAlunos.image = infoAluno.foto
            dadosAlunos.sexo = infoAluno.sexo

            infoAluno.curso.forEach(infoCurso => {
                dadosAlunos.nomeCurso = infoCurso.nome
                dadosAlunos.sigla = infoCurso.sigla
                dadosAlunos.conclusao = infoCurso.conclusao
                dadosAlunos.disciplinas = infoCurso.disciplinas
            });
            dadosAlunos.status = infoAluno.status
            alunosNewArray.push(dadosAlunos)
            alunosNewJson.alunos = alunosNewArray
            status = true;

        });
    } else {
        status = false;
    }
    if (status) {
        return alunosNewJson;
    } else {
        return false
    }
}

//Função que recupera informações de um aluno específico com base no número de matrícula.
const getDadosAluno = function (filtro) {
    const matriculaNumber = filtro;
    const dadosAlunosJson = caminhoAlunos.slice()
    const alunosDadosNewJson = {}
    const alunosDadosNewArray = []
    let status = true;

    if (dadosAlunosJson !== undefined) {
        dadosAlunosJson.forEach(dadosAlunos => {
            if (matriculaNumber == dadosAlunos.matricula) {


                const infoAluno = {}

                infoAluno.nome = dadosAlunos.nome
                infoAluno.matricula = dadosAlunos.matricula
                infoAluno.image = dadosAlunos.foto
                infoAluno.sexo = dadosAlunos.sexo

                dadosAlunos.curso.forEach(infoCurso => {
                    infoAluno.nomeCurso = infoCurso.nome
                    infoAluno.sigla = infoCurso.sigla
                    infoAluno.conclusao = infoCurso.conclusao
                    infoAluno.disciplinas = infoCurso.disciplinas
                });
                infoAluno.status = dadosAlunos.status

                alunosDadosNewArray.push(infoAluno);
                alunosDadosNewJson.matricula = dadosAlunos.matricula;
                alunosDadosNewJson.aluno = alunosDadosNewArray;

                status = true;
            }
        });
    } else {
        status = false;
    }
    if (status) {
        return alunosDadosNewJson;
    } else {
        return status;
    }

}
//Função que recupera uma lista de todos os alunos matriculados no curso especificado. 
const getListaAlunosCurso = function (filtro) {
    const CursoEspecificado = filtro;
    const listaAlunosCursoJson = caminhoAlunos.slice()
    const listaAlunosCursoNewJson = {}
    const listaAlunosCursoNewArray = []
    let status = true;

    if (listaAlunosCursoJson !== undefined) {
        listaAlunosCursoJson.forEach(dadosAlunosCurso => {
            const curso = dadosAlunosCurso.curso
            dadosAlunosCurso.curso.forEach(infoCurso => {
                if (CursoEspecificado == infoCurso.sigla) {


                    const infoAluno = {}

                    infoAluno.nome = dadosAlunosCurso.nome
                    infoAluno.matricula = dadosAlunosCurso.matricula
                    infoAluno.image = dadosAlunosCurso.foto
                    infoAluno.sexo = dadosAlunosCurso.sexo

                    infoAluno.nomeCurso = infoCurso.nome
                    infoAluno.sigla = infoCurso.sigla
                    infoAluno.conclusao = infoCurso.conclusao
                    infoAluno.disciplinas = infoCurso.disciplinas

                    infoAluno.status = dadosAlunosCurso.status

                    listaAlunosCursoNewArray.push(infoAluno);
                }
            });
            listaAlunosCursoNewJson.alunos = listaAlunosCursoNewArray;

            status = true;
        });
    } else {
        status = false;
    }
    if (status) {
        return listaAlunosCursoNewJson;
    } else {
        return status;
    }
}
//Função que recupera uma lista de todos os alunos com o status especificado.
const getListaAlunosStatus = function (filtro) {
    const statusAluno = filtro;
    const listaAlunosStatusJson = caminhoAlunos.slice()
    const listaAlunosStatusNewJson = {}
    const listaAlunosStatusNewArray = []
    let status = true;

    if (listaAlunosStatusJson !== undefined) {
        listaAlunosStatusJson.forEach(dadosAlunos => {
            if (statusAluno == dadosAlunos.status) {


                const dadoAlunoObject = {}

                dadoAlunoObject.nome = dadosAlunos.nome
                dadoAlunoObject.matricula = dadosAlunos.matricula
                dadoAlunoObject.image = dadosAlunos.foto
                dadoAlunoObject.sexo = dadosAlunos.sexo

                dadosAlunos.curso.forEach(infoCurso => {
                    dadoAlunoObject.nomeCurso = infoCurso.nome
                    dadoAlunoObject.sigla = infoCurso.sigla
                    dadoAlunoObject.conclusao = infoCurso.conclusao
                    dadoAlunoObject.disciplinas = infoCurso.disciplinas
                });
                dadoAlunoObject.status = dadosAlunos.status

                listaAlunosStatusNewArray.push(dadoAlunoObject);
                listaAlunosStatusNewJson.status = dadosAlunos.status;
                listaAlunosStatusNewJson.alunos = listaAlunosStatusNewArray;

                status = true;
            }
        });
    } else {
        status = false;
    }
    if (status) {
        return listaAlunosStatusNewJson;
    } else {
        return status;
    }
}
// getListaCursos();
// getListaAlunos();
// getDadosAluno(20151001001);
// console.log(getListaAlunosCurso('DS'));
// getListaAlunosStatus('Finalizado');

module.exports = {
    getListaCursos,
    getListaAlunos,
    getDadosAluno,
    getListaAlunosCurso,
    getListaAlunosStatus

}