// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  segmentApi: 'http://localhost:3200/',
  helpGuidance: 'Debes ingresar cada dígito con su correspondiente unidad. Ejemplo: para 1 kilobyte digitar 1k,'+
                'para 1 Megabyte digitar 1M y para 1 Gigabyte digitar 1G. Para digitar las direcciones, cada una debe ir seguida de una ",".'+
                'Ejemplo: 23K, 30K, 50K. Para el límite hay dos opciones: límite del segmento 0 y límite del segmento 1.'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
