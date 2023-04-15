import React, {useEffect,useState}from 'react'
import './Forms.css'
import axios from "axios";
import baseUrl from "../../config/api";
import Title from '../template/Title'
import Navbar from '../template/Navbar'
import Sidebar from '../template/Sidebar'
import UserSection from '../user/UserSection'
import {MDBListGroup,MDBListGroupItem, MDBRadio,MDBBtn,MDBInputGroup, MDBTextArea,MDBCheckbox} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function Resposta(){
    const navigate = useNavigate()
    const [main, setMain] = useState(1)

    const [respostas,setRespostas] = useState([{}])

    const [appearing, setAppearing] = useState(false)

    
    async function carregaResposta(){
        await axios.get(baseUrl+"/users/"+sessionStorage.getItem("userId")+"/forms/"+sessionStorage.getItem("formId")+"/respostas/"+sessionStorage.getItem("enviadoId"),{
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        }).then(response => setRespostas(response.data))
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")){
            carregaResposta()
        }
        else{
            console.warn("Faça o login")
            navigate('/login')
        }

    }, []);

    function renderizaRepostas(){
        return respostas?.map(element => {
            console.log(respostas)
            return(
                <>{element.type!==4?<MDBListGroupItem key={"r"+element.id} className={element?.type==9?'mt-3 rounded-3 opcao10':'mt-3 rounded-3'}>
                    <div className='porcentagem'>{element.numero}) {element.enunciado}</div>
                    <hr className='mt-0 mb-2'></hr>
                    <div className='mx-2'>
                        {element?makeResp(element):<></>}
                    </div>
                </MDBListGroupItem>:<></>}</>
            )
        })
    }

    function makeResp(element){
        switch (element.type) {
            case 9:
            case 1:
                return(
                    <div className='my-1'>
                        {element.radio?
                            <MDBInputGroup className='mb-2'>
                                <MDBBtn disabled color='secondary' className='numQuestao py-0 px-3'><MDBRadio defaultChecked={true} className='m-0 p-0' name='radioNoLabel' value='' inline disabled/></MDBBtn>
                                <input className='form-control' type='text' value={element.radio} disabled/>
                            </MDBInputGroup>:
                            <>Não respondeu</>}
                    </div>
                )
            case 2:
                return(
                    <div className='my-1'>
                        {element.texto?
                            <MDBTextArea rows={4} label='Resposta' value={element.texto} readOnly className='mb-2'/>:
                            <div>Não respondeu</div>}
                        
                    </div>
                )
            case 3:
                if(element.opcoes.length){
                    return element.opcoes?.map((item,index)=>{
                        return(
                            <MDBInputGroup key={element.id+index} className='mb-2'>
                                <MDBBtn disabled color='secondary' className='numQuestao py-0 px-3'><MDBCheckbox defaultChecked={true} className='m-0 p-0' name='radioNoLabel' value='' inline disabled/></MDBBtn>
                                <input className='form-control' type='text' value={item} disabled/>
                            </MDBInputGroup>
                        )
                    })
                }
                else{
                    return (<>Não respondeu</>)
                }
                
            default:
                break;
        }
    }

    const secaoRespostas = <main className='mt-3 principal'> 
        {Title("Nome")}
        <MDBListGroup small className='mt-3' >
            {renderizaRepostas()}
        </MDBListGroup>
    </main>
    // Secao Respostas

    
    function ShowSidebar(id){
        var v = document.getElementById(id);
        if (appearing) {
            v.classList.remove("d-block")
            setAppearing(false)
        }else{
            v.classList.add("d-block")
            setAppearing(true)
        }
    }  

    return(
        <section>
            {Sidebar(setMain,'respostaDerivados')}
            {Navbar(ShowSidebar)}

            {UserSection(main,secaoRespostas)}
        </section>
    )
}