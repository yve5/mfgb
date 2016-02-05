# MF Gulp Boilerplate
---

Gulp personal work

## Installation

### NodeJS Environment

<pre>
npm install
</pre>

### Bower components

<pre>
bower install
</pre>

## Commands


| Command     | Meaning | Qty   |
| ------- | ----: | :---: |
| **gulp** or **gulp serve** | $1600 |  5    |
| Phone    | $12   |  12   |
| Pipe     | $1    |  234  |

- **gulp** or **gulp serve** : 

## Documentation

Read the [documentation website](https://yve5.github.io/lipstickcss) for further information.

## License

LipstickCSS is released under the [MIT License](http://opensource.org/licenses/MIT).



# Draft

# Pré-requis

## Installation de l'environnement

### Instructions à ne faire qu'une fois sur votre machine

  a) installer nodeJS (npm vient direct avec nodeJS)

  b) npm install -g gulp bower rimraf

### Après téléchargement du projet depuis Git

  a) ouvrir un terminal à la racine du projet

  b) npm install

  c) bower install

## Suppression du répertoire **node_modules**

Sous Windows, la suppression du répertoire **node_modules** peut être difficile.

La première solution est de supprimer le répertoire via Filezilla.

La deuxième consiste à lancer la commande : rimraf node_modules

**La commande rimraf est à utiliser avec PRECAUTION. Théoriquement, elle est capable de supprimer tous les fichiers du poste.**

# Gulp

Gulp est un outil de compilation dans l'environnement NodeJS.
Il configuré dans le fichier **gulpfile.js**.
Dans le cadre de cette démonstration, plusieurs commandes ont été implémentées.

Les commandes principales sont celles préconisées pour le développement :
 - **gulp** ou **gulp serve** : Lancement du serveur en développement
 - **gulp build** : Optimisation du projet dans le répertoire *dist*
 - **serve:dist** : Optimisation du projet dans le répertoire *dist* et lancement du serveur avec la version optimisée

Les commandes secondaires sont exécutées par les commandes principales et non vocation à être utilisés individuellement :
- **gulp styles** : Génération des feuilles de styles
- **gulp html** : Optimisation des pages HTML à la racine du projet
- **gulp views** : Optimisation des pages HTML dans le répertoire *views*
- **gulp images** : Déplacement des images vers le répertoire *dist*

L'exécution de la commande **gulp** lance automatiquement le serveur dans le navigateur Web par défaut depuis l'adresse suivante : http://localhost:9000

Il est possible d'accéder à un écran de configuration depuis l'adresse : http://localhost:3001

# AngularJS

## Gestion des adresses URL

Dans le cadre de cette démonstration, nous avons utilisé la gestion des adresses URL.
Cette gestion fonctionne uniquement depuis un protocole HTTP ou HTTPS.
Par exemple, si nous ouvrons index.html du projet directement depuis un explorateur Web, nous affichons une page blanche, car la gestion des adresses URL n'est pas conçue pour fonctionner en local.

## Structure du projet

La racine du projet n'a pas vocation à être modifier profondément.
Les principales modifications de notre application doivent se trouver essentiellement dans les principaux répertoires du projet :
 - **controller**, **directive**, **service** accueillent des fichiers sources JavaScript.
 - **css** correspond aux feuilles de styles (CSS, SASS).
 - **i18n** accueille les fichiers JSON de traduction.
 - **img** correspond aux images de tout type.
 - **views** accueille toutes les pages HTML qui vont animer notre application.
 - **dependencies** est le répertoire où les ressources utilisées par l'application sont stockées.
 - **node_modules** est le répertoire installé par NodeJS.

## Création d'un Controller

1) Créer un fichier JavaScript avec le suffixe "Controller" (par exemple, LoginCtrl.js).

2) Insérer le code suivant.
```javascript
'use strict';

angular.module('NomApplicationApp')
  .controller('LoginCtrl', ['$scope', function ($scope) {
      ...
  }]);
```

3) Rajouter la référence du fichier créé à la fin du fichier index.html.
```html
<!-- build:js scripts/scripts.js -->
...
<script src="controller/LoginCtrl.js"></script>
<!-- build:js scripts/scripts.js -->
```

## Création d'un Service

1) Créer un fichier JavaScript avec le suffixe "Service" (par exemple, authService.js).

2) Insérer le code suivant.
```javascript
'use strict';

angular.module('NomApplicationApp')
  .service('authService', function () {
    ...
  });
```

3) Rajouter la référence du fichier créé à la fin du fichier index.html.
```html
<!-- build:js scripts/scripts.js -->
...
<script src="service/authService.js"></script>
<!-- build:js scripts/scripts.js -->
```

## Création d'une View

1) Créer un fichier HTML (par exemple, login.html).

2) Insérer du code dans le document.

3) Rajouter la référence du fichier créé dans le fichier *main.js*.
```javascript
<!-- build:js scripts/scripts.js -->
...
.when('/login', {
        templateUrl: 'views/login.html'
      })
 ...
```

## Création d'un Directive

1) Créer un fichier JavaScript avec le suffixe "Directive" (par exemple, HeaderDirective).

2) Insérer le code suivant.
```javascript
'use strict';

angular.module('helloApp')
  .directive('header', function () {
    ...
  });
```

3) Créer le Controller et la View.

4) Rajouter la référence des fichiers Javascript.

5) Rajouter la référence de la View dans le fichier *main.js*.

## Création d'un lien

Si on souhaite naviguer entre les différents écrans d'une application AngularJS, il faut nécessairement préfixer les adresses par "#/". Par exemple : #/nom-route
