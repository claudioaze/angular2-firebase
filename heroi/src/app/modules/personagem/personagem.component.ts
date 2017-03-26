import { Personagem } from './personagem.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { PersonagemService } from './personagem.service';

@Component({
  selector: 'app-personagem',
  templateUrl: './personagem.component.html',
  providers: []
})
export class PersonagemComponent implements OnInit {

  private mensagem: String;

  form: FormGroup;

  personagens: Personagem[];

  constructor(private formBuilder: FormBuilder,
    private service: PersonagemService) {

  }

  ngOnInit() {
    this.form = this.createForm();
    this.reload();
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      codigo: [],
      nome: ['', Validators.required],
      companhia: ['', Validators.required],
      habilidades: this.formBuilder.array([
        this.initHabilidade()
      ])
    });
  }

  initHabilidade() {
    return this.formBuilder.group({
      habilidade: ['', Validators.required]
    });
  }

  private reload() {
    this.service.getPersonagens().then(lista => { this.personagens = lista; });
  }

  addHabilidade() {
    const control = <FormArray>this.form.controls['habilidades'];
    control.push(this.initHabilidade());
  }

  deleteHabilidade(position: number) {
    const control = <FormArray>this.form.controls['habilidades'];
    control.removeAt(position);
  }

  editar(personagem: Personagem) {

    this.form.patchValue(personagem);

    //deletar todas as habilidades (form control) do form
    this.form.get('habilidades').value.forEach((element: any) => {
      this.deleteHabilidade(element);
    });

    //adicionar/criar novo form control para cada habilidade e add no form
    if (personagem.habilidades) {
      personagem.habilidades.forEach(obj => {
        let formGroupHabilidades: FormGroup = this.initHabilidade();
        formGroupHabilidades.patchValue(obj);

        let formArray = <FormArray>this.form.get('habilidades');
        formArray.push(formGroupHabilidades);
      });
    }
  }

  deletar(codigoPersonagem: any) {
    this.service.deletePersonagem(codigoPersonagem)
      .then(result => {
        this.reload();
      });

  }

  salvar() {
    if (this.form.get('codigo').value) {
      this.service.patchPersonagem(this.form.value)
        .then(result => {
          this.reload()
          this.mensagem = "Alterou!!!!";
        }).catch(error => {
          this.mensagem = "Problema ao alterar: " + error
        })
    }
    else {
      this.service.postPersonagem(this.form.value)
        .then(result => {
          this.reload()
          this.mensagem = "Salvou!!!!";
        }).catch(error => {
          this.mensagem = "Problema ao salvar: " + error
        })
    }
  }



}
