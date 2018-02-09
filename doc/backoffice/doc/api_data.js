define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "C__Daniel_wamp64_www_html_geoquizz_doc_backoffice_doc_main_js",
    "groupTitle": "C__Daniel_wamp64_www_html_geoquizz_doc_backoffice_doc_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/",
    "title": "Affiche la page de connexion au compte",
    "group": "Comptes",
    "name": "getComptesConnexion",
    "version": "0.1.0",
    "description": "<p>Accès à toutes les ressources de type compte : permet d'accéder à la représentation des ressources compte permettant la connexion, Retourne une liste de lien pour twig.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "optional": false,
            "field": "OK",
            "description": "<p>Ressources trouvées</p>"
          }
        ]
      }
    },
    "filename": "./index.php",
    "groupTitle": "Comptes"
  },
  {
    "type": "get",
    "url": "/creerCompte",
    "title": "Affiche la page de création de compte",
    "group": "Comptes",
    "name": "getComptesCreation",
    "version": "0.1.0",
    "description": "<p>Accès à toutes les ressources de type compte : permet d'accéder à la représentation des ressources compte permettant la création d'un compte. Retourne une liste de lien pour twig.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "optional": false,
            "field": "OK",
            "description": "<p>Ressources trouvées</p>"
          }
        ]
      }
    },
    "filename": "./index.php",
    "groupTitle": "Comptes"
  },
  {
    "type": "post",
    "url": "/",
    "title": "Vérification et connexion à un compte",
    "group": "Comptes",
    "name": "loginCompte",
    "version": "0.1.0",
    "description": "<p>Création d'une ressource de type Compte: permet de récupérer après vérification de son éxistence une ressource compte. Redirige vers la page des séries du backoffice.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Varchar",
            "optional": false,
            "field": "email",
            "description": "<p>Email de l'utilisateur</p>"
          },
          {
            "group": "Parameter",
            "type": "Varchar",
            "optional": false,
            "field": "password",
            "description": "<p>Mot de passe</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Réponse : 200": [
          {
            "group": "Réponse : 200",
            "optional": false,
            "field": "OK",
            "description": "<p>Ressources trouvées</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Réponse : 400": [
          {
            "group": "Réponse : 400",
            "optional": false,
            "field": "Bad",
            "description": "<p>request paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n\t\t\temail : must be valid email\n\t\t\tpassword : must contain only letters (a-z) and digits (0-9)\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "./index.php",
    "groupTitle": "Comptes"
  },
  {
    "type": "post",
    "url": "/creerCompte",
    "title": "Créer un compte",
    "group": "Comptes",
    "name": "postCompte",
    "version": "0.1.0",
    "description": "<p>Création d'une ressource de type Compte: permet d'ajouter une ressource compte. Redirige vers la page de connexion.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Varchar",
            "optional": false,
            "field": "nom",
            "description": "<p>Pseudo de l'utilisateur</p>"
          },
          {
            "group": "Parameter",
            "type": "Varchar",
            "optional": false,
            "field": "email",
            "description": "<p>Email de l'utilisateur</p>"
          },
          {
            "group": "Parameter",
            "type": "Varchar",
            "optional": false,
            "field": "password",
            "description": "<p>Mot de passe</p>"
          },
          {
            "group": "Parameter",
            "type": "Varchar",
            "optional": false,
            "field": "password_rep",
            "description": "<p>Confirmation du mot de passe</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Réponse : 201": [
          {
            "group": "Réponse : 201",
            "optional": false,
            "field": "Created",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Réponse : 400": [
          {
            "group": "Réponse : 400",
            "optional": false,
            "field": "Bad",
            "description": "<p>request paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n\t\t\tnom : must contain only letters (a-z) and digits (0-9)\n\t\t\temail : must be valid email\n\t\t\tpassword : must contain only letters (a-z) and digits (0-9)\n\t\t\tpassword_rep :must contain only letters (a-z) and digits (0-9)\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "./index.php",
    "groupTitle": "Comptes"
  }
] });
