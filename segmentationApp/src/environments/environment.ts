// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  segmentApi: 'http://localhost:3200/',
  helpGuidance: 'Este programa permite hacer una simulación de dos segmentos: El segmento 0 correspondiente al código y heap y'+
  ' el segmento 1 correspondiente al stack, el cual crece de forma inversa al segmento 0 (de abajo hacia arriba). '
  +'Tiene dos opciones de uso. El primero es dejar que el programa envíe parámetros por defecto o ingresar los propios valores al programa.'+
  'Los valores por defecto son: Espacio de direccionamiento lógico: 1k. Tamaño de memoria física: 16k \n Número de direcciones virtuales a generar: 5. '+
  'Para los valores límites y base del segmento 0 y 1 se generan aleatoriamente. Para cambiar los números aleatorios basta con darle un número diferente al '+
  'campo "Cambiar valores aleatorios". '
  +'Para ingresar el tamaño tanto de la dirección física como de la virtual deberá especificar sus unidades. Ejemplo: para 1 kilobyte digitar 1k,'+
                'para 1 Megabyte digitar 1M y para 1 Gigabyte digitar 1G. Para digitar las direcciones, cada una debe ir seguida de una ",".'+
                'Ejemplo: 23, 30, 50.'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
