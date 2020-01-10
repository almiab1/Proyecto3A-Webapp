export interface Rutas {
    nombreRuta: string;
    tipoRuta: string;
    ruta: [];
    idUsuario?: string;
}

export interface RutasPreviamenteCreadas {
    nombreRuta: string;
    puntoInicial: Posicion;
    wayPoints: Posicion[];
    puntoFinal: Position;
}

export interface RutasRealizadas {
    nombreRuta: string;
    path: Posicion[];
}

export interface Posicion {
    lat: number;
    lng: number;
}