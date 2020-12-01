import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PacienteProvider} from '../../../provider/paciente';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {

  form: FormGroup;
  constructor(private provider: PacienteProvider, private formBuilder: FormBuilder, public toastController: ToastController, private router: Router) {
    this.createForm();
  }

  get nome() {
    return this.form.get('nome');
  }

  get grp_sangue() {
    return this.form.get('grp_sangue');
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

  public errorMessages = {
    nome: [
      { type: 'required', message: 'Por favor, informe o nome!' }
    ],
    grp_sangue: [
      { type: 'required', message: 'Por favor, selecione o grupo sanguíneo!' }
    ],
    logradouro: [
      { type: 'required', message: 'Por favor, informe o logradouro!' }
    ],
    numero: [
      { type: 'required', message: 'Por favor, informe o número!' },
      { type: 'pattern', message: 'Por favor, informe o número corretamente!' }
    ],
    cidade: [
      { type: 'required', message: 'Por favor, informe a cidade!' }
    ],
    uf: [
      { type: 'required', message: 'Por favor, selecione o estado!' }
    ],
    celular: [
      { type: 'required', message: 'Por favor, informe o número do celular!' },
      { type: 'pattern', message: 'Por favor, informe do celular número corretamente!' }
    ],
    fixo: [
      { type: 'required', message: 'Por favor, informe o número do fixo!' },
      { type: 'pattern', message: 'Por favor, informe o número do fixo corretamente!' }
    ],
  };

  ngOnInit() {
  }
  createForm() {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      grp_sangue: [null, Validators.required],
      logradouro: [null, Validators.required],
      numero: [null, [ Validators.required, Validators.pattern('^[0-9]{1,5}') ]],
      cidade: [null, Validators.required],
      uf: [null, Validators.required],
      celular: [null, [ Validators.required, Validators.pattern('^\\([0-9]{2}\\)[\\s][0-9]{4,5}-[0-9]{4}') ]],
      fixo: [null, [ Validators.required, Validators.pattern('^^\\([0-9]{2}\\)[\\s][0-9]{4}-[0-9]{4}') ]]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
          .then(() => {
            this.mensagem('Paciente salvo!');
            this.router.navigateByUrl('/paciente');
          })
          .catch((e) => {
            this.mensagem('Erro ao salvar o paciente.');
            console.error(e);
          });
    }
  }
  async mensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 3000
    });
    toast.present();
  }

}
