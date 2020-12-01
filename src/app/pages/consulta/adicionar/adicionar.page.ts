import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PacienteProvider} from '../../../provider/paciente';
import {MedicoProvider} from '../../../provider/medico';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConsultaProvider} from '../../../provider/consulta';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {

  medicos: Observable<any>;
  pacientes: Observable<any>;
  form: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private provider: ConsultaProvider, private pacProvider: PacienteProvider, private medProvider: MedicoProvider, private formBuilder: FormBuilder, public toastController: ToastController, private router: Router) {
    this.createForm();
    this.medicos = this.medProvider.getAll();
    this.pacientes = this.pacProvider.getAll();
  }

  get key_medico() {
    return this.form.get('key_medico');
  }
  get key_paciente() {
    return this.form.get('key_paciente');
  }
  get data() {
    return this.form.get('data');
  }
  get hora_inicio() {
    return this.form.get('hora_inicio');
  }
  get hora_fim() {
    return this.form.get('hora_fim');
  }
  get observacoes() {
    return this.form.get('observacoes');
  }

  public  errorMensagens = {
    key_medico: [{ type: 'required', message: 'Por favor, selecione o médico!' }],
    key_paciente: [{ type: 'required', message: 'Por favor, selecione o paciente!' }],
    data: [{ type: 'required', message: 'Por favor, informe a data!' }],
    hora_inicio: [{ type: 'required', message: 'Por favor, informe a hora de início!' }],
    hora_fim: [{ type: 'required', message: 'Por favor, informe a hora de fim!' }],
  };

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      key_medico: [null, Validators.required],
      key_paciente: [null, Validators.required],
      data: [null, Validators.required],
      hora_inicio: [null, Validators.required],
      hora_fim: [null, Validators.required],
      observacoes: [null]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
          .then(() => {
            this.mensagem('Consulta adicionada!');
            this.router.navigateByUrl('/consulta');
          })
          .catch((e) => {
            this.mensagem('Erro ao adicionar a consulta');
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
