import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable()
export class PacienteProvider {
    private PATH = 'paciente/';
    constructor(private db: AngularFireDatabase) {
    }
    getAll() {
        return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(m => ({key: m.payload.key, ...m.payload.val()}));
                })
            );
    }
    get(key: string) {
        return this.db.object(this.PATH + key).snapshotChanges()
        .pipe(
            map (m => {
                return {key: m.key, ...m.payload.val()};
            })
        );
    }
    save(paciente: any) {
        return new Promise((resolve, reject) => {
            if (paciente.key) {
                this.db.list(this.PATH)
                    .update(paciente.key, {nome: paciente.nome, grp_sangue: paciente.grp_sangue, logradouro: paciente.logradouro,
                        numero: paciente.numero, cidade: paciente.cidade, uf: paciente.uf, celular: paciente.celular, fixo: paciente.fixo})
                    .then(() => resolve()).catch((e) => reject(e));
            } else {
                this.db.list(this.PATH)
                    .push({nome: paciente.nome, grp_sangue: paciente.grp_sangue, logradouro: paciente.logradouro, numero: paciente.numero,
                        cidade: paciente.cidade, uf: paciente.uf, celular: paciente.celular, fixo: paciente.fixo})
                    .then(() => resolve()).catch((e) => reject(e));
            }
        });
    }
    remove(key: string) {
        return this.db.list(this.PATH).remove(key);
    }
}
