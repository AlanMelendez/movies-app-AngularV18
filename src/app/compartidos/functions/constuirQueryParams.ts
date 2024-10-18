import { HttpParams } from "@angular/common/http";


export function construirQueryParams(obj:any): HttpParams {
    let queryParams = new HttpParams();

    for (const propiedadObj in obj) {
        if (obj.hasOwnProperty(propiedadObj)) {
            queryParams = queryParams.set(propiedadObj, obj[propiedadObj]);
        }
    }

    return queryParams;
}
