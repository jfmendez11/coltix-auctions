import { Meteor } from "meteor/meteor";
import "../imports/api/events";

/*aecheverrir: aqui abajo se agrega la implementacion para agregar el atributo de lenguaje ( ingles ) al tag <html> del proyecto, con
 tal de satisfacer requerimientos de accesibilidad*/
import { WebApp } from 'meteor/webapp';
WebApp.addHtmlAttributeHook(() => ({ lang: 'es' }));

Meteor.startup(() => {
  // code to run on server at startup
});
