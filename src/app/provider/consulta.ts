import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable()
export class ConsultaProvider {
    private PATH = 'consulta/';
    constructor(private db: AngularFireDatabase) {
    }
    getAll() {
        return this.db.list(this.PATH, ref => ref.orderByChild('data'))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
                })
            );
    }
    get(key: string) {
        return this.db.object(this.PATH + key).snapshotChanges()
        .pipe(
            map (c => {
                return {key: c.key, ...c.payload.val()};
            })
        );
    }
    save(consulta: any) {
        return new Promise((resolve, reject) => {
            if (consulta.key) {
                this.db.list(this.PATH)
                    // tslint:disable-next-line:max-line-length
                    .update(consulta.key, {key_paciente: consulta.key_paciente, key_medico: consulta.key_medico, data: consulta.data, hora_inicio: consulta.hora_inicio, hora_fim: consulta.hora_fim, observacoes: consulta.observacoes})
                    .then(() => resolve()).catch((e) => reject(e));
            } else {
                this.db.list(this.PATH)
                    // tslint:disable-next-line:max-line-length
                    .push({key_paciente: consulta.key_paciente, key_medico: consulta.key_medico, data: consulta.data, hora_inicio: consulta.hora_inicio, hora_fim: consulta.hora_fim, observacoes: consulta.observacoes})
                    .then(() => resolve()).catch((e) => reject(e));
            }
        });
    }
    remove(key: string) {
        return this.db.list(this.PATH).remove(key);
    }
}
