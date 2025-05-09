import { Estado } from '@prisma/client';

export interface IFilterComerciantes {
  nombre?: string;
  fechaRegistro?: string;
  estado?: Estado;
  page?: number;
  perPage?: number;
}

export interface IComerciante {
  id: number;
  nombre: string;
  municipio: string;
  telefono?: string;
  correoElectronico?: string;
  estado: Estado;
  fechaRegistro: Date;
}

export interface IComerciantePaginated {
  data: IComerciante[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}
