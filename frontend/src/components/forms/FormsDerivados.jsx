import React, {useEffect,useState}from 'react'
import './Forms.css'
import axios from "axios";
import baseUrl from "../../config/api";
import { CarregaQuestoes, CarregaRespostas, CarregaEnvios, RemoveSessao, CarregaRelatorio } from '../../config/utils';
import Title from '../template/Title'
import Navbar from '../template/Navbar'
import Sidebar from '../template/Sidebar'
import UserSection from '../user/UserSection'
import {
    MDBInputGroup, MDBTextArea, MDBRadio, MDBCheckbox,
    MDBListGroup, MDBListGroupItem,
    MDBBtn, MDBProgress, MDBProgressBar, MDBContainer, MDBInput,
    MDBModal,MDBModalDialog,MDBModalContent,MDBModalTitle,MDBModalBody,MDBModalHeader} from 'mdb-react-ui-kit';

export default function FormsDerivados({navigate}){
    // Conta cliques para excluir email a ser enviado
    const [click, setClick] = useState([{id:''}]);

    // Aba de respostas da aplicação
    const [respostas, setRespostas] = useState(null);
    // Aba de questoes que mostra todas as questoes do formulario
    const [questoes, setQuestoes] = useState([]);
    // Aba de envios que mostra todos os emails a serem enviados do formulario
    const [destinatarioss, setContatos] = useState([]);
    const [destinatariossDB, setContatosDB] = useState([]);

    // Seta qual secao aparece, questoes, repostas ou envios
    const [secao, setsecao] = useState(2)

    // Usado para busca de destinatarioss
    const [nomeEmail, setNomeEmail] = useState(true);

    const [destinatariossPage, setContatosPage] = useState(1);
    // Confirmação de envio de email
    const [enviou, setEnviou] = useState(false);
    
    // Usado para dizer qual a pergunta e o tipo de reposta do relatório
    const [show, setShow] = useState(false);
    
    // Usado para dizer os valores do relatório de reposta
    const [destinatariossResposta, setContatosResposta] = useState([]);

    useEffect(() => {
        CarregaQuestoes(setQuestoes,navigate)
        CarregaEnvios(setContatos,setContatosDB,sessionStorage.getItem('formDeId'),navigate).then(()=>{
            CarregaRespostas(setRespostas,navigate)
        })
    }, [navigate]);
    
    const searchChange = (e) => {
        var envio = destinatariossDB.filter((el)=>{
            if (e.target.value === '') {
                return el;
            }
            //return the item which contains the user input
            else {
                if (nomeEmail) {
                    return el.email?.toLowerCase().includes(e.target.value)
                }
                else{
                    return el.nome?.toLowerCase().includes(e.target.value)
                }
            }

        })
        setContatos(envio)
    }; 


    // Questões
    function renderizaQuestoes(listaQuestoes,opcao){
        if(!(listaQuestoes?.length))listaQuestoes=questoes
        let opcoes=[1,2,3,4,5,6,7,8,9,10]
        return listaQuestoes?.map(element => {
            switch (element.type) {
                case 1:
                    return(
                        <MDBListGroupItem noBorders key={element.id} className={opcao?'rounded-3 mb-3 opcao'+opcao:'rounded-3 mb-3'}>
                            <MDBInputGroup className='mb-2 mt-1'>
                                <MDBBtn color='secondary' className='numQuestao'>{element.numero}</MDBBtn>
                                <textarea className='form-control' id={'questao'+element.id} 
                                    defaultValue={element.enunciado} disabled 
                                    style={{borderTopLeftRadius:'0px',borderBottomLeftRadius:'0px'}}/>
                            </MDBInputGroup>
                            <div id={"opcoes"+element.id} className='mx-2'>
                                {element.opcao1? <MDBRadio label={element.opcao1}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao2? <MDBRadio label={element.opcao2}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao3? <MDBRadio label={element.opcao3}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao4? <MDBRadio label={element.opcao4}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao5? <MDBRadio label={element.opcao5}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao6? <MDBRadio label={element.opcao6}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao7? <MDBRadio label={element.opcao7}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao8? <MDBRadio label={element.opcao8}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao9? <MDBRadio label={element.opcao9}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao10?<MDBRadio label={element.opcao10} labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                            </div>
                        </MDBListGroupItem>
                    )
                case 2:
                    return(
                        <MDBListGroupItem noBorders key={element.id} className={opcao?'rounded-3 mb-3 opcao'+opcao:'rounded-3 mb-3'}>
                            <MDBInputGroup className='mb-2 mt-1'>
                                <MDBBtn color='secondary' className='numQuestao'>{element.numero}</MDBBtn>
                                <textarea className='form-control' id={'questao'+element.id} 
                                    defaultValue={element.enunciado} disabled 
                                    style={{borderTopLeftRadius:'0px',borderBottomLeftRadius:'0px'}}/>
                            </MDBInputGroup>
                            <MDBTextArea rows={4} label='Resposta' readOnly className='mb-2'/>
                        </MDBListGroupItem>
                    )
                case 3:
                    return(
                        <MDBListGroupItem noBorders key={element.id} className={opcao?'rounded-3 mb-3 opcao'+opcao:'rounded-3 mb-3'}>
                            <MDBInputGroup className='mb-2 mt-1'>
                                <MDBBtn color='secondary' className='numQuestao'>{element.numero}</MDBBtn>
                                <textarea className='form-control' id={'questao'+element.id} 
                                    defaultValue={element.enunciado} disabled 
                                    style={{borderTopLeftRadius:'0px',borderBottomLeftRadius:'0px'}}/>                              
                            </MDBInputGroup>
                            <div id={"opcoes"+element.id} className='mx-2'>
                                {element.opcao1? <MDBCheckbox label={element.opcao1}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao2? <MDBCheckbox label={element.opcao2}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao3? <MDBCheckbox label={element.opcao3}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao4? <MDBCheckbox label={element.opcao4}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao5? <MDBCheckbox label={element.opcao5}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao6? <MDBCheckbox label={element.opcao6}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao7? <MDBCheckbox label={element.opcao7}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao8? <MDBCheckbox label={element.opcao8}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao9? <MDBCheckbox label={element.opcao9}  labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                                {element.opcao10?<MDBCheckbox label={element.opcao10} labelStyle={{wordBreak: 'break-word'}}/>:<></>}
                            </div>
                        </MDBListGroupItem>
                    )
                case 4:
                    return(
                        <MDBListGroupItem noBorders key={element.id} className={opcao?'rounded-3 mb-3 opcao'+opcao:'rounded-3 mb-3'}>
                            <MDBTextArea disabled id={'questao'+element.id}
                                         defaultValue={element.enunciado} rows={4} label='Descrição' className='mb-2'/>
                        </MDBListGroupItem>
                    )
                case 9:
                    return(<div  key={element.id} >
                        <MDBListGroupItem className='rounded-2 mb-3'>
                            <MDBInputGroup className='mb-2 mt-1'>
                                <MDBBtn color='secondary' className='numQuestao'>{element.numero}</MDBBtn>
                                <textarea className='form-control' id={'questao'+element.id} 
                                    defaultValue={element.enunciado} disabled 
                                    style={{borderTopLeftRadius:'0px',borderBottomLeftRadius:'0px'}}/>                            
                            </MDBInputGroup>
                            <div id={"opcoes"+element.id} className='mx-2'>
                                {element.opcao1? <div className='pt-1 px-1 my-1 opcao1  rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao1} /></div>:<></>}
                                {element.opcao2? <div className='pt-1 px-1 my-1 opcao2  rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao2} /></div>:<></>}
                                {element.opcao3? <div className='pt-1 px-1 my-1 opcao3  rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao3} /></div>:<></>}
                                {element.opcao4? <div className='pt-1 px-1 my-1 opcao4  rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao4} /></div>:<></>}
                                {element.opcao5? <div className='pt-1 px-1 my-1 opcao5  rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao5} /></div>:<></>}
                                {element.opcao6? <div className='pt-1 px-1 my-1 opcao6  rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao6} /></div>:<></>}
                                {element.opcao7? <div className='pt-1 px-1 my-1 opcao7  rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao7} /></div>:<></>}
                                {element.opcao8? <div className='pt-1 px-1 my-1 opcao8  rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao8} /></div>:<></>}
                                {element.opcao9? <div className='pt-1 px-1 my-1 opcao9  rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao9} /></div>:<></>}
                                {element.opcao10?<div className='pt-1 px-1 my-1 opcao10 rounded-2 d-flex'><MDBRadio labelStyle={{wordBreak: 'break-word'}} label={element.opcao10}/></div>:<></>}
                            </div>
                        </MDBListGroupItem>
                        {element?.derivadas?.length?opcoes.map(numero=>{
                            return (
                                <MDBListGroup key={element.id+'respostasopcao'+numero} className='mt-1 rounded-3' >
                                    {element.derivadas?.filter(s=>s.derivadaDeOpcao===numero).length?renderizaQuestoes(element.derivadas?.filter(s=>s.derivadaDeOpcao===numero),numero):null}
                                </MDBListGroup>)
                        }):null}
                    </div>)
                default:
                    return(
                        <></>
                    )
            }
        });
    }

    const secaoQuestoes = <main className='mt-3 principal'>
        {Title(sessionStorage.getItem('nomePesquisa'))}

        <MDBListGroup small className='mt-3' >
            {renderizaQuestoes()}
        </MDBListGroup>
    </main>
    // Questões

    // Contatos
    async function excluiRespostas(elemento){
        await axios.delete(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+sessionStorage.getItem("formDeId")+"/enviados/"+elemento.id+"?deleta=false",{
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        })
        .then((response)=>{
            elemento.respondido=0
            setContatos(destinatarioss.filter(a=> a.id !== elemento.id))
            setContatos([
                ...destinatarioss
            ])
        })
        .catch((error) => {
            if (error.response.status===401) {
                navigate('/login')
                RemoveSessao()
                alert("Faça o login")
            }else{ console.log(error)}
        })
    }

    function handleClick(elemento, cancel){
        if(click.find((element)=>element?.id === elemento.id)){
            setClick(click.filter(a=> a.id !== elemento.id))
            document.getElementById('warning'+elemento.id).style.display='none'
            document.getElementById('cancel'+elemento.id).style.display='none'
            if(!cancel) excluiRespostas(elemento)
        }else{
            document.getElementById('warning'+elemento.id).style.display='block'
            document.getElementById('cancel'+elemento.id).style.display='block'
            setClick([...click,{id:elemento.id}])
        }
    }

    async function sendEmails(){
        await axios.post(baseUrl+"/enviar",{UserId: sessionStorage.getItem("userId"),FormId: sessionStorage.getItem("formDeId")},{
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        })
        .then(()=>{setEnviou(true)})
        .catch((error) => {
            if (error.response.status===401) {
                navigate('/login')
                RemoveSessao()
                alert("Faça o login")
            }else if(error.response.status===402){alert("Usuário não possui uma senha de aplicativo de gmail. Acesse a página do usuário para saber mais.")}
            else{ console.log(error)}
        })
    }

    const secaoContatos = <main className='mt-3 principal'> 
        {Title(sessionStorage.getItem('nomePesquisa'),()=>CarregaEnvios(setContatos,setContatosDB,sessionStorage.getItem('formDeId'),navigate))}

        
        <MDBContainer fluid className='mt-3 p-3 rounded-3 bg-light'>
            <MDBRadio name='buscaContato' label='Buscar por email' onClick={e=>{setNomeEmail(true)}} inline />
            <MDBRadio name='buscaContato' label='Buscar por nome' onClick={e=>{setNomeEmail(false)}} inline />
            <MDBInput 
                className='mt-1'
                type="text"
                label="Busque aqui"
                onChange={searchChange} />
        </MDBContainer>

        {/* Emails */}
        <MDBListGroup small className='mt-3' >
            {destinatarioss?.slice((destinatariossPage-1)*15,((destinatariossPage-1)*15)+15).map(element => {
                if(element.respondido===2){
                    return(
                        <MDBListGroupItem className='py-2 px-2' key={element.id}>
                            <MDBInputGroup>
                                <MDBBtn onClick={e=>{handleClick(element)}} color='secondary' className='numQuestao'><i className="trashcan fas fa-trash-can"></i></MDBBtn>
                                <input className='form-control' type='text' defaultValue={element.email} disabled/>
                                <div role='button' onClick={e=>{sessionStorage.setItem('enviadoId',element.id);navigate('/resposta')}} color='secondary' className='numQuestao borda-direita' id={'edit'+element.id}><i className='p-2 ms-auto fas fa-solid fa-eye'></i></div>
                            </MDBInputGroup>
                            <div className='d-flex'><div className='text-danger p-1' id={'warning'+element.id} style={{display: 'none'}}>Todas as respostas desse email serão apagadas, se tiver certeza clique novamente</div><a href='/#' role='button' onClick={e=>{handleClick(element.id,true)}} id={'cancel'+element.id} style={{display: 'none'}} className='p-1 ms-auto'>Cancelar</a></div>
                        </MDBListGroupItem>
                    )
                }else{
                    return(
                        <MDBListGroupItem className='py-2 px-2' key={element.id}>
                            <MDBInputGroup>
                                <MDBBtn color='secondary' className='numQuestao'>@</MDBBtn>
                                <input className='form-control' type='text' defaultValue={element.email} disabled/>
                            </MDBInputGroup>
                        </MDBListGroupItem>
                    )
                }
            })}
        </MDBListGroup>

        {/* Modal de avisar que foi enviado */}
        <MDBModal tabIndex='-1' show={enviou} setShow={setEnviou}>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalBody className='py-2'>
                        Enviado com sucesso
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>

        {/* Botões de adição e envio de destinatarioss */}
        <div className='d-flex mt-3'>
            <MDBBtn outline color='dark' className=' ms-auto border-1 bg-light destinatariosBotoes' onClick={e=>{sendEmails()}}><i title='Enviar à todos os emails da lista' className="edit fas fa-light fa-paper-plane py-1"></i></MDBBtn>
        </div>

        {/* Pagination */}
        {destinatarioss.length>0
        ?<div className="d-flex justify-content-center mt-2">
            {destinatariossPage<=3?
            <MDBListGroup horizontal>
                <MDBListGroupItem className='pages' onClick={e=>{setContatosPage(1)}}>1</MDBListGroupItem>
                {Math.ceil(destinatarioss.length/15)>1?<MDBListGroupItem className='pages' onClick={e=>{setContatosPage(2)}}>2</MDBListGroupItem>:<></>}
                {Math.ceil(destinatarioss.length/15)>2?<MDBListGroupItem className='pages' onClick={e=>{setContatosPage(3)}}>3</MDBListGroupItem>:<></>}
                {Math.ceil(destinatarioss.length/15)>3?<MDBListGroupItem className='pages' onClick={e=>{setContatosPage(4)}}>4</MDBListGroupItem>:<></>}
                {Math.ceil(destinatarioss.length/15)>4?<MDBListGroupItem className='pages' onClick={e=>{setContatosPage(5)}}>5</MDBListGroupItem>:<></>}
                {Math.ceil(destinatarioss.length/15)>5?<MDBListGroupItem className='pages'>...</MDBListGroupItem>:<></>}
            </MDBListGroup>
            :destinatariossPage>((Math.ceil(destinatarioss.length/15))-3)?
            <MDBListGroup horizontal>
                {Math.ceil(destinatarioss.length/15)-5>0?<MDBListGroupItem className='pages'>...</MDBListGroupItem>:<></>}
                {Math.ceil(destinatarioss.length/15)-4>0?<MDBListGroupItem className='pages' onClick={e=>{setContatosPage(Math.ceil(destinatarioss.length/15)-4)}}>{Math.ceil(destinatarioss.length/15)-4}</MDBListGroupItem>:<></>}
                {Math.ceil(destinatarioss.length/15)-3>0?<MDBListGroupItem className='pages' onClick={e=>{setContatosPage(Math.ceil(destinatarioss.length/15)-3)}}>{Math.ceil(destinatarioss.length/15)-3}</MDBListGroupItem>:<></>}
                <MDBListGroupItem className='pages' onClick={e=>{setContatosPage(Math.ceil(destinatarioss.length/15)-2)}}>{Math.ceil(destinatarioss.length/15)-2}</MDBListGroupItem>
                <MDBListGroupItem className='pages' onClick={e=>{setContatosPage(Math.ceil(destinatarioss.length/15)-1)}}>{Math.ceil(destinatarioss.length/15)-1}</MDBListGroupItem>
                <MDBListGroupItem className='pages' onClick={e=>{setContatosPage(Math.ceil(destinatarioss.length/15))}}>{Math.ceil(destinatarioss.length/15)}</MDBListGroupItem>
            </MDBListGroup>
            :destinatariossPage>3?
            <MDBListGroup horizontal>
                <MDBListGroupItem className='pages'>...</MDBListGroupItem>
                <MDBListGroupItem className='pages' onClick={e=>{setContatosPage(destinatariossPage-2)}}>{destinatariossPage-2}</MDBListGroupItem>
                <MDBListGroupItem className='pages' onClick={e=>{setContatosPage(destinatariossPage-1)}}>{destinatariossPage-1}</MDBListGroupItem>
                <MDBListGroupItem className='pages' onClick={e=>{setContatosPage(destinatariossPage)}}>{destinatariossPage}</MDBListGroupItem>
                <MDBListGroupItem className='pages' onClick={e=>{setContatosPage(destinatariossPage+1)}}>{destinatariossPage+1}</MDBListGroupItem>
                <MDBListGroupItem className='pages' onClick={e=>{setContatosPage(destinatariossPage+2)}}>{destinatariossPage+2}</MDBListGroupItem>
                <MDBListGroupItem className='pages'>...</MDBListGroupItem>
            </MDBListGroup>
            :<></>}
        </div>:<></>}
    </main>
    // Contatos

    // Secao Respostas
    
    function renderizaRepostas(){
        return respostas?.respostas?.map(element => {
            return(
                <div  key={element.id} className='col-md-6 col-xxl-4'>
                <MDBListGroupItem className='shadow mt-3 rounded-3'>
                    <div className='porcentagem'>
                        {element.type===1?
                        <MDBRadio disabled defaultChecked={true} className='mt-1' value='' inline/>:
                        <MDBCheckbox disabled defaultChecked={true} className='mt-1' value='' inline/>}
                        {element.numero}) {element.enunciado}
                    </div>
                    <hr className='mt-0 mb-2'></hr>
                    <div id={"resposta"+element.id} className='mx-2'>
                        {element.type===9?makeBar(element,true):makeBar(element,false)}
                    </div>
                </MDBListGroupItem>
                {element.derivadas.length>0?renderizaRepostasDerivadas(element.derivadas,element):<></>}</div>
            )
        })
    }

    function renderizaRepostasDerivadas(derivadas, questaoOrig){
        let opcoes = [1,2,3,4,5,6,7,8,9,10]
        return opcoes.map(opcao=>{
            return (
                <MDBListGroup key={questaoOrig.id+'respostasopcao'+opcao} className='mt-1 rounded-3' >
                    {derivadas?.filter(s=>s.derivadaDeOpcao===opcao)?.map(element=>{
                        return (<MDBListGroupItem key={element.id} className={'mt-1 rounded-3 opcao'+opcao}>
                                    <div className='d-flex porcentagem'>{element.numero}) {element.enunciado}<div className='ms-auto'>{element.type===1?<MDBRadio disabled defaultChecked={true} className='mt-1' value='' inline/>:<MDBCheckbox disabled defaultChecked={true} className='mt-1' value='' inline/>}</div></div>
                                    <hr className='mt-0 mb-2'></hr>
                                    <div id={"resposta"+element.id} className='mx-2'>
                                        {makeBar(element,false)}
                                    </div>
                                </MDBListGroupItem>)})}
                </MDBListGroup>)
        })
    }

    function makeBar(element,tipo){
        let numero=0
        let sum = element.resposta.reduce((partialSum, a) => partialSum + a.quantidade, 0);
        let count=0
        return element.resposta?.map((item,index)=>{
            numero+=1
            count+=1
            let parcial=Math.trunc((item.quantidade/sum)*100)
            if(!parcial) parcial=0
            return(
                <div key={'Barra'+element.id+count} className='mb-2 porcentagem'> 
                    <div className={tipo?'rounded-3 px-1 mt-1  opcao'+count:"px-1 mt-1"}>{numero}) 
                        <div style={{cursor:'pointer',display:'inline'}} onClick={()=>{
                            setShow(item);
                            CarregaRelatorio(setContatosResposta,navigate,sessionStorage.getItem('formDeId'),element?.id,item);}}>{item.texto}
                        </div>
                    </div>
                    <MDBProgress height='20' className='rounded-3'>
                        <MDBProgressBar className='porcentagem' width={parcial} valuemin={0} valuemax={100}>{parcial}%</MDBProgressBar>
                    </MDBProgress>
                </div>
            )
        })
    }

    function renderizaRelatorio(){
        return destinatariossResposta?.data?.map(destinatarios => {
            return <MDBInputGroup key={destinatarios.email} className='mb-1'>
                    <input className='form-control' type='text' defaultValue={destinatarios.email} disabled/>
                </MDBInputGroup>
        })
    }

    const secaoRespostas = <main className='mt-3 principal'> 
        {Title(sessionStorage.getItem('nomePesquisa'))}
        <MDBListGroup small className='mt-3' >
            <div className='row'>
                {renderizaRepostas()}
            </div>
        </MDBListGroup>
        <MDBModal show={show} tabIndex='-1' setShow={setShow}>
            <MDBModalDialog size='md'>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>{destinatariossResposta?.enunciado}</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={e=>setShow(false)}></MDBBtn>
                </MDBModalHeader>
                <MDBContainer className='mt-2 mb-3 d-flex row justify-content-center'>
                    {renderizaRelatorio()}
                </MDBContainer>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </main>
    // Secao Respostas

    function makeSecao() {
        if(secao===1){
            return(secaoQuestoes)
        }else if(secao===2){
            return(secaoContatos)
        }else if(secao===3){
            return(secaoRespostas)
        }else{
            return(<UserSection navigate={navigate}/>)
        }
    }

    return(
        <section>
            {Sidebar('questoes',setsecao, respostas?.quantidadeRespostas)}
            {Navbar()}

            {makeSecao()}
        </section>
    )
}