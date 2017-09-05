<img src="doc-images/style.jpg?raw=" width="1024">


_Credits: [Illustration](https://dribbble.com/shots/3432688-CSS-Peeper-illustration-set) by [@lawniczak](https://dribbble.com/lawniczak)_

# **Styles**
***

En la siguiente documentación encontraremos todo el material necesario para poder entender y trabajar con la guia de estilos de Mango.

El principal objetivo de esta guía es transmitir y mantener actualizada la información relativa a mixins, funciones... que nos permiten trabajar en un entorno común e igual para todos.


### **Tabla de contenidos**

Lib

Variables

Components


## **Lib**
***

Lib es el nombre que hemos dado a la carpeta donde podemos encontrar todos los mixins o funciones que se encargan de tareas básicas de estilos pero que no tienen una conexión directa con la guía de estilos.
En ella podemos encontrar, por ejemplo:

```
// Hace invisible el texto de un elemento
@include mng-hide-text()
```
```
// Nos permite estilar el placeholder de un elemento
@include mng-placeholder();
```


## **Variables**
***

Dentro de la carpeta variables encontraremos una serie de ficeheros .scss que solo contienen variables.
Se han agrupado las variables de sass en función del tipo, de esta manera, tenemos, por ejemplo, los colores en un solo fichero,
los tamaños de fuente en otro, las librerías en otro (susy, bourbon...).


## **Componentes**
***

Esta carpeta es la traducción de la **guia de estilos** a **mixins** de sass. En ella hay cada uno de los componentes que estan representados dentro de la guía de estilos, definida por diseño, y que se han convertido a código css.
