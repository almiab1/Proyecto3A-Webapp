export interface Ruta {
    nombreRuta: string;
    tipoRuta: string;
    ruta: Posicion[];
    idUsuario?: string;
}

export interface RutasPreviamenteCreadas {
    nombreRuta: string;
    puntoInicial: Posicion;
    wayPoints: Location[];
    puntoFinal: Posicion;
}

export interface RutasRealizadas {
    nombreRuta: string;
    ruta: Posicion[];
}

export interface Posicion {
    lat: number;
    lng: number;
}

export interface Location {
    location: Posicion;
}

export interface RutaAEnviar {
    nombreRuta: string;
    tipoRuta: string;
    ruta: string;
    idUsuario?: string;
}