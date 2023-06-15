import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoDependente from "./cadastroEnderecoDependente";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um cliente')
        let nome = this.entrada.receberTexto('Digite o nome completo do dependente que você deseja incluir.')
        let nomeSocial = this.entrada.receberTexto('Digite agora o nome social.')
        let dataNascimento = this.entrada.receberData('Digite a data de nascimento.')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        this.processo = new CadastroEnderecoDependente(cliente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        let armazem = Armazem.InstanciaUnica.Clientes
        let numeroDocumentoTitular = this.entrada.receberTexto('Para finalizar, por gentileza, digite  o número de documento do seu titular: ')
        armazem.map(item => {
            if(item.Documentos[0].Numero == numeroDocumentoTitular){
                item.Dependentes.push(cliente)
            }
        }) 
        console.log('Cadastro do cliente finalizado!')
    }
}