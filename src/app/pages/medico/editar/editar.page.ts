import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MedicoProvider} from '../../../provider/medico';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  key: string;
  form: FormGroup;
  medico: any;
  constructor(private activatedRoute: ActivatedRoute, private provider: MedicoProvider,
              private formBuilder: FormBuilder, public toastController: ToastController, private router: Router) {
    this.medico = { };
    this.createForm();
    this.key = this.activatedRoute.snapshot.paramMap.get('key');
    const subscribe = this.provider.get(this.key).subscribe((m: any) => {
      subscribe.unsubscribe();
      this.medico = m;
      this.createForm();
    });
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
      key: [ this.medico.key ],
      nome: [this.medico.nome, Validators.required],
      crm: [this.medico.crm, [ Validators.required, Validators.pattern('^[0-9]{1,5}') ] ],
      logradouro: [this.medico.logradouro, Validators.required],
      numero: [this.medico.numero, [ Validators.required, Validators.pattern('^[0-9]{1,10}') ] ],
      cidade: [this.medico.cidade, Validators.required],
      uf: [this.medico.uf, Validators.required],
      celular: [this.medico.celular, [ Validators.required, Validators.pattern('^\\([0-9]{2}\\)[\\s][0-9]{4,5}-[0-9]{4}') ] ],
      fixo: [this.medico.fixo, [ Validators.required, Validators.pattern('^\\([0-9]{2}\\)[\\s][0-9]{4}-[0-9]{4}') ] ]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
          .then(() => {
            this.mensagem('Médico editado!');
            this.router.navigateByUrl('/medico');
          })
          .catch((e) => {
            this.mensagem('Erro ao editar o médico');
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
