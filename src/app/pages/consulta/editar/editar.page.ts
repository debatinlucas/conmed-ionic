import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ConsultaProvider} from '../../../provider/consulta';
import {PacienteProvider} from '../../../provider/paciente';
import {MedicoProvider} from '../../../provider/medico';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  key: string;
  medicos: Observable<any>;
  pacientes: Observable<any>;
  form: FormGroup;
  consulta: any;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private provider: ConsultaProvider, private pacProvider: PacienteProvider, private medProvider: MedicoProvider, private formBuilder: FormBuilder, public toastController: ToastController, private router: Router) {
    this.key = this.activatedRoute.snapshot.paramMap.get('key');
    this.medicos = this.medProvider.getAll();
    this.pacientes = this.pacProvider.getAll();
    this.consulta = {};
    this.createForm();
    const subscribe = this.provider.get(this.key).subscribe((c: any) => {
      subscribe.unsubscribe();
      this.consulta = c;
      this.createForm();
    });
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
      key: [this.consulta.key],
      key_medico: [this.consulta.key_medico, Validators.required],
      key_paciente: [this.consulta.key_paciente, Validators.required],
      data: [this.consulta.data, Validators.required],
      hora_inicio: [this.consulta.hora_inicio, Validators.required],
      hora_fim: [this.consulta.hora_fim, Validators.required],
      observacoes: [this.consulta.observacoes]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
          .then(() => {
            this.mensagem('Consulta editada!');
            this.router.navigateByUrl('/consulta');
          })
          .catch((e) => {
            this.mensagem('Erro ao editar a consulta');
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
