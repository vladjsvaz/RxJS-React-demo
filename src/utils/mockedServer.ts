import { Observable, of } from "rxjs";

export interface Packer {
    id: number;
    name: string;
}

const packers: Packer[] = [
    { id: 1, name: 'Claudio Rodrigues' },
    { id: 2, name: 'Eduardo Conde' },
    { id: 3, name: 'Gonçalo Queimado' },
    { id: 4, name: 'Nuno Gago' },
    { id: 5, name: 'Luis Ferreirinha' },
    { id: 6, name: 'Ines Alves' },
    { id: 7, name: 'Joao Faria' },
    { id: 8, name: 'Joao Oliveira' },
    { id: 9, name: 'Pedro Martins' },
    { id: 10, name: 'Vladimiro Vaz' },
    { id: 11, name: 'Jose Correia' }
];

export const mockedServer = (request: string): Observable<Packer[]> => {

    if (request.trim() === '') {
        return of([]);
    }

    const response = packers.filter(v => v.name.toLowerCase().includes(request.toLowerCase()));
    return of(response);
};