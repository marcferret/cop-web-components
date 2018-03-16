# **New Mango Front End**
***

Esta guía pretende ser el inicio del cambio iniciado en 2017 por parte del equipo de Ebusiness para desarrollar una nueva y mejor plataforma para la shop online de Mango.

El principal objetivo de esta guía es tener toda la documentación de cada una de las partes que conforman el entorno de desarrollo de Front End, tanto de los estilos (incluyendo la deseada guía de estilos), hasta cada uno de los módulos que forman un componente de ReactJS.

Una de las tareas, es **mantener esta documentación totalmente actualizada**, ya que en caso contrario no nos va a resultar útil, tanto a la gente que ya forma parte del equipo como a proveedores externos que puedan colaborar o bien para nuevas incorporaciones.

Para la realización de esta guía nos hemos basado en dos artículos principalmente. Uno es "**Grab Front end Guide**" (https://github.com/grab/front-end-guide), y el segundo es la guia de estilos y buenas prácticas de **Airbnb** (https://github.com/airbnb).


### **Tabla de contenidos**

[User Interface](#user-interface--react)

[SASS](#sass)


  

## **<a name="user-interface--react"></a>User Interface - React**
***

La renderización por parte de cliente se llevará a cabo con **ReactJS**. Se ha optado por ReactJS, por el hecho de que nos permite llegar al objetivo final que es tener una SPA (Single Page Application), pero nos permite hacerlo de manera gradual y prescindiendo de ello si en alguna Ã¡rea no queremos que así sea.

La decisión de usar ReactJS fue porque vimos que podámos ir migrando poco a poco componentes ya existentes, sin la necesidad de tener que hacer un desarrollo completo para poder salir a producción. A parte de esto, tambien vimos que ReactJS tení­a una gran empresa detrás que lo mantiene, a parte de una gran comunidad de desarrolladores. AsÃ­ como también muchos eventos y charlas.


## **<a name="sass"></a>SASS**
***

Los estilos siempre es algo complicado, ya que a diferencia de JavaScript la organización siempre es un poco más caótica. Para ello hemos definido una guía de estilos dónde tenemos entramos más en detalle en cada una de las partes.

[Guía de estilos](style/)
