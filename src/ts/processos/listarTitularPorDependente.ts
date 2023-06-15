import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorCliente from "../impressores/impressorCliente";

import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class listarTitularPorDependente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('Buscar cliente a partir de seu dependente.')
        this.numero = this.entrada.receberNumero('Digite o número do documento do dependente: ')

        this.clientes.map(client => {
            if(this.titular(client)) {
                client.Dependentes.map(dep => {
                    dep.Documentos.map(doc => {
                        if(parseInt(doc.Numero) == this.numero) {
                            let index = this.clientes.indexOf(client)
                            console.log('O titular desse dependente é: ')
                            this.impressor = new ImpressorCliente(this.clientes[index])
                            console.log(this.impressor.imprimir())
                        }
                    })
                })
            } else {
                console.log("Esse titular não está cadastrado!")
            }
            })
    }
    private titular(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular == undefined) {
            verificacao = true
        }
        return verificacao
    }
}
