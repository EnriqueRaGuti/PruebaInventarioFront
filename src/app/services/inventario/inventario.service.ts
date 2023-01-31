import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  httpHeaders = new HttpHeaders({ "Content-type": "application/json"});  

    constructor(private http: HttpClient) { }

    cargarMedicamentos() {
      return this.http.get("http://localhost:8080/api/v1/medicamentos", { headers: this.httpHeaders }).toPromise();
    }

    guardarMedicamento(body:any) {
      return this.http.post("http://localhost:8080/api/v1/save", body, { headers: this.httpHeaders }).toPromise();
    }

    borrarMedicamento(id:any) {
        return this.http.delete("http://localhost:8080/api/v1/delete/" + id , { headers: this.httpHeaders }).toPromise();
    }

    actulizarMedicamento(id:any, body:any) {
        return this.http.put("http://localhost:8080/api/v1/update/" + id ,body, { headers: this.httpHeaders }).toPromise();
    }
}
