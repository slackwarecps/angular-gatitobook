import { AbstractControl, ControlContainer } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { first,map,switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) { }


  usuarioJaexiste(){
    return (control :AbstractControl)=>{
      return control.valueChanges.pipe(
        switchMap((nomeUsuario)=>
          this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario) 
        ),
        map((usuarioExiste)=>
          usuarioExiste? {usuarioExistente:true}:null
        ),
        first()
      );
    };
  }
}
