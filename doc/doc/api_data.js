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
    "group": "C__Daniel_wamp64_www_html_geoquizz_doc_doc_main_js",
    "groupTitle": "C__Daniel_wamp64_www_html_geoquizz_doc_doc_main_js",
    "name": ""
  },
  {
    "type": "put",
    "url": "/partie/{id}",
    "title": "modifier une partie",
    "group": "Partie",
    "name": "updatePartie",
    "version": "0.1.0",
    "description": "<p>Accès à unes ressource de type partie : Permet de modifier une partie nottament son score ainsi que le pseudo principalement, lorsque le joueur a terminé sa partie.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifiant unique de la partie à modifier</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "etat",
            "description": "<p>L'état de la partie</p>"
          }
        ],
        "request parameter": [
          {
            "group": "request parameter",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>TokenJWT</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n Location: http://api.geoquizz.local/partie/\n Content-Type: application/json;charset=utf8",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Réponse : 400": [
          {
            "group": "Réponse : 400",
            "optional": false,
            "field": "MissingParameter",
            "description": "<p>paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"type\": \"error\",\n  \"error\" : 400,\n  \"message\" : \"donnée manquante (etat)\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Partie"
  },
  {
    "type": "get",
    "url": "/seriesNbImage",
    "title": "accéder à toutes les séries 'active' (avec des photos) ainsi que le nombre d'images",
    "group": "Series",
    "name": "getSeriesEtImages",
    "version": "0.1.0",
    "description": "<p>Accès à toutes les ressources de type série : permet d'accéder à la représentation des ressources séries sans pagination avec le total du nombre d'images liées à cette série. Retourne une représentation json des ressources, incluant leur id, ville, localisation ainsi que la distance et le nombre d'image.</p>",
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
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n{\n   \"type\" : \"collection\",\n     serie : {\n         \"id\"  : \"0722ceee-16d9-4c68-b147-25d8bbcc9bd6\",\n         \"ville\" : \"Lyon\",\n         \"description\" : \"Une série de photo concernant la ville de lyon\",\n         \"serie_lat\" : \"45.75\",\n         \"serie_long\" : \"4.85\",\n         \"dist\" : \"100\",\n            \"nb_images\" : 10\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Series"
  },
  {
    "type": "get",
    "url": "/series",
    "title": "accéder à toutes les séries",
    "group": "Series",
    "name": "getSeriesSansPagination",
    "version": "0.1.0",
    "description": "<p>Accès à toutes les ressources de type série : permet d'accéder à la représentation des ressources séries sans pagination. Retourne une représentation json des ressources, incluant leur id, ville, localisation ainsi que la distance (difficulté).</p>",
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
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n{\n   \"type\" : \"collection\",\n     serie : {\n         \"id\"  : \"0722ceee-16d9-4c68-b147-25d8bbcc9bd6\",\n         \"ville\" : \"Lyon\",\n         \"description\" : \"Une série de photo concernant la ville de lyon\",\n         \"serie_lat\" : \"45.75\",\n         \"serie_long\" : \"4.85\",\n         \"dist\" : \"100\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Series"
  }
] });
