import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PacienteProvider} from '../../../provider/paciente';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  key: string;
  form: FormGroup;
  paciente: any;

  constructor(private activatedRoute: ActivatedRoute, private provider: PacienteProvider,
              private formBuilder: FormBuilder, public toastController: ToastController, private router: Router) {
    this.paciente = { };
    this.createForm();
    this.key = this.activatedRoute.snapshot.paramMap.get('key');
    const subscribe = this.provider.get(this.key).subscribe((p: any) => {
          subscribe.unsubscribe();
          this.paciente = p;
          this.createForm();
     });
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
      key: [this.paciente.key],
      nome: [this.paciente.nome, Validators.required],
      grp_sangue: [this.paciente.grp_sangue, Validators.required],
      logradouro: [this.paciente.logradouro, Validators.required],
      numero: [this.paciente.numero, [ Validators.required, Validators.pattern('^[0-9]{1,5}') ]],
      cidade: [this.paciente.cidade, Validators.required],
      uf: [this.paciente.uf, Validators.required],
      celular: [this.paciente.celular, [ Validators.required, Validators.pattern('^\\([0-9]{2}\\)[\\s][0-9]{4,5}-[0-9]{4}') ]],
      fixo: [this.paciente.fixo, [ Validators.required, Validators.pattern('^^\\([0-9]{2}\\)[\\s][0-9]{4}-[0-9]{4}') ]]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
          .then(() => {
            this.mensagem('Paciente editado!');
            this.router.navigateByUrl('/paciente');
          })
          .catch((e) => {
            this.mensagem('Erro ao editar o paciente.');
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
