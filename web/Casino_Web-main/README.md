<div align="center">
<h3><a href="https://nicolasborghese.github.io/Casino_Web/">Link a Casino Web</a></h3>

<div>
    <picture>
        <a href="https://nicolasborghese.github.io/Casino_Web/">
            <img src="imagenes/imgGeneral/logoCasinoWebReadmeV3.gif"/>
        </a>
    </picture>
</div>

<br><br>© 2023 Nicolás Borghese
    
</div>

---

<h3>Resumen</h3>

Trabajo final para la materia Programación Estática y Laboratorio Web de la Tecnicatura Universitaria en Desarrollo Web de la Universidad Nacional del Comahue.<br>

Este proyecto simula la página web de un casino online utilizando únicamente HTML, CSS y JavaScript como tecnologías para desarrollo web.<br>

- Cuenta con un sistema de creación de cuentas y login para el sitio
- Cuenta con una sección (Perfil) que permite editar algunos datos de la cuenta
- Cuenta con un sistema sencillo de carga y retiro de dinero (Cargar/Retirar)
- Cuenta con un juego de tragamonedas funcional (hay que cargar saldo ficticio previamente para que funcione)
- Utiliza local storage para simular una base de datos

Para acceder al sitio sin necesidad de crear una cuenta nueva:<br>

<div align="center">
    <b>Usuario: admin</b><br>
    <b>Contraseña: admin</b>
</div>

---

### Desarrollado con

- [![HTML][html-shield]][html-url]
- [![CSS][css-shield]][css-url]
- [![JavaScript][javascript-shield]][javascript-url]
- [![Aseprite][aseprite-shield]][aseprite-url]

---

### Descripción

El proyecto cuenta con un login y una sección para crearse una cuenta. Una vez logueado, el usuario accede a un menú que permite elegir entre 3 juegos , un tragamonedas, una ruleta y un Black Jack <b>*(actualmente solo se encuentra finalizado el tragamonedas)*</b> . También cuenta con una barra de navegación que permite dirigirse a distintas secciones y una pequeña sección que muestra el nombre de usuario logueado y el saldo.

---

### Secciones de la página:

1. Login (index.html)<br>
La primer página consistirá principalmente en un login con la opción de dirigirnos a otro sitio para 
crear una cuenta si no contamos con una.

2. Formulario para creación de cuenta (crearCuenta.html)<br>
Esta página consta de un formulario para crear una cuenta.

3. Juegos (juegos.html)<br>
Esta página corresponde a un menú principal que ya muestra un cabezal que nos permite movernos 
a diferentes secciones y muestra los juegos que se pueden jugar. Las secciones del cabezal van a 
ser: Juegos, Perfil, Cargar/ Retirar, Reglas, Opciones

4. Perfil de usuario (perfil.html)<br>
Esta página muestra la información que tiene cargada de perfil el usuario y además permite cambiar algunos datos

5. Cargar/Retirar (cargar.html)<br>
Esta página simula que el usuario ingresa dinero a su cuenta para que este aparezca reflejado luego 
al momento de jugar, o le permite retirar el que ya tiene.
El dinero actual de la cuenta se verá reflejado en el saldo del usuario en la parte superior derecha, el cual irá variando a medida que se va jugando según los resultados de los juegos.

6. Reglas (reglas.html)<br>
Muestra las reglas de los 3 juegos.

7. Opciones (opciones.html)<br>
Permitirá al usuario hacer algunas modificaciones a la página a su gusto.

8. Tragamonedas (juegoTragamonedas.html)<br>
Corresponde al juego del tragamonedas. <b>*(COMPLETO)*</b>

9. Ruleta (juegoRuleta.html)<br>
Corresponde al juego de la ruleta (en desarrollo)

10. Black Jack (juegoBlackJack.html)<br>
Corresponde al juego de Black Jack (en desarrollo)

Las funcionalidades del tragamonedas se encuentran 100% desarrolladas con Javascript.<br>
Todos los diseños de animaciones e imágenes se encuentran 100% desarrollados con Aseprite.

##

<div align="center">

<!--[![Nicolás Borghese][linkedin-shield]][linkedin-url]-->

</div>

<!-- MARKDOWN LINKS AND IMAGES -->

[html-shield]: https://img.shields.io/badge/HTML-%23E34F26?style=for-the-badge&logo=HTML5&logoColor=white
[html-url]: https://developer.mozilla.org/es/docs/Web/HTML

[css-shield]: https://img.shields.io/badge/CSS-%231572B6?style=for-the-badge&logo=CSS3&logoColor=white
[css-url]: https://developer.mozilla.org/es/docs/Web/CSS

[javascript-shield]: https://img.shields.io/badge/JavaScript-%23000000?style=for-the-badge&logo=Javascript&logoColor=%23F7DF1E
[javascript-url]: https://developer.mozilla.org/es/docs/Web/JavaScript

[aseprite-shield]: https://img.shields.io/badge/Aseprite-white?style=for-the-badge&logo=Aseprite
[aseprite-url]: https://www.aseprite.org/

[linkedin-shield]: https://img.shields.io/badge/Nicol%C3%A1s%20Borghese-%230A66C2?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/nicolas-borghese/
