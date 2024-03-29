import React, {useEffect,useState}from 'react'
import Dashboard from '../dashboard/dashboard'
import './FormsUser.css'
import Title from '../template/Title'
import { limit, CarregaForms, RemoveSessao } from '../../config/utils'
import Navbar from '../template/Navbar'
import Sidebar from '../template/Sidebar'
import UserSection from './UserSection'
import axios from "axios"
import baseUrl from "../../config/api"
import {
    MDBInput, MDBTextArea,
    MDBListGroup, MDBListGroupItem,
    MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBDropdown, MDBDropdownMenu, MDBDropdownItem, MDBDropdownToggle} from 'mdb-react-ui-kit'

export default function PaginaUsuario({navigate}){

    // Modal para criar formulário
    const [centredModal, setCentredModal] = useState(false);
    // Modal para deletar formulário
    const [deletaFormulario, setDeletaFormulario] = useState(false);
    // Hook para setar o id do formulário a ser deletado
    const [idToDelete, setIdToDelete] = useState(0);
    // Hook para dizer se o formulário a ser deletado é derivado
    const [idDerivateToDelete, setIdDerivateToDelete] = useState(null);

    // Booleano usado para decidir se a função irá adicionar ou editar um formulário
    const [addForm, setAddForm] = useState(false);

    // Lista de formulários do usuário
    const [forms, setforms] = useState([]);
    const [form, setform] = useState({id: null, titulo:'', msgEmail: ''});

    const [secao, setSecao] = useState(1)

    const changeActive = (e) => {
        if(e.target.id==='formModal')limit(e.target)
        if(e.target.value==='') e.target.classList.remove('active')
        else e.target.classList.add('active')
    };
    
    const toggleShow = (element) => {
        setCentredModal(!centredModal)
        setform(element)
        document.getElementById("formModal").classList.remove("is-invalid");
        document.getElementById("msgEmailModal").classList.remove("is-invalid");
    };

    function onClickEditForm(element) {
        setAddForm(false)
        toggleShow(element)
        document.getElementById('formModal').value=element.titulo
        if(element.derivadoDeId) document.getElementById('formModal').readOnly = true
        else document.getElementById('formModal').readOnly = false
        document.getElementById('linkForm').value='https://formplataform-4ac81.web.app/'+element.id
        if(element.msgEmail){
            let mensagemIndex=element.msgEmail.indexOf(" {replaceStringHere} ")
            if(element.msgEmail.substring(0,mensagemIndex)){
                document.getElementById('msgEmailModal').value=element.msgEmail.substring(0,mensagemIndex)
            } 
            else{
                document.getElementById('msgEmailModal').value=''
            } 
            if(element.msgEmail.substring(mensagemIndex+21)){
                document.getElementById('rodEmailModal').value=element.msgEmail.substring(mensagemIndex+21)
            } 
            else{
                document.getElementById('rodEmailModal').value=''
            }
        } else{
            document.getElementById('msgEmailModal').value=''
            document.getElementById('rodEmailModal').value=''
        }
    };

    useEffect(() => {
        CarregaForms(setforms, navigate)
    }, [navigate]);

    async function editForm(){
        var change = document.getElementById("formModal");
        var changeMsg = document.getElementById("msgEmailModal").value+" {replaceStringHere} "+document.getElementById('rodEmailModal').value;
        let dados={"titulo": change.value, "msgEmail": changeMsg}
        if (addForm) {
            if (change.value !== '') {
                change.classList.remove("is-invalid");
                document.getElementById("msgEmailModal").classList.remove("is-invalid");
                await axios.post(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms",dados,{
                    headers: {
                        'Authorization': 'bearer ' + sessionStorage.getItem("token")
                    }
                })
                .then((response)=>{
                    setforms([
                        ...forms,
                        {id: response.data, titulo: change.value, msgEmail:changeMsg, derivados:[]}
                    ])
                })
                .catch((error) => {
                    if (error.response.status===401) RemoveSessao(navigate)
                    else console.log(error)
                })
                toggleShow({id: null, titulo:'', msgEmail: ''});
            }
            else{
                change.classList.add("is-invalid");
            }
        }else{
            change.classList.remove("is-invalid");
            document.getElementById("msgEmailModal").classList.remove("is-invalid");
            await axios.put(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+form.id,dados,{
                headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem("token")
                }
            })
            .then((response)=>{
                let especifico;
                if (form.derivadoDeId){
                    let temp = forms[forms.map(object => object.id).indexOf(form.derivadoDeId)]
                    especifico = temp.derivados[temp.derivados.map(object=>object.id).indexOf(form.id)]
                }
                else{
                    especifico = forms[forms.map(object => object.id).indexOf(form.id)]
                    especifico.titulo=change.value
                }
                especifico.msgEmail=changeMsg
            })
            .catch((error) => {
                if (error.response.status===401) RemoveSessao(navigate)
                else console.log(error)
            })
            toggleShow({id: null, titulo:'', msgEmail: ''});
        }
    }

    async function deleteForm(){
        if(idDerivateToDelete){
            // Form a ser deletado é derivado
            await axios.delete(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+idDerivateToDelete,{
                headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem("token")
                }
            })
            .then((response)=>{
                let indexOrig = forms.map(object => object.id).indexOf(idToDelete)
                forms[indexOrig].derivados=forms[indexOrig].derivados.filter(a=> a.id!== idDerivateToDelete)
            })
            .catch((error) => {
                if (error.response.status===401)RemoveSessao(navigate)
                else console.log(error)
            })
        }else{
            // Form a ser deletado é original
            await axios.delete(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+idToDelete,{
                headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem("token")
                }
            })
            .then((response)=>{
                setforms(forms.filter(a=> a.id !== idToDelete))
            })
            .catch((error) => {
                if (error.response.status===401) RemoveSessao(navigate)
                else console.log(error)
            })
        }
        setDeletaFormulario(false)
    }

    function toggleDerivados(id){
        let x = document.getElementById('icone'+id).aberto
        if (x===undefined || x==='F') {
            document.getElementById('form'+id+'derivados').style.display='block'
            document.getElementById('icone'+id).classList.remove("fa-angle-down")
            document.getElementById('icone'+id).classList.add("fa-angle-up")
            document.getElementById('icone'+id).aberto=''
        }
        else{
            document.getElementById('form'+id+'derivados').style.display='none'
            document.getElementById('icone'+id).classList.remove("fa-angle-up")
            document.getElementById('icone'+id).classList.add("fa-angle-down")
            document.getElementById('icone'+id).aberto='F'
        }
    }

    async function addDerivado(element){
        let novoDerivado = {}
        novoDerivado.titulo = element.titulo
        novoDerivado.msgEmail = element.msgEmail
        novoDerivado.derivadoDeId = element.id
        await axios.post(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms",novoDerivado,{
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        })
        .then(response=>{CarregaForms(setforms)})
        .catch((error) => {
            if (error.response.status===401) RemoveSessao(navigate)
            else console.log(error)
        })
    }

    async function cloneFormulario(id){
        await axios.post(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+id+"/clone",{id:id},{
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        })
        .then(response=>{CarregaForms(setforms)})
        .catch((error) => {
            if (error.response.status===401) RemoveSessao(navigate)
            else console.log(error)
        })
    }

    function renderizaDerivados(element){
        return element?.derivados.map(item =>{
            let tempDate2= new Date( Date.parse(item.dataEnviado))
            return (
                <MDBListGroupItem key={'formderivado'+item.id} className='listitem py-2 d-flex'>
                    {/* Link para form */}
                    <span className='zoom' onClick={()=>{
                        sessionStorage.setItem("formId",element.id)
                        navigate("/forms/"+item.id,{state:{derivado:item.id,nomePesquisa:element.titulo,notificacao:item?.notificacao}})}}>
                        {item.titulo}
                    </span>
                    {item.dataEnviado       && <i className='mx-1'>({tempDate2.toLocaleDateString('en-GB')})</i>}
                    {/* Opções */}
                    <MDBDropdown className='ms-auto shadow-0'>
                        <MDBDropdownToggle color='light' className='p-1 shadow-0'><i className="fas fa-solid fa-gear fa-xl"/></MDBDropdownToggle>
                        <MDBDropdownMenu className='dropdown-menu-end' dark>
                            <MDBDropdownItem link childTag='button' onClick={()=>onClickEditForm(item)}>
                                <i title='Editar Formulário' className="configitem fas fa-pen-to-square"/> Editar Formulário
                            </MDBDropdownItem>
                            <MDBDropdownItem link childTag='button' onClick={e=>{
                                    setIdToDelete(element.id)
                                    setIdDerivateToDelete(item.id)
                                    setDeletaFormulario(true)}}>
                                <i title='Excluir Formulário' className="configitem trashcan fas fa-trash-can"/> Excluir Formulário
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBListGroupItem>
            )
        })
    }

    function renderizaForms(){
        return forms?.map((element,index) => {
            let tempDate= new Date( Date.parse(element.dataEnviado))
            return[
                <MDBListGroupItem key={element.id} className='listitem d-flex'>
                    {/* Link para form */}
                    <span className='zoom' onClick={()=>{
                        sessionStorage.setItem("formId",element.id)
                        navigate('/forms',{state:{nomePesquisa:element.titulo,notificacao:element?.notificacao}})}}>
                        {element.titulo}
                    </span>
                    {element.dataEnviado       && <i className='mx-1'>({tempDate.toLocaleDateString('en-GB')})</i>}
                    {element.derivados?.length ?  <i id={'icone'+element.id} aberto='F' onClick={e=>{toggleDerivados(element.id)}} className="pt-1 mx-1 fas fa-regular fa-angle-down"/>:null}
                    {/* Opções */}
                    <MDBDropdown className='ms-auto shadow-0'>
                        <MDBDropdownToggle color='light' className='p-1'><i className="fas fa-solid fa-gear fa-xl"/></MDBDropdownToggle>
                        <MDBDropdownMenu className='dropdown-menu-end' dark>
                            <MDBDropdownItem link childTag='button' onClick={e=>{addDerivado(element)}}>
                                <i title='Adicionar novo envio de formulário' className="configitem fas fa-light fa-plus"/> Novo envio de formulário
                            </MDBDropdownItem>
                            <MDBDropdownItem link childTag='button' onClick={()=>onClickEditForm(element)}>
                                <i title='Editar Formulário' className="configitem fas fa-pen-to-square"/> Editar Formulário
                            </MDBDropdownItem>
                            <MDBDropdownItem link childTag='button' onClick={()=>cloneFormulario(element.id)}>
                                <i title='Clonar Formulário' className="configitem fas fa-clone"/> Duplicar formulário
                            </MDBDropdownItem>
                            <MDBDropdownItem link childTag='button' onClick={e=>{
                                    setIdToDelete(element.id)
                                    setIdDerivateToDelete(null)
                                    setDeletaFormulario(true)}}>
                                <i title='Excluir Formulário' className="configitem trashcan fas fa-trash-can"/> Excluir Formulário
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBListGroupItem>,
                // Renderiza derivados
                <div className='border' key={'derivados'+element.id} id={'form'+element.id+'derivados'} style={{display:'none',borderTop:0,borderBottom:0}}>
                    {element.derivados?.length ?
                        <MDBListGroup numbered className='mx-3' light>
                            {renderizaDerivados(element)}
                        </MDBListGroup>
                    :null}
                </div>
            ]
        });
    }

    const secaoForms=<main className='mt-3 principal'>
        {Title("Formulários")}
        
        <MDBListGroup numbered small className='shadow mt-3 rounded-3 bg-white' >
            {renderizaForms()}
        </MDBListGroup>
        
        <MDBBtn onClick={e=>{
            setAddForm(true)
            toggleShow({id: '', titulo:'', msgEmail: ''})
            document.getElementById('formModal').value=null
            document.getElementById('msgEmailModal').value=null
            document.getElementById('linkForm').value=null
            document.getElementById('rodEmailModal').value=null
            document.getElementById('formModal').readOnly = false
            }} outline color='dark' className='border-1 addFormButton bg-light mt-3'><i className="edit fas fa-light fa-plus fa-2x"></i></MDBBtn>
    
        {/* Modal de Adicionar Form */}
        <MDBModal staticBackdrop tabIndex='-1' show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog centered size='lg'>
                <MDBModalContent>
                    <MDBModalBody>
                        <MDBInput onKeyDown={changeActive} onKeyUp={changeActive} label='Titulo' id="formModal" type='text' className='active'/>
                        <MDBTextArea onKeyDown={changeActive} onKeyUp={changeActive} rows={4} label='Mensagem do Email' id="msgEmailModal" className='mt-2 active' type='text'/>
                        <MDBInput tabIndex='-1' label='Link do Formulário' className='mt-2 active' id="linkForm" readOnly/>
                        <MDBTextArea onKeyDown={changeActive} onKeyUp={changeActive} rows={4} label='Rodapé do Email' id="rodEmailModal" className='mt-2 active' type='text'/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={e=>{toggleShow({id: null, titulo:'', msgEmail: ''})}}> Cancelar </MDBBtn>
                        <MDBBtn onClick={e=>{editForm()}}>Salvar mudanças</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        
        {/* Modal de excluir Form */}
        <MDBModal staticBackdrop tabIndex='-1' show={deletaFormulario} setShow={setDeletaFormulario}>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader className='py-2'>
                        Tem certeza que deseja excluir o formulário e todas as informações dele? (Emails, questões, dados)
                    </MDBModalHeader>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={e=>{setDeletaFormulario(false)}}> Cancelar </MDBBtn>
                        <MDBBtn color='danger' onClick={e=>{deleteForm()}}>Excluir tudo</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </main>
       
    function makeSecao() {
        if(secao===1){
            return(secaoForms)
        }else if(secao===2){
            return (<Dashboard navigate={navigate}/>)
        }else{
            return (<UserSection navigate={navigate}/>)
        }
    }

    return(
        <section>
            {Sidebar({area:'forms',setSecao:setSecao})}
            {Navbar({navigate:navigate})}

            {makeSecao()}
        </section>
    )
}