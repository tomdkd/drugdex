# DRUGDEX

DrugDex est un outil open-source d’indexation, de parsing et de recherche interactive de médicaments depuis des bases publiques (par exemple ANSM France).
L’application propose une CLI, et une API pour une intégration facile dans n'importe quel outil.

## Sommaire
- [Fonctionalités](#fonctionnement)
- [Configuration](#configuration)
- [Installation](#installation)
  - [Locale](#locale)
  - [Docker](#docker)
- [Structure du projet](#structure-du-projet)
- [Contribuer](#contribuer)

## Fonctionalités

DrugDex est capable, dès son lancement, de récupérer les fichiers des médicaments disponibles sur le site du gouvernement français et de le parser pour qu'ils soient facilement indexables et exploitables.

Ainsi, il est possible de rechercher les médicaments en fonction de :
- Leur identifiant
- Leur nom
- Leur disponibilité sur le marché
- Le type du médicament
- Le type de prise (voie orale, cutanée)
- Le(s) propriétaire(s) du médicament

## Configuration

Récupérez le code de l'application en lançant les commandes :
```
git clone git@github.com:tomdkd/drugdex.git
cd drugdex/
```

À la racine du projet, vous trouverez le fichier `.env.example`. Renommez le en `.env`.

À l'intérieur de ce fichier, vous y trouverez plusieurs variables. Entrez-y les valeurs que vous souhaitez pour la configuration :

```
NODE_ENV=dev
PORT=3000
HOST=0.0.0.0 #Ne pas changer si vous utilisez Docker
POSTGRES_HOST=drugdex-db
POSTGRES_PORT=5432
POSTGRES_USER=drugdex_user
POSTGRES_PASSWORD=supersecret
POSTGRES_DB=drugdex
RELOAD_FILES=true
```
*En mode `dev`, vous pouvez laisser la variable `RELOAD_FILES` à `true`. Cela vous permet de tester l'application sans stocker un nouveau fichier à chaque lancement. Si cette variable est à `false`, chaque démarrage de l'application entrainera le téléchargement et le parsing d'un nouveau fichier dans le dossier `files`.*

## Installation
### Locale

Si ce n'est pas déjà fait, placez vous à la racine du projet et commencez par lancer la commande `npm install` pour installer les dépendances.

Vérifiez que votre serveur PostgreSQL est disponible et accessible et que vous avez bien rentré les identifiants de connexion à la base de données.

Lancez ensuite la commande `npm run start:dev` pour lancer le serveur de développement.

L'application est maintenant disponible sur `http://localhost:3000` pour l'API et en ligne de commande.

### Docker

Comme pour la version locale, lancez la commande `npm install`. Cela vous permettra d'avoir l'auto complétion des librairies utilisées dans le projet.

Lancez ensuite la commande `docker compose up --build`.

L'application est maintenant disponible sur `http://localhost:3000` pour l'API et en ligne de commande.

## Structure du projet

DrugDex a été pensé pour être modulaire et extensible.
Il existe plusieurs types de fichiers sur le site du grouvernement, concernant les médicaments et le but est d'étendre ce service à l'Europe, puis à l'international.

Actuellement, il existe 3 modules : 
- Database : Qui s'occupe de l'enregistrement et les requêtes en base de données pour tous les services qui en auront besoin.

- File : Qui s'occupe de télécharger le(s) fichier(s) souhaités à l'interval souhaité et le(s) intégrer dans le dossier `files` qui se trouve à la racine du projet

- Parser : Qui va lire le fichier et préparer chaque ligne pour l'enregistrement en base de données (Actuellement, le benchmark montre 0,035 secondes pour un traitement de >25k lignes).

## Contribuer