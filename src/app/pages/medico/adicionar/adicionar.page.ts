import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MedicoProvider} from '../../../provider/medico';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {

  form: FormGroup;
  constructor(private provider: MedicoProvider, private formBuilder: FormBuilder, public toastController: ToastController, private router: Router) {
    this.createForm();
  }

  get nome() {
    return this.form.get('nome');
  }
  get crm() {
    return this.form.get('crm');
  }
  get logradouro() {
    return this.form.get('logradouro');
  }
  get numero() {
    return this.form.get('numero');
  }
  get cidade() {
    return this.form.get('cidade');
  }
  get uf() {
    return this.form.get('uf');
  }
  get celular() {
    return this.form.get('celular');
  }
  get fixo() {
    return this.form.get('fixo');
  }

  public errorMensagens = {
    nome: [ { type: 'required', message: 'Por favor, informe o nome do médico.' } ],
    crm: [
        { type: 'required', message: 'Por favor, informe o CRM do médico.' },
        { type: 'pattern', message: 'Por favor, informe um CRM válido.'}
      ],
    logradouro: [ { type: 'required', message: 'Por favor, informe o logradouro do médico.' } ],
    numero: [
      { type: 'required', message: 'Por favor, informe o número do logradouro do médico.' },
      { type: 'pattern', message: 'Por favor, informe um número válido.'}
    ],
    cidade: [ { type: 'required', message: 'Por favor, informe a cidade do médico.' } ],
    uf: [ { type: 'required', message: 'Por favor, informe o estado do médico.' } ],
    celular: [
      { type: 'required', message: 'Por favor, informe o telefone celular do médico.' },
      { type: 'pattern', message: 'Por favor, informe um celular válido.'}
    ],
    fixo: [
      { type: 'required', message: 'Por favor, informe o telefone fixo do médico.' },
      { type: 'pattern', message: 'Por favor, informe um fixo válido.'}
    ],
  };

  ngOnInit() {
  }
  createForm() {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      crm: [null, [ Validators.required, Validators.pattern('^[0-9]{1,5}') ] ],
      logradouro: [null, Validators.required],
      numero: [null, [ Validators.required, Validators.pattern('^[0-9]{1,10}') ] ],
      cidade: [null, Validators.required],
      uf: [null, Validators.required],
      celular: [null, [ Validators.required, Validators.pattern('^\\([0-9]{2}\\)[\\s][0-9]{4,5}-[0-9]{4}') ] ],
      fixo: [null, [ Validators.required, Validators.pattern('^\\([0-9]{2}\\)[\\s][0-9]{4}-[0-9]{4}') ] ]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
          .then(() => {
            this.mensagem('Médico adicionado!');
            this.router.navigateByUrl('/medico');
          })
          .catch((e) => {
            this.mensagem('Erro ao adicionar o médico');
            console.log(e);
          });
    }
  }

  async mensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 4000
    });
    toast.present();
  }
}
