import './App.css';
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


function Certificado() {

    const URL = `https://localhost:3001/`

    const navigate = useNavigate();
    const [data, setData] = useState();
    const [revisao, setRevisao] = useState();
    const [codigo, setCodigo] = useState();
    const [validade, setValidade] = useState();
    const [responsavel, setResponsavel] = useState();
    const [registro, setRegistro] = useState();
    const [id, setId] = useState();
    const [editar, setEditar] = useState(false);
    const [empregadosList, setEmpregados] = useState([]);

    const add = () => {

        axios.post("http://localhost:3001/create", {
            data: data,
            revisao: revisao,
            codigo: codigo,
            validade: validade,
            responsavel: responsavel,
            registro: registro

        }).then(() => {
            getEmpregados();
            limparCampo();
            //alert sweetalert2
            Swal.fire({
                title: "<strong>Registrado com sucesso!</strong>",
                html: "<i>Certificado de autenticidade com o código do documento <strong>" + codigo + "</strong> registrado!</i>",
                icon: 'success',
                timer: 3000
            })
        }).catch(function (error) {
            Swal.fire({
                icon: "error",
                title: "Erro...",
                text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Tende mais tarde" : JSON.parse(JSON.stringify(error)).message
            })
        });
    }


    const update = () => {
        axios.put("http://localhost:3001/update", {
            id: id,
            data: data,
            revisao: revisao,
            codigo: codigo,
            validade: validade,
            responsavel: responsavel,
            registro: registro

        }).then(() => {
            getEmpregados();
            limparCampo();
            //alert sweetalert2
            Swal.fire({
                title: "<strong>Atualização efetuada com sucesso!</strong>",
                html: "<i>Certificado de autenticidade com o código do documento <strong>" + codigo + "</strong> Atualizado!</i>",
                icon: 'success',
                timer: 3000
            })
        }).catch(function (error) {
            Swal.fire({
                icon: "error",
                title: "Erro...",
                text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Tende mais tarde" : JSON.parse(JSON.stringify(error)).message

            });
        });
    }

    const deleteEmple = (val) => {
        //alert sweetalert2
        Swal.fire({
            title: "Quer Deletar?",
            html: "<i>Quer apagar os dados do documento <strong>" + val.codigo + "</strong>?</i>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, para deletar!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
                    getEmpregados();
                    limparCampo();
                    Swal.fire({
                        icon: 'success',
                        title: 'O arquivo com o código do Documento:' + val.codigo + ' foi Deletado.',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }).catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro...",
                        text: "Não pode eliminar o arquivo!",
                        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Tende mais tarde" : JSON.parse(JSON.stringify(error)).message
                    })
                });
            }
        });
    }

    const limparCampo = () => {
        setData("");
        setRevisao("");
        setCodigo("");
        setValidade("");
        setResponsavel("");
        setRegistro("");
        setEditar(false);
    }

    const editarEmpregado = (val) => {
        setEditar(true);

        setData(val.data);
        setRevisao(val.revisao);
        setCodigo(val.codigo);
        setValidade(val.validade);
        setResponsavel(val.responsavel);
        setRegistro(val.registro);
        setId(val.id);
    }

    //retorna as informações na tela
    const getEmpregados = () => {
        axios.get("http://localhost:3001/empregados").then(response => {
            setEmpregados(response.data);
            
        })
            .catch(error => {
                if (error.response) {
                    console.error('Erro resposta:', error.response.data);
                    console.error('Erro Status:', error.response.status);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            }
            );
    }

    getEmpregados();

    return (
        //Importando e visualizando os dados na tela

        <div className="container">
            <div className="card text-center">
                <div className="card-header">
                    <img src='./Images/logo_g8.png' width="250" height="100" />
                    <h1><i>Certificado de Autenticidade</i></h1>
                </div>
                <div className="card-body ">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Data da Elaboração do Documento:</span>
                        <input type="date"
                            onChange={(event) => {
                                setData(event.target.value);
                            }}
                            className="form-control" value={data} placeholder="Data da Elaboração do Documento" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>


                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Revisão:</span>
                        <input type="text"
                            onChange={(event) => {
                                setRevisao(event.target.value);
                            }}
                            className="form-control" value={revisao} placeholder="Digite a Revisão do Documento" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>


                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Código:</span>
                        <input type="text"
                            onChange={(event) => {
                                setCodigo(event.target.value);
                            }}
                            className="form-control" value={codigo} placeholder="Digite o código do Documento" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>


                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Validade:</span>
                        <input type="date"
                            onChange={(event) => {
                                setValidade(event.target.value);
                            }}
                            className="form-control" value={validade} placeholder="Digite a validade do Documento" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>


                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Responsável:</span>
                        <input type="text"
                            onChange={(event) => {
                                setResponsavel(event.target.value);
                            }}
                            className="form-control" value={responsavel} placeholder="Digite o nome do responsável Técnico" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>


                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Registro:</span>
                        <input type="text"
                            onChange={(event) => {
                                setRegistro(event.target.value);
                            }}
                            className="form-control" value={registro} placeholder="Digite o Registro Proficional CREA" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>


                </div>
                <div className="card-footer text-muted">
                    {
                        editar ?
                            <div>
                                <button className='btn btn-warning m-2' onClick={update}>Atualizar</button>
                                <button className='btn btn-info m-2' onClick={limparCampo}>Cancelar</button>
                            </div>
                            : <button className='btn btn-success' onClick={add}>Registrar</button>
                    }
                </div>
            </div>

            <table className="table table-success table-striped ">
                ...<thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Data</th>
                        <th scope="col">Revisão</th>
                        <th scope="col">Código</th>
                        <th scope="col">Validade</th>
                        <th scope="col">Técnico</th>
                        <th scope="col">CREA</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        empregadosList.map((val, key) => {
                            return <tr key={val.id}>
                                <th scope="row">{val.id}</th>
                                {/* Convertendo a data do formato Americano para Portugues Brasil */}
                                <td>{new Date(val.data).toLocaleDateString('pt-BR')}</td> 
                                <td>{val.revisao}</td>
                                <td>{val.codigo}</td>
                                 {/* Convertendo a data do formato Americano para Portugues Brasil */}
                                <td>{new Date(val.validade).toLocaleDateString('pt-BR')}</td>
                                <td>{val.responsavel}</td>
                                <td>{val.registro}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button"
                                            onClick={() => {
                                                editarEmpregado(val);
                                            }}

                                            className="btn btn-info">Editar</button>
                                        <button type="button" onClick={() => {
                                            deleteEmple(val);
                                        }} className="btn btn-danger">Delete</button>

                                        {/* Botão direciona ao PDF */}
                                        <button type="button"  onClick={() => navigate('/pdf', {
                                            state: {
                                                id: val.id,
                                                data: val.data,
                                                revisao: val.revisao,
                                                codigo: val.codigo,
                                                validade: val.validade,
                                                responsavel: val.responsavel,
                                                registro: val.registro
                                            }
                                        })} className='btn btn-success'>PDF</button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Certificado;


