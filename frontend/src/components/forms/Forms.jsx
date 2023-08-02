import React, {useEffect,useState}from 'react'
import { limit, CarregaQuestoes, CarregaRespostas, RemoveSessao } from '../../config/utils';
import './Forms.css'
import Questoes from './QuestoesDerivadas'
import axios from "axios";
import baseUrl from "../../config/api";
import Title from '../template/Title'
import Navbar from '../template/Navbar'
import Sidebar from '../template/Sidebar'
import UserSection from '../user/UserSection'
import {
    MDBInputGroup, MDBTextArea, MDBRadio, MDBCheckbox,
    MDBListGroup, MDBListGroupItem,
    MDBBtn} from 'mdb-react-ui-kit';
import SecaoRespostas from './SecaoResposta';
import SecaoDestinatarios from './SecaoDestinatarios';
import SecaoRelatorios from './SecaoRelatórios';

export default function Forms({navigate}){
    // Aba de respostas da aplicação
    const [respostas, setRespostas] = useState(null);
    // Aba de questoes que mostra todas as questoes do formulario
    const [questoes, setQuestoes] = useState([]);
    // Regula novas opcões
    const [input, setInput] = useState({content:<></>});

    // Modifia visibilidade da area de nova questao - 1 parte tipo questao
    const [typeQuestion, setTypeQuestion] = useState(<></>);
    // Modifia visibilidade da area de nova questao - 2 parte enunciado e opcao da questao
    const [newQuestion, setNewQuestion] = useState(<></>);

    // Auxilia no processo de adicao da questao na pagina
    const [novaQuestao, setNovaQuestao] = useState({});

    // Seta qual secao aparece, questoes, respostas, relatorios ou destinatarios
    const [secao, setsecao] = useState(1)

    useEffect(() => {
        CarregaQuestoes(setQuestoes)
        CarregaRespostas(setRespostas,navigate)
    }, [navigate]);

    // Questões
    function renderizaQuestoes(){
        return questoes?.map(element => {
            switch (element.type) {
                // Radiobox
                case 1:
                    return(
                        <MDBListGroupItem key={element.id} className='shadow rounded-2 mb-3'>
                            <MDBInputGroup className='mb-2 mt-1'>
                                <MDBBtn outline color='dark' onClick={e=>{toggleShowExcluiSalva(element.id)}} className='numQuestao'>{element.numero}</MDBBtn>
                                <textarea className='form-control textAreaEnunciado' id={'questao'+element.id} 
                                    defaultValue={element.enunciado} disabled 
                                    onChange={e=>{limit(e.target);questoes[questoes.map(object => object.id).indexOf(element.id)].enunciado=e.target.value}}/>
                            </MDBInputGroup>
                            <div id={"opcoes"+element.id} className='mx-2'>
                                {element.opcao1? <div className='d-flex'><MDBRadio labelClass={element.id+"-1"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao1} /><i role='button' onClick={e=>{editOpcao(element.id,1)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao2? <div className='d-flex'><MDBRadio labelClass={element.id+"-2"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao2} /><i role='button' onClick={e=>{editOpcao(element.id,2)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao3? <div className='d-flex'><MDBRadio labelClass={element.id+"-3"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao3} /><i role='button' onClick={e=>{editOpcao(element.id,3)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao4? <div className='d-flex'><MDBRadio labelClass={element.id+"-4"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao4} /><i role='button' onClick={e=>{editOpcao(element.id,4)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao5? <div className='d-flex'><MDBRadio labelClass={element.id+"-5"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao5} /><i role='button' onClick={e=>{editOpcao(element.id,5)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao6? <div className='d-flex'><MDBRadio labelClass={element.id+"-6"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao6} /><i role='button' onClick={e=>{editOpcao(element.id,6)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao7? <div className='d-flex'><MDBRadio labelClass={element.id+"-7"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao7} /><i role='button' onClick={e=>{editOpcao(element.id,7)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao8? <div className='d-flex'><MDBRadio labelClass={element.id+"-8"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao8} /><i role='button' onClick={e=>{editOpcao(element.id,8)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao9? <div className='d-flex'><MDBRadio labelClass={element.id+"-9"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao9} /><i role='button' onClick={e=>{editOpcao(element.id,9)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao10?<div className='d-flex'><MDBRadio labelClass={element.id+"-10"} labelStyle={{wordBreak: 'break-word'}} label={element.opcao10}/><i role='button' onClick={e=>{editOpcao(element.id,10)}} className='edit editOpcoes mb-2 ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<i role='button' className="addQuestao mx-1 edit fas fa-regular fa-plus" onClick={e=>{addOpcao(element.id)}}></i>}
                                {handleInput(element.id)}
                            </div>
                            <div className='d-flex'>
                                <MDBBtn color='danger' outline onClick={e=>{excluiQuestao(element)}} id={'exclui'+element.id} className='ms-auto me-2' style={{display:'none'}}>Excluir</MDBBtn>
                                <MDBBtn color='success' outline onClick={e=>{editaQuestao(element.id)}} id={'salva'+element.id} style={{display: 'none'}}>Salvar</MDBBtn>
                            </div>
                        </MDBListGroupItem>
                    )
                // Text
                case 2:
                    return(
                        <MDBListGroupItem key={element.id} className='shadow rounded-2 mb-3'>
                            <MDBInputGroup className='mb-2 mt-1'>
                                <MDBBtn outline color='dark'  onClick={e=>{toggleShowExcluiSalva(element.id)}} className='numQuestao'>{element.numero}</MDBBtn>
                                <textarea className='form-control textAreaEnunciado' id={'questao'+element.id} 
                                    defaultValue={element.enunciado} disabled 
                                    onChange={e=>{limit(e.target);questoes[questoes.map(object => object.id).indexOf(element.id)].enunciado=e.target.value}}/>
                            </MDBInputGroup>
                            <MDBTextArea rows={4} label='Resposta' readOnly className='mb-2'/>
                            <div className='d-flex'>
                                <MDBBtn color='danger' outline onClick={e=>{excluiQuestao(element)}} id={'exclui'+element.id} className='ms-auto me-2' style={{display:'none'}}>Excluir</MDBBtn>
                                <MDBBtn color='success' outline onClick={e=>{editaQuestao(element.id)}} id={'salva'+element.id} style={{display: 'none'}}>Salvar</MDBBtn>
                            </div>
                        </MDBListGroupItem>
                    )
                // Checkbox
                case 3:
                    return(
                        <MDBListGroupItem key={element.id} className='shadow rounded-2 mb-3'>
                            <MDBInputGroup className='mb-2 mt-1'>
                                <MDBBtn outline color='dark' onClick={e=>{toggleShowExcluiSalva(element.id)}} className='numQuestao'>{element.numero}</MDBBtn>
                                <textarea className='form-control textAreaEnunciado' id={'questao'+element.id} 
                                    defaultValue={element.enunciado} disabled 
                                    onChange={e=>{limit(e.target);questoes[questoes.map(object => object.id).indexOf(element.id)].enunciado=e.target.value}}/>
                            </MDBInputGroup>
                            <div id={"opcoes"+element.id} className='mx-2'>
                                {element.opcao1? <div className='d-flex'><MDBCheckbox labelClass={element.id+"-1"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao1} /><i role='button' onClick={e=>{editOpcao(element.id,1)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao2? <div className='d-flex'><MDBCheckbox labelClass={element.id+"-2"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao2} /><i role='button' onClick={e=>{editOpcao(element.id,2)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao3? <div className='d-flex'><MDBCheckbox labelClass={element.id+"-3"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao3} /><i role='button' onClick={e=>{editOpcao(element.id,3)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao4? <div className='d-flex'><MDBCheckbox labelClass={element.id+"-4"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao4} /><i role='button' onClick={e=>{editOpcao(element.id,4)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao5? <div className='d-flex'><MDBCheckbox labelClass={element.id+"-5"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao5} /><i role='button' onClick={e=>{editOpcao(element.id,5)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao6? <div className='d-flex'><MDBCheckbox labelClass={element.id+"-6"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao6} /><i role='button' onClick={e=>{editOpcao(element.id,6)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao7? <div className='d-flex'><MDBCheckbox labelClass={element.id+"-7"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao7} /><i role='button' onClick={e=>{editOpcao(element.id,7)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao8? <div className='d-flex'><MDBCheckbox labelClass={element.id+"-8"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao8} /><i role='button' onClick={e=>{editOpcao(element.id,8)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao9? <div className='d-flex'><MDBCheckbox labelClass={element.id+"-9"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao9} /><i role='button' onClick={e=>{editOpcao(element.id,9)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao10?<div className='d-flex'><MDBCheckbox labelClass={element.id+"-10"} labelStyle={{wordBreak: 'break-word'}} label={element.opcao10}/><i role='button' onClick={e=>{editOpcao(element.id,10)}} className='edit editOpcoes mb-2 ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<i role='button' className="addQuestao edit fas fa-regular fa-plus" onClick={e=>{addOpcao(element.id)}}></i>}
                                {handleInput(element.id)}
                            </div>
                            <div className='d-flex'>
                                <MDBBtn color='danger' outline onClick={e=>{excluiQuestao(element)}} id={'exclui'+element.id} className='ms-auto me-2' style={{display:'none'}}>Excluir</MDBBtn>
                                <MDBBtn color='success' outline onClick={e=>{editaQuestao(element.id)}} id={'salva'+element.id} style={{display: 'none'}}>Salvar</MDBBtn>
                            </div>
                        </MDBListGroupItem>
                    )
                // Description
                case 4:
                    return(
                        <MDBListGroupItem key={element.id} className='shadow questoes rounded-2 mb-3'>
                            <MDBTextArea disabled id={'questao'+element.id}
                                         onChange={e=>{limit(e.target);questoes[questoes.map(object => object.id).indexOf(element.id)].enunciado=e.target.value}}
                                         defaultValue={element.enunciado} rows={4} label='Descrição' className='mb-2'/>
                            <MDBBtn outline color='dark' onClick={e=>{toggleShowExcluiSalva(element.id,true)}} className='numQuestao'><i className='p-1 fas fa-regular fa-pen'></i></MDBBtn>
                            <div className='d-flex'>
                                <MDBBtn color='danger' outline onClick={e=>{excluiQuestao(element)}} id={'exclui'+element.id} className='ms-auto me-2' style={{display:'none'}}>Excluir</MDBBtn>
                                <MDBBtn color='success' outline onClick={e=>{editaQuestao(element.id)}} id={'salva'+element.id} style={{display: 'none'}}>Salvar</MDBBtn>
                            </div>
                        </MDBListGroupItem>
                    )
                case 9:
                    return(
                        <div key={element.id}>
                        <MDBListGroupItem className='shadow rounded-2 mb-3'>
                            <MDBInputGroup className='mb-2 mt-1'>
                                <MDBBtn outline color='dark' onClick={e=>{toggleShowExcluiSalva(element.id)}} className='numQuestao'>{element.numero}</MDBBtn>
                                <textarea className='form-control textAreaEnunciado' id={'questao'+element.id} 
                                    defaultValue={element.enunciado} disabled 
                                    onChange={e=>{limit(e.target);questoes[questoes.map(object => object.id).indexOf(element.id)].enunciado=e.target.value}}/>
                            </MDBInputGroup>
                            <div id={"opcoes"+element.id} className='mx-2'>
                                {element.opcao1? <div className='pt-1 px-1 my-1 opcao1  rounded-2 d-flex'><MDBRadio labelClass={element.id+"-1"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao1} /><i role='button' onClick={e=>{editOpcao(element.id,1)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao2? <div className='pt-1 px-1 my-1 opcao2  rounded-2 d-flex'><MDBRadio labelClass={element.id+"-2"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao2} /><i role='button' onClick={e=>{editOpcao(element.id,2)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao3? <div className='pt-1 px-1 my-1 opcao3  rounded-2 d-flex'><MDBRadio labelClass={element.id+"-3"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao3} /><i role='button' onClick={e=>{editOpcao(element.id,3)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao4? <div className='pt-1 px-1 my-1 opcao4  rounded-2 d-flex'><MDBRadio labelClass={element.id+"-4"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao4} /><i role='button' onClick={e=>{editOpcao(element.id,4)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao5? <div className='pt-1 px-1 my-1 opcao5  rounded-2 d-flex'><MDBRadio labelClass={element.id+"-5"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao5} /><i role='button' onClick={e=>{editOpcao(element.id,5)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao6? <div className='pt-1 px-1 my-1 opcao6  rounded-2 d-flex'><MDBRadio labelClass={element.id+"-6"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao6} /><i role='button' onClick={e=>{editOpcao(element.id,6)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao7? <div className='pt-1 px-1 my-1 opcao7  rounded-2 d-flex'><MDBRadio labelClass={element.id+"-7"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao7} /><i role='button' onClick={e=>{editOpcao(element.id,7)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao8? <div className='pt-1 px-1 my-1 opcao8  rounded-2 d-flex'><MDBRadio labelClass={element.id+"-8"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao8} /><i role='button' onClick={e=>{editOpcao(element.id,8)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao9? <div className='pt-1 px-1 my-1 opcao9  rounded-2 d-flex'><MDBRadio labelClass={element.id+"-9"}  labelStyle={{wordBreak: 'break-word'}} label={element.opcao9} /><i role='button' onClick={e=>{editOpcao(element.id,9)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                                {element.opcao10?<div className='pt-1 px-1 my-1 opcao10 rounded-2 d-flex'><MDBRadio labelClass={element.id+"-10"} labelStyle={{wordBreak: 'break-word'}} label={element.opcao10}/><i role='button' onClick={e=>{editOpcao(element.id,10)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<i role='button' className="addQuestao edit fas fa-regular fa-plus" onClick={e=>{addOpcao(element.id)}}></i>}
                                {handleInput(element.id)}
                            </div>
                            <div className='d-flex'>
                                <MDBBtn color='danger' outline onClick={e=>{excluiQuestao(element)}} id={'exclui'+element.id} className='ms-auto me-2' style={{display:'none'}}>Excluir</MDBBtn>
                                <MDBBtn color='success' outline onClick={e=>{editaQuestao(element.id)}} id={'salva'+element.id} style={{display: 'none'}}>Salvar</MDBBtn>
                            </div>
                        </MDBListGroupItem>
                        <Questoes questao={element} navigate={navigate}/>
                        </div>
                    )
                default:
                    return(
                        <></>
                    )
            }
        });
    }

    async function addQuestao(){
        novaQuestao.enunciado=document.getElementById("novaQuestaoEnunciado").value
        if(novaQuestao.enunciado){
            if (novaQuestao.type===1||novaQuestao.type===3||novaQuestao.type===9) {
                novaQuestao.opcao1=document.getElementById("option1").value
                novaQuestao.opcao2=document.getElementById("option2").value
                novaQuestao.opcao3=document.getElementById("option3").value
                novaQuestao.opcao4=document.getElementById("option4").value
                novaQuestao.opcao5=document.getElementById("option5").value
                novaQuestao.opcao6=document.getElementById("option6").value
                novaQuestao.opcao7=document.getElementById("option7").value
                novaQuestao.opcao8=document.getElementById("option8").value
                novaQuestao.opcao9=document.getElementById("option9").value
                novaQuestao.opcao10=document.getElementById("option10").value
            }
            await axios.post(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+sessionStorage.getItem("formId"),novaQuestao,{
                headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem("token")
                }
            })
            .then(resposta=>{
                novaQuestao.id=resposta.data
                setQuestoes([
                    ...questoes,
                    novaQuestao
                ])
                setNovaQuestao({})
                setNewQuestion(<></>)
            })
            .catch((error) => {
                if (error.response.status===401) RemoveSessao(navigate)
                else{ console.log(error)}
            })
        }else{
            document.getElementById("novaQuestaoEnunciado").classList.add("is-invalid")
        }
    }

    async function editaQuestao(id){
        let dados=questoes[questoes.map(object => object.id).indexOf(id)]
        await axios.put(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+sessionStorage.getItem("formId")+"/"+id,dados,{
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        })
        .then(resposta=>{
            toggleShowExcluiSalva(id)
            document.getElementById("questao"+id).disabled=true
        }).catch((error) => {
            if (error.response.status===401) RemoveSessao(navigate)
            else{ console.log(error)}
        })
    }

    async function excluiQuestao(element){
        await axios.delete(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+sessionStorage.getItem("formId")+"/"+element.id,{
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            },
            data:{
                "type": element.type
            }
        })
        .then((response)=>{
            setQuestoes(questoes.filter(a=> a.id !== element.id))
        })
        .catch((error) => {
            if (error.response.status===401) RemoveSessao(navigate)
            else console.log(error)
        })
    }

    function addOpcao(id){
        var v = document.getElementsByClassName("addQuestao")
        var opcoes = document.getElementsByClassName("editOpcoes")
        setInput({
            id:id,
            content: <div className='my-2'>
                <MDBTextArea onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} id={"questao"+id+"novaopcao"} rows={3} label='Opcao' className='mb-2'/>
                <MDBBtn className='border border-secondary' color='light' onClick={e=>{
                    for (let item of v) item.style.display = "inline-block"
                    for (let item of opcoes) item.style.display = "inline-block"
                    setInput({})
                    let index = questoes.map(object => object.id).indexOf(id)
                    let newOption = document.getElementById("questao"+id+"novaopcao").value
                    if(newOption){
                        document.getElementById("exclui"+id).style.display= "inline-block"
                        document.getElementById("salva"+id).style.display = "inline-block"
                        if (!questoes[index].opcao1) {questoes[index].opcao1=newOption}
                        else if (!questoes[index].opcao2) {questoes[index].opcao2=newOption}
                        else if (!questoes[index].opcao3) {questoes[index].opcao3=newOption}
                        else if (!questoes[index].opcao4) {questoes[index].opcao4=newOption}
                        else if (!questoes[index].opcao5) {questoes[index].opcao5=newOption}
                        else if (!questoes[index].opcao6) {questoes[index].opcao6=newOption}
                        else if (!questoes[index].opcao7) {questoes[index].opcao7=newOption}
                        else if (!questoes[index].opcao8) {questoes[index].opcao8=newOption}
                        else if (!questoes[index].opcao9) {questoes[index].opcao9=newOption}
                        else if (!questoes[index].opcao10) {questoes[index].opcao10=newOption}
                    }
                }}><i className='p-1 fas fa-regular fa-pen'></i></MDBBtn>
            </div>
        })
        for (let item of v) item.style.display = "none"
        for (let item of opcoes) item.style.display = "none"
        document.getElementById("exclui"+id).style.display= "none"
        document.getElementById("salva"+id).style.display = "none"
    }

    function editOpcao(id,opcao){
        var v = document.getElementsByClassName("addQuestao")
        var opcoes = document.getElementsByClassName("editOpcoes")
        document.getElementById("exclui"+id).style.display= "inline-block"
        document.getElementById("salva"+id).style.display = "inline-block"
        setInput({
            id:id,
            content:<div className='my-2'>
                <MDBTextArea defaultValue={document.getElementsByClassName(id+"-"+opcao)[0].innerHTML} onChange={e=>{limit(e.target)}} id={"questao"+id+"novaopcao"} rows={3} label={'Opcão '+opcao} className='mb-2'/>
                <MDBBtn className='border border-secondary' color='light' onClick={e=>{
                    for (let item of v) item.style.display = "inline-block"
                    for (let item of opcoes) item.style.display = "inline-block"
                    document.getElementById("exclui"+id).style.display= "inline-block"
                    document.getElementById("salva"+id).style.display = "inline-block"
                    setInput({})
                    switch (opcao) {
                        case 1:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao1=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        case 2:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao2=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        case 3:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao3=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        case 4:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao4=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        case 5:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao5=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        case 6:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao6=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        case 7:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao7=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        case 8:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao8=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        case 9:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao9=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        case 10:
                            questoes[questoes.map(object => object.id).indexOf(id)].opcao10=document.getElementById("questao"+id+"novaopcao").value
                            break;
                        default:
                            break;
                    }
                }}><i className=' fas fa-regular fa-pen'></i></MDBBtn>
                <MDBBtn className=' mx-2 border border-secondary' color='light' onClick={()=>{
                    for (let item of v) item.style.display = "inline-block"
                    for (let item of opcoes) item.style.display = "inline-block"
                    setInput({})
                }}>Cancelar</MDBBtn>
            </div>
        })
        for (let item of v) item.style.display = "none"
        for (let item of opcoes) item.style.display = "none"
        document.getElementById("exclui"+id).style.display= "none"
        document.getElementById("salva"+id).style.display = "none"
    }

    function handleNewQuestion(){
        novaQuestao.type===4?
            questoes[0]?
                novaQuestao.numero=questoes.at(-1).numero:novaQuestao.numero=0
            :questoes[0]?
                novaQuestao.numero=questoes.at(-1).numero+1:novaQuestao.numero=1
        setTypeQuestion(<></>)
        switch (novaQuestao.type) {
            case 1:
            case 3:
            case 9:
                setNewQuestion(
                    <MDBListGroupItem noBorders key={"novaQuestao"} className='shadow rounded-3 mb-3'>
                        <div className='enunciado mt-1'>
                            <MDBInputGroup className='mb-2'>
                                <MDBBtn color='secondary' className='numQuestao'>{novaQuestao.numero}</MDBBtn>
                                <input onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} className='form-control' type='text' id={'novaQuestaoEnunciado'} defaultValue=''/>
                            </MDBInputGroup>
                        </div>
                        <div id={"novaQuestaoOpcoes"} className='mx-2'>
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 1'><input id='option1' className='form-control' onInput={e=>{document.getElementById("option2").disabled=false}} type='text'/></MDBInputGroup></div>}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 2'><input id='option2' className='form-control' onInput={e=>{document.getElementById("option3").disabled=false}} type='text' disabled/></MDBInputGroup></div>}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 3'><input id='option3' className='form-control' onInput={e=>{document.getElementById("option4").disabled=false}} type='text' disabled/></MDBInputGroup></div>}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 4'><input id='option4' className='form-control' onInput={e=>{document.getElementById("option5").disabled=false}} type='text' disabled/></MDBInputGroup></div>}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 5'><input id='option5' className='form-control' onInput={e=>{document.getElementById("option6").disabled=false}} type='text' disabled/></MDBInputGroup></div>}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 6'><input id='option6' className='form-control' onInput={e=>{document.getElementById("option7").disabled=false}} type='text' disabled/></MDBInputGroup></div>}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 7'><input id='option7' className='form-control' onInput={e=>{document.getElementById("option8").disabled=false}} type='text' disabled/></MDBInputGroup></div>}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 8'><input id='option8' className='form-control' onInput={e=>{document.getElementById("option9").disabled=false}} type='text' disabled/></MDBInputGroup></div>}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 9'><input id='option9' className='form-control' onInput={e=>{document.getElementById("option10").disabled=false}} type='text' disabled/></MDBInputGroup></div>}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup onKeyDown={e=>{limit(e.target)}} onKeyUp={e=>{limit(e.target)}} textBefore='Opção 10'><input id='option10' className='form-control' type='text' disabled/></MDBInputGroup></div>}
                        </div>
                        <div className='d-flex'>
                            <MDBBtn onClick={e=>{setNewQuestion(<></>)}} color='danger' className='ms-auto me-2'>Excluir</MDBBtn>
                            <MDBBtn onClick={e=>{addQuestao()}}>Salvar</MDBBtn>
                        </div>
                    </MDBListGroupItem>
                )
                break;
            case 2:
                setNewQuestion(
                    <MDBListGroupItem noBorders key={"novaQuestao"} className='rounded-3 mb-3'>
                        <div className='enunciado mt-1'>
                            <MDBInputGroup className='mb-2'>
                                <MDBBtn color='secondary' className='numQuestao'>{novaQuestao.numero}</MDBBtn>
                                <input className='form-control' type='text' id={'novaQuestaoEnunciado'} defaultValue=''/>
                            </MDBInputGroup>
                        </div>
                        <MDBTextArea rows={4} label='Resposta' readOnly className='mb-2'/>
                        <div className='d-flex'>
                            <MDBBtn onClick={e=>{setNewQuestion(<></>)}} color='danger' className='ms-auto me-2'>Excluir</MDBBtn>
                            <MDBBtn onClick={e=>{addQuestao()}}>Salvar</MDBBtn>
                        </div>
                    </MDBListGroupItem>
                )
                break;  
            case 4:
                setNewQuestion(
                    <MDBListGroupItem noBorders key={"novaQuestao"} className='rounded-3 mb-3'>
                        <MDBTextArea id='novaQuestaoEnunciado' rows={4} label='Resposta' className='mb-2'/>
                        <div className='d-flex'>
                            <MDBBtn onClick={e=>{setNewQuestion(<></>)}} color='danger' className='ms-auto me-2'>Excluir</MDBBtn>
                            <MDBBtn onClick={e=>{addQuestao()}}>Salvar</MDBBtn>
                        </div>
                    </MDBListGroupItem>
                )
                break;   
            default:
                break;
        }
    }

    function handleNewTypeQuestion(){
        setTypeQuestion(
            <MDBListGroupItem noBorders key={"typequestion"} className='shadow rounded-3 mb-3'>
                <div className='d-flex justify-content-around align-items-center'><div className='row w-100'>
                    <div className='enunciado col-sm-2'>Tipo da Questão:</div>
                    <div className='mx-2 mx-sm-0 col-sm-2 d-flex align-items-center'><MDBRadio  onClick={e=>{novaQuestao.type=3}} inline name='tipoQuestao' label='Caixa de seleção'></MDBRadio></div>
                    <div className='mx-2 mx-sm-0 col-sm-2 d-flex align-items-center'><MDBRadio  onClick={e=>{novaQuestao.type=1}} inline name='tipoQuestao' label='Múltipla Escolha'></MDBRadio></div>
                    <div className='mx-2 mx-sm-0 col-sm-2 d-flex align-items-center'><MDBRadio  onClick={e=>{novaQuestao.type=2}} inline name='tipoQuestao' label='Aberta'></MDBRadio></div>
                    <div className='mx-2 mx-sm-0 col-sm-2 d-flex align-items-center'><MDBRadio  onClick={e=>{novaQuestao.type=4}} inline name='tipoQuestao' label='Descrição'></MDBRadio></div>
                    <div className='mx-2 mx-sm-0 col-sm-2 d-flex align-items-center'><MDBRadio  onClick={e=>{novaQuestao.type=9}} inline name='tipoQuestao' label='Funcional'></MDBRadio></div>
                </div></div>
                <hr className='mt-1 mb-1'></hr>
                <div className='d-flex'>
                    <MDBBtn onClick={e=>{setTypeQuestion(<></>)}} color='danger' className='ms-auto me-2'>Excluir</MDBBtn>
                    <MDBBtn onClick={e=>{novaQuestao.type?handleNewQuestion():<></>}}>Proxima</MDBBtn>
                </div>
            </MDBListGroupItem>
        )
    }

    function handleInput(id){
        if (input.id && input.id===id) return input.content 
        else return <></>
    }
    
    function toggleShowExcluiSalva(id, show){
        let v= document.getElementById("questao"+id)
        v.disabled=!v.disabled
        document.getElementById("exclui"+id).style.display==="none"?document.getElementById("exclui"+id).style.display="inline-block":document.getElementById("exclui"+id).style.display="none"
        document.getElementById("salva"+id).style.display ==="none"?document.getElementById("salva"+id).style.display="inline-block":document.getElementById("salva"+id).style.display="none"
    }

    const secaoQuestoes = <main className='mt-3 principal'>
        {Title(sessionStorage.getItem('nomePesquisa'))}

        <MDBListGroup small className='mt-3' >
            {renderizaQuestoes()}
            {typeQuestion}
            {newQuestion}
        </MDBListGroup>
        <MDBBtn color='dark' outline onClick={e=>{handleNewTypeQuestion()}} className='border-1 btn-secondary mt-1'><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
    </main>
    // Questões


    function makeSecao() {
        if(secao===1){
            return(secaoQuestoes)
        }else if(secao===2){
            return(<SecaoDestinatarios navigate={navigate}/>)
        }else if(secao===3){
            return(<SecaoRespostas navigate={navigate} respostas={respostas}/>)
        }else if(secao===4){
            return(<SecaoRelatorios navigate={navigate}/>)
        }else{
            return(<UserSection navigate={navigate}/>)
        }
    }

    return(
        <section>
            {Sidebar({area:'questoes',setSecao:setsecao,qtdRespostas: respostas?.quantidadeRespostas})}
            {Navbar()}

            {makeSecao()} 
        </section>
    )
}