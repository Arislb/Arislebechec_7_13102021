Arislebechec_7_13102021
# GROUPOMANIA 
## Créer un réseau social d'entreprise
#### *Projet OpenClassroom n°7*
--------------
## 1. **INSTALLATION**

#### FRONTEND
---
* Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande:
  
    ```
    npm install 
    ```

* puis lancer le projet en éxécutant la commande :
  
    ```
    npm run serve 
    ```

#### BACKEND
---
* Ouvrir le dossier Backend dans un second terminal de votre éditeur puis exécuter la commande:
  
    ```
    npm install 
    ```

* puis lancer le serveur en éxécutant la commande :
  
    ```
    node serve 
    ```
    ou 
    ```
    nodemon serve 
    
    ```
    #### BASE DE DONNEES ET DOTENV.
---
Dans le fichier config.JSON remplacer les champs par vos parametres:
```
"username": "YOUR NAME",
    "password": "YOUR PASSWORD",
    "database": "YOUR DATABASE_NAME",
```
Remplir le fichier env. avec  :
```
TOKEN="RANDOM_TOKEN_SECRET"
```
Importer le fichier "database_development_groupomania.sql" dans la base de données, par exemple Phpmyadmin. Sinon créer votre nouvelle base de donnée avec sequelize dans le terminal du dossier backend: "sequelize db:create" puis "sequelize db:migrate".
