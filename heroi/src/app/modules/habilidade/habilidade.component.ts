import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabilidadeService } from './habilidade.service'

import { Habilidade } from './habilidade.model';

@Component({
  selector: 'app-habilidade',
  templateUrl: './habilidade.component.html',
  providers: [HabilidadeService]
})
export class HabilidadeComponent implements OnInit {

  form: FormGroup;

  habilidades: Habilidade[];

  constructor(private formBuilder: FormBuilder,
    private service: HabilidadeService) {

  }

  ngOnInit() {
    this.form = this.createForm();
    this.reload();
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      codigo: [],
      habilidade: ['', Validators.required]
    });
  }

  initHabilidade() {
    return this.formBuilder.group({
      habilidade: ['', Validators.required]
    });
  }

  private reload() {
    this.service.getHabilidades().then(lista => { this.habilidades = lista; });
  }

  // salvar(cliente:any) {
  //   if (cliente.codigo) {
  //     this.service.pathCliente(cliente)
  //       .then(result => {
  //         this.reload()
  //         this.mensagem = "Alterou!!!!";
  //       }).catch(error => {
  //         this.mensagem = "Problema ao alterar: " + error
  //       })
  //   }
  //   else {
  //     this.service.postCliente(cliente)
  //       .then(result => {
  //         this.reload()
  //         this.mensagem = "Salvou!!!!";
  //       }).catch(error => {
  //         this.mensagem = "Problema ao salvar: " + error
  //       })
  //   }
  // }

  // deletaCliente(cliente:any) {
  //   this.service.deleteCliente(cliente.codigo)
  //     .then(() => {
  //       this.reload()
  //       this.mensagem = "Deletado com Sucesso!!!"
  //     })
  // }

  // selecionaCliente(cliente:any) {
  //   this.cliente = Object.assign({}, cliente);
  // }

}
