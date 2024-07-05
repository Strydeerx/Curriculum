import { NumericValueAccessor } from "@ionic/angular";

export interface ICargo{
    idcargo: number;
    puesto: string;
    empresa: string;
    ciudad: string;
    alcaldia: string;
    fechainicial: Date;
    fechafinal: Date;
    empleoactual: boolean;
    //logo: Blob;
}