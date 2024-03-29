import React, {useEffect,useState}from 'react'
import axios from "axios";
import { RemoveSessao } from '../../config/utils';
import baseUrl from "../../config/api";
import {
    MDBInputGroup, MDBTextArea, MDBRadio, MDBCheckbox,
    MDBListGroup, MDBListGroupItem,
    MDBBtn} from 'mdb-react-ui-kit';


export default function QuestoesDerivadas({navigate,questao}){
    
    // Modifia visibilidade da area de nova questao - 1 parte tipo questao
    const [typeQuestion, setTypeQuestion] = useState(<></>);
    // Modifia visibilidade da area de nova questao - 2 parte enunciado e opcao da questao 
    const [newQuestion, setNewQuestion] = useState(<></>);

    // Regula novas opcões
    const [input, setInput] = useState({content:<></>});
    // Modifia visibilidade da area de nova questao - 1 parte tipo questao
    const [questoes, setQuestoes] = useState([]);
    // Auxilia no processo de adicao da questao na pagina
    const [novaQuestao, setNovaQuestao] = useState({});

    const opcoes = [1,2,3,4,5,6,7,8,9,10]


    useEffect(() => {
        if (sessionStorage.getItem("token")){
            questao?.derivadas?.sort((a,b)=>a.numero-b.numero)
            setQuestoes(questao.derivadas??[])
        }
        else RemoveSessao(navigate)
    }, [navigate,questao]);

    function renderizaQuestoes(opcao,cor){
        return questoes?.filter(e=>e.derivadaDeOpcao===opcao)?.map(element => {
            return <MDBListGroupItem key={element.id} className={cor}>
                {/* Enunciado */}
                {element.type!==4?
                <MDBInputGroup className='mb-1 mt-1'>
                    <MDBBtn outline color='dark' onClick={e=>{toggleShowExcluiSalva(element.id)}} className='numQuestao'>{questao.numero+'.'+element.numero}</MDBBtn>
                    <textarea id={'questao'+element.id} className='form-control textAreaEnunciado'
                        defaultValue={element.enunciado} disabled
                        onChange={e=>{questoes[questoes.map(object => object.id).indexOf(element.id)].enunciado=e.target.value}}/>
                </MDBInputGroup>
                :null}

                {/* Conteudo da questao */}
                {mapQuestoes(element)}

                {/* Box de edição */}
                <div id={'editBox'+element.id} className='d-flex align-items-center'>
                    <div id={'required'+element.id} style={{display:'none'}}>
                    <MDBCheckbox label="Obrigatória" labelClass={'label'+element.id} defaultChecked={element.obrigatoria>0} onChange={e=>{questoes[questoes.map(object => object.id).indexOf(element.id)].obrigatoria=e.target.checked?1:0}}/>
                    </div>
                    <MDBBtn id={'exclui'+element.id} style={{display:'none'}} color='danger'  outline onClick={e=>{excluiQuestao(element)}} className='ms-auto me-2'>Excluir</MDBBtn>
                    <MDBBtn id={'salva'+element.id}  style={{display:'none'}} color='success' outline onClick={e=>{editaQuestao(element.id)}}>Salvar</MDBBtn>
                </div>
            </MDBListGroupItem>
        });
    }

    function mapQuestoes(element){
        switch (element.type) {
            // Radiobox
            case 1:
                return(
                    <div className='mx-2'>
                        {element.opcao1? <div className={'d-flex pt-1 '+(element.opcao2  && 'border-bottom')}><MDBRadio labelClass={element.id+"-1"}  label={element.opcao1}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,1)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao2? <div className={'d-flex pt-1 '+(element.opcao3  && 'border-bottom')}><MDBRadio labelClass={element.id+"-2"}  label={element.opcao2}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,2)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao3? <div className={'d-flex pt-1 '+(element.opcao4  && 'border-bottom')}><MDBRadio labelClass={element.id+"-3"}  label={element.opcao3}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,3)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao4? <div className={'d-flex pt-1 '+(element.opcao5  && 'border-bottom')}><MDBRadio labelClass={element.id+"-4"}  label={element.opcao4}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,4)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao5? <div className={'d-flex pt-1 '+(element.opcao6  && 'border-bottom')}><MDBRadio labelClass={element.id+"-5"}  label={element.opcao5}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,5)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao6? <div className={'d-flex pt-1 '+(element.opcao7  && 'border-bottom')}><MDBRadio labelClass={element.id+"-6"}  label={element.opcao6}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,6)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao7? <div className={'d-flex pt-1 '+(element.opcao8  && 'border-bottom')}><MDBRadio labelClass={element.id+"-7"}  label={element.opcao7}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,7)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao8? <div className={'d-flex pt-1 '+(element.opcao9  && 'border-bottom')}><MDBRadio labelClass={element.id+"-8"}  label={element.opcao8}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,8)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao9? <div className={'d-flex pt-1 '+(element.opcao10 && 'border-bottom')}><MDBRadio labelClass={element.id+"-9"}  label={element.opcao9}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,9)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao10?<div className={'d-flex pt-1'}>                                      <MDBRadio labelClass={element.id+"-10"} label={element.opcao10} labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,10)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<i role='button' className="addQuestao mx-1 edit fas fa-regular fa-plus" onClick={e=>{addOpcao(element.id)}}></i>}
                        {handleInput(element.id)}
                    </div>
                )
            // Text
            case 2:
                return <MDBTextArea rows={2} label='Resposta' readOnly className='mb-2'/>
            // Checkbox
            case 3:
                return(
                    <div id={"opcoes"+element.id} className='mx-2'>
                        {element.opcao1? <div className={'d-flex pt-1 '+(element.opcao2  && 'border-bottom')}><MDBCheckbox labelClass={element.id+"-1"}  label={element.opcao1}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,1)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao2? <div className={'d-flex pt-1 '+(element.opcao3  && 'border-bottom')}><MDBCheckbox labelClass={element.id+"-2"}  label={element.opcao2}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,2)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao3? <div className={'d-flex pt-1 '+(element.opcao4  && 'border-bottom')}><MDBCheckbox labelClass={element.id+"-3"}  label={element.opcao3}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,3)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao4? <div className={'d-flex pt-1 '+(element.opcao5  && 'border-bottom')}><MDBCheckbox labelClass={element.id+"-4"}  label={element.opcao4}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,4)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao5? <div className={'d-flex pt-1 '+(element.opcao6  && 'border-bottom')}><MDBCheckbox labelClass={element.id+"-5"}  label={element.opcao5}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,5)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao6? <div className={'d-flex pt-1 '+(element.opcao7  && 'border-bottom')}><MDBCheckbox labelClass={element.id+"-6"}  label={element.opcao6}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,6)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao7? <div className={'d-flex pt-1 '+(element.opcao8  && 'border-bottom')}><MDBCheckbox labelClass={element.id+"-7"}  label={element.opcao7}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,7)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao8? <div className={'d-flex pt-1 '+(element.opcao9  && 'border-bottom')}><MDBCheckbox labelClass={element.id+"-8"}  label={element.opcao8}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,8)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao9? <div className={'d-flex pt-1 '+(element.opcao10 && 'border-bottom')}><MDBCheckbox labelClass={element.id+"-9"}  label={element.opcao9}  labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,9)}}  className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<></>}
                        {element.opcao10?<div className={'d-flex pt-1'}>                                      <MDBCheckbox labelClass={element.id+"-10"} label={element.opcao10} labelStyle={{wordBreak: 'break-word'}}/><i role='button' onClick={e=>{editOpcao(element.id,10)}} className='edit editOpcoes ms-auto p-1 fas fa-regular fa-pen fa-md'></i></div>:<i role='button' className="addQuestao edit fas fa-regular fa-plus" onClick={e=>{addOpcao(element.id)}}></i>}
                        {handleInput(element.id)}
                    </div>
                )
            // Description
            case 4:
                return(
                    <div>
                        <MDBTextArea disabled id={'questao'+element.id}
                                        onChange={e=>{questoes[questoes.map(object => object.id).indexOf(element.id)].enunciado=e.target.value}}
                                        defaultValue={element.enunciado} rows={3} label='Descrição' className='mb-2'/>
                        <MDBBtn outline color='dark' onClick={e=>{toggleShowExcluiSalva(element.id,true)}} className='numQuestao'><i className='p-1 fas fa-regular fa-pen'></i></MDBBtn>
                    </div>
                )
            default:
                return <></>
        }
    }

    async function addQuestao(opcao){
        novaQuestao.enunciado=document.getElementById("novaQuestaoEnunciado").value
        novaQuestao.obrigatoria=document.getElementById("newObrigatoria").checked?1:0
        if(novaQuestao.enunciado){
            if (novaQuestao.type===1||novaQuestao.type===3) {
                novaQuestao.opcao1 =document.getElementById("option1").value
                novaQuestao.opcao2 =document.getElementById("option2").value
                novaQuestao.opcao3 =document.getElementById("option3").value
                novaQuestao.opcao4 =document.getElementById("option4").value
                novaQuestao.opcao5 =document.getElementById("option5").value
                novaQuestao.opcao6 =document.getElementById("option6").value
                novaQuestao.opcao7 =document.getElementById("option7").value
                novaQuestao.opcao8 =document.getElementById("option8").value
                novaQuestao.opcao9 =document.getElementById("option9").value
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
                else console.log(error)
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
        .then(resposta=>{toggleShowExcluiSalva(id);document.getElementById("questao"+id).disabled=true})
        .catch((error) => {
            if (error.response.status===401) RemoveSessao(navigate)
            else console.log(error)
        })
    }

    async function excluiQuestao(element){
        await axios.delete(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+sessionStorage.getItem("formId")+"/"+element.id,{
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            },
            data:{...element}
        })
        .then((response)=>{
            setQuestoes(questoes.filter(a=> a.id !== element.id))
            questoes.filter(e=>e.derivadaDeOpcao===element.derivadaDeOpcao && e.numero>=element.numero).forEach(item => {
                item.numero-=1
            });
        })
        .catch((error) => {
            if (error.response.status===401) RemoveSessao(navigate)
            else console.log(error)
        })
    }

    function addOpcao( id){
        var v = document.getElementsByClassName("addQuestao")
        var opcoes = document.getElementsByClassName("editOpcoes")
        setInput({
            id:id,
            content: <div className='my-2'>
                <MDBTextArea id={"questao"+id+"novaopcao"} rows={3} label='Nova Opção' className='mb-2'/>
                <MDBBtn className='border border-secondary' color='light' onClick={e=>{
                    for (let item of v) item.style.display = "inline-block"
                    for (let item of opcoes) item.style.display = "inline-block"
                    setInput({})
                    let index = questoes.map(object => object.id).indexOf(id)
                    let newOption = document.getElementById("questao"+id+"novaopcao").value
                    if(newOption){
                        ShowExcluiSalva(id)
                        if (!questoes[index].opcao1) {questoes[index].opcao1=newOption}
                        else if (!questoes[index].opcao2)  {questoes[index].opcao2 =newOption}
                        else if (!questoes[index].opcao3)  {questoes[index].opcao3 =newOption}
                        else if (!questoes[index].opcao4)  {questoes[index].opcao4 =newOption}
                        else if (!questoes[index].opcao5)  {questoes[index].opcao5 =newOption}
                        else if (!questoes[index].opcao6)  {questoes[index].opcao6 =newOption}
                        else if (!questoes[index].opcao7)  {questoes[index].opcao7 =newOption}
                        else if (!questoes[index].opcao8)  {questoes[index].opcao8 =newOption}
                        else if (!questoes[index].opcao9)  {questoes[index].opcao9 =newOption}
                        else if (!questoes[index].opcao10) {questoes[index].opcao10=newOption}
                    }
                }}><i className='p-1 fas fa-regular fa-pen'></i></MDBBtn>
            </div>
        })
        for (let item of v) item.style.display = "none"
        for (let item of opcoes) item.style.display = "none"
    }

    function editOpcao(id,opcao){
        var v = document.getElementsByClassName("addQuestao")
        var opcoes = document.getElementsByClassName("editOpcoes")
        document.getElementById("exclui"+id).style.display= "inline-block"
        document.getElementById("salva"+id).style.display = "inline-block"
        setInput({
            id:id,
            content:<div className='my-2'>
                <MDBTextArea defaultValue={document.getElementsByClassName(id+"-"+opcao)[0].innerHTML} id={"questao"+id+"novaopcao"} label={'Opcão '+opcao} rows={3} className='mb-2'/>
                <MDBBtn className='border border-secondary' color='light' onClick={e=>{
                    for (let item of v) item.style.display = "inline-block"
                    for (let item of opcoes) item.style.display = "inline-block"
                    ShowExcluiSalva(id)
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
    }
    
    function handleNewQuestion(opcao){
        novaQuestao.derivadaDeOpcao = opcao
        novaQuestao.derivadaDeId = questao.id
        if (novaQuestao.type===4) {
            if(questoes?.filter(e=>e.derivadaDeOpcao===opcao)[0]) novaQuestao.numero=questoes.filter(e=>e.derivadaDeOpcao===opcao).at(-1).numero
            else novaQuestao.numero=questao.numero=0
        }
        else{
            if(questoes?.filter(e=>e.derivadaDeOpcao===opcao)[0]) novaQuestao.numero=questoes.filter(e=>e.derivadaDeOpcao===opcao).at(-1).numero+1
            else novaQuestao.numero=1
        }
        setTypeQuestion(<></>)
        switch (novaQuestao.type) {
            case 1:
            case 3:
                setNewQuestion(<MDBListGroupItem noBorders key={"novaQuestao"} className='shadow rounded-3 mb-3'>
                        <div className='enunciado mt-1'>
                            <MDBInputGroup className='mb-2'>
                                <MDBBtn color='secondary' className='numQuestao'>{questao.numero+'.'+novaQuestao.numero}</MDBBtn>
                                <input className='form-control' type='text' id={'novaQuestaoEnunciado'} defaultValue=''/>
                            </MDBInputGroup>
                        </div>
                        <div id={"novaQuestaoOpcoes"} className='mx-2'>
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup textBefore='Opção 1' ><input id='option1'  className='form-control' onInput={e=>{document.getElementById("option2").disabled=false }} type='text'/></MDBInputGroup></div>}
                            {[2,3,4,5,6,7,8,9].map(el=>{
                                return <div className='d-flex align-items-center mb-2'><MDBInputGroup textBefore={"Opção "+el}><input id={'option'+el}  className='form-control' onInput={e=>{document.getElementById("option"+(el+1)).disabled=false }} type='text' disabled/></MDBInputGroup></div>
                            })}
                            {<div className='d-flex align-items-center mb-2'><MDBInputGroup textBefore='Opção 10'><input id='option10' className='form-control' type='text' disabled/></MDBInputGroup></div>}
                        </div>
                        <div className='d-flex align-items-center'>
                            <MDBCheckbox label="Obrigatória" defaultChecked id='newObrigatoria'/>
                            <MDBBtn onClick={e=>{setNewQuestion(<></>)}} color='danger' className='ms-auto me-2'>Excluir</MDBBtn>
                            <MDBBtn onClick={e=>{addQuestao()}}>Salvar</MDBBtn>
                        </div>
                    </MDBListGroupItem>)
                break;
            case 2:
                setNewQuestion(<MDBListGroupItem noBorders key={"novaQuestao"} className='rounded-3 mb-3'>
                        <div className='enunciado mt-1'>
                            <MDBInputGroup className='mb-2'>
                                <MDBBtn color='secondary' className='numQuestao'>{questao.numero+'.'+novaQuestao.numero}</MDBBtn>
                                <input className='form-control' type='text' id={'novaQuestaoEnunciado'} defaultValue=''/>
                            </MDBInputGroup>
                        </div>
                        <MDBTextArea rows={4} label='Resposta' readOnly className='mb-2'/>
                        <div className='d-flex align-items-center'>
                            <MDBCheckbox label="Obrigatória" defaultChecked id='newObrigatoria'/>
                            <MDBBtn onClick={e=>{setNewQuestion(<></>)}} color='danger' className='ms-auto me-2'>Excluir</MDBBtn>
                            <MDBBtn onClick={e=>{addQuestao()}}>Salvar</MDBBtn>
                        </div>
                    </MDBListGroupItem>)
                break;  
            case 4:
                setNewQuestion(<MDBListGroupItem noBorders key={"novaQuestao"} className='rounded-3 mb-3'>
                        <MDBTextArea id='novaQuestaoEnunciado' rows={4} label='Descrição' className='mb-2'/>
                        <div className='d-flex align-items-center'>
                            <MDBCheckbox label="Obrigatória" defaultChecked id='newObrigatoria'/>
                            <MDBBtn onClick={e=>{setNewQuestion(<></>)}} color='danger' className='ms-auto me-2'>Excluir</MDBBtn>
                            <MDBBtn onClick={e=>{addQuestao()}}>Salvar</MDBBtn>
                        </div>
                    </MDBListGroupItem>)
                break;   
            default:
                break;
        }
    }

    function handleNewTypeQuestion(opcao){
        setTypeQuestion(<MDBListGroupItem noBorders className='shadow rounded-3 mb-3'>
            <div className='enunciado'>Tipo da Questão:</div>
                <hr className='mt-1 mb-1'></hr>
                <div className='row w-100 d-flex justify-content-between'>
                    <div className='mx-2 mx-sm-0 col-sm-3'><MDBRadio  onClick={e=>{novaQuestao.type=3}} name='tipoQuestao' label='Caixa de seleção'/></div>
                    <div className='mx-2 mx-sm-0 col-sm-3'><MDBRadio  onClick={e=>{novaQuestao.type=1}} name='tipoQuestao' label='Múltipla Escolha'/></div>
                    <div className='mx-2 mx-sm-0 col-sm-2'><MDBRadio  onClick={e=>{novaQuestao.type=2}} name='tipoQuestao' label='Aberta'/></div>
                    <div className='mx-2 mx-sm-0 col-sm-2'><MDBRadio  onClick={e=>{novaQuestao.type=4}} name='tipoQuestao' label='Descrição'/></div>
                </div>
                <hr className='mt-1 mb-2'></hr>
                <div className='d-flex'>
                    <MDBBtn onClick={e=>{setTypeQuestion(<></>)}} color='danger' className='ms-auto me-2'>Excluir</MDBBtn>
                    <MDBBtn onClick={e=>{novaQuestao.type?handleNewQuestion(opcao):<></>}}>Proxima</MDBBtn>
                </div>
            </MDBListGroupItem>)
    }
    
    function ShowExcluiSalva(id){
        document.getElementById("editBox"+id).classList.add("border-top")
        document.getElementById("editBox"+id).classList.add("pt-1")
        document.getElementById("required"+id).style.display = "inline-block"
        document.getElementById("exclui"+id).style.display   = "inline-block"
        document.getElementById("salva"+id).style.display    = "inline-block" 
    }

    function HideExcluiSalva(id){
        document.getElementById("editBox"+id).classList.remove("border-top")
        document.getElementById("editBox"+id).classList.remove("pt-1")
        document.getElementById("required"+id).style.display = "none"
        document.getElementById("exclui"+id).style.display   = "none"
        document.getElementById("salva"+id).style.display    = "none"
    }

    function toggleShowExcluiSalva(id){
        let v= document.getElementById("questao"+id)
        v.disabled=!v.disabled
        if(v.disabled) HideExcluiSalva(id)
        else ShowExcluiSalva(id)
    }

    function handleInput(id){
        if (input.id && input.id===id) return input.content 
        else return <></>
    }

    return (<>{typeQuestion}{newQuestion}{opcoes.map(element =>{
        switch (element){
            case 1: return(
                <div key='questoesopcao1'>
                    {questao.opcao1?<MDBListGroup small className='my-1' >
                        {renderizaQuestoes(1,'opcao1')}
                    </MDBListGroup>:null}
                    {questao.opcao1? 
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(1)}} className={'opcao1 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===1).length>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>) 
            case 2: return( 
                <div key='questoesopcao2'> 
                    {questao.opcao2?<MDBListGroup small className='my-1' >
                        {renderizaQuestoes(2,'opcao2')}
                    </MDBListGroup> :null}
                    {questao.opcao2?
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(2)}} className={'opcao2 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===2).length>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>) 
            case 3: return( 
                <div key='questoesopcao3'>
                    {questao.opcao3?<MDBListGroup small className='my-1'> 
                        {renderizaQuestoes(3,'opcao3')}
                    </MDBListGroup>:null}
                    {questao.opcao3? 
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(3)}} className={'opcao3 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===3).length>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>) 
            case 4: return( 
                <div key='questoesopcao4'> 
                    {questao.opcao4?<MDBListGroup small className='my-1' >
                        {renderizaQuestoes(4,'opcao4')}
                    </MDBListGroup> :null} 
                    {questao.opcao4? 
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(4)}} className={'opcao4 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===4).length>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>) 
            case 5: return( 
                <div key='questoesopcao5'> 
                    {questao.opcao5?<MDBListGroup small className='my-1' >
                        {renderizaQuestoes(5,'opcao5')}
                    </MDBListGroup> :null}
                    {questao.opcao5? 
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(5)}} className={'opcao5 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===5).length>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>) 
            case 6: return( 
                <div key='questoesopcao6'> 
                    {questao.opcao6?<MDBListGroup small className='my-1' >
                        {renderizaQuestoes(6,'opcao6')}
                    </MDBListGroup> :null}
                    {questao.opcao6? 
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(6)}} className={'opcao6 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===6).lenght>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>) 
            case 7: return( 
                <div key='questoesopcao7'> 
                    {questao.opcao7?<MDBListGroup small className='my-1' >
                        {renderizaQuestoes(7,'opcao7')}
                    </MDBListGroup> :null} 
                    {questao.opcao7? 
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(7)}} className={'opcao7 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===7).lenght>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>) 
            case 8: return( 
                <div key='questoesopcao8'> 
                    {questao.opcao8?<MDBListGroup small className='my-1' >
                        {renderizaQuestoes(8,'opcao8')}
                    </MDBListGroup> :null} 
                    {questao.opcao8? 
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(8)}} className={'opcao8 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===8).lenght>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>) 
            case 9: return( 
                <div key='questoesopcao9'> 
                    {questao.opcao9?<MDBListGroup small className='my-1' >
                        {renderizaQuestoes(9,'opcao9')}
                    </MDBListGroup> :null}
                    {questao.opcao9? 
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(9)}} className={'opcao9 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===9).lenght>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>)
            case 10: return(
                <div key='questoesopcao10'>
                    {questao.opcao10? <MDBListGroup small className='my-1' >
                        {renderizaQuestoes(10,'opcao10')}
                    </MDBListGroup>:null}
                    {questao.opcao10?
                        <MDBBtn onClick={e=>{handleNewTypeQuestion(10)}} className={'opcao10 btn-secondary border border-secondary '+(questoes.filter(e=>e.derivadaDeOpcao===10).lenght>0&&'mt-2')}><i className="edit fas fa-regular fa-plus fa-2x"></i></MDBBtn>
                    :null}</div>)
            default: return(<></>)
        }
    })}</>)
}