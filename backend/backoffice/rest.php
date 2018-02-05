<?php
  require_once __DIR__ . '/../src/vendor/autoload.php';
  use \Psr\Http\Message\ServerRequestInterface as Request;
  use \Psr\Http\Message\ResponseInterface as Response;
  use \DavidePastore\Slim\Validation\Validation as Validation;
  use \Respect\Validation\Validator as Validator;
  use illuminate\database\Eloquent\ModelNotFoundException as ModelNotFoundException;

  /* Appel des contrôleurs */


  use \geoquizz\control\PhotosController as Photos;
  use \geoquizz\control\ComptesController as Comptes;
  use \geoquizz\control\SeriesController as Series;

  /* Appel des utilitaires */

  use \geoquizz\utils\Writer as writer;


  $config=parse_ini_file("../src/config/geoquizz.db.conf.ini");
  $db = new Illuminate\Database\Capsule\Manager();
  $db->addConnection($config);
  $db->setAsGlobal();
  $db->bootEloquent();

  //Création et configuration du container
  $configuration=[
    'settings'=>[
      'displayErrorDetails'=>true,
      'production' => false
    ]
  ];

  $errors = require_once __DIR__ . '/../src/config/api_errors.php';

  $c=new \Slim\Container(array_merge( $configuration, $errors) );
  $app=new \Slim\App($c);
  $c = $app->getContainer();

  //Initialisation du conteneur pour le writer
  new writer($c);

  //Application

  function afficheError(Response $resp, $location, $errors){
  	$resp=$resp->withHeader('Content-Type','application/json')
  	->withStatus(400)
  	->withHeader('Location', $location);
  	$resp->getBody()->write(json_encode($errors));
  	return $resp;
  }

  //======================================================
  //BackOffice
  //======================================================

  //Comptes

  $app->post('/compte[/]',
    function(Request $req, Response $resp, $args){
      $ctrl=new Photos($this);
      return $ctrl->getPhotos($req,$resp,$args);
    }
  )->setName("creer_compte");

  //Photos

  $app->get('/photos[/]',
    function(Request $req, Response $resp, $args){
      $ctrl=new Photos($this);
      return $ctrl->getPhotos($req,$resp,$args);
    }
  )->setName("photosGet");

  $app->get('/photos/{id}',
    function(Request $req, Response $resp, $args){
      $ctrl=new Photos($this);
      return $ctrl->getPhotosID($req,$resp,$args);
    }
  )->setName("photosGetID");

  $app->delete('/photos/{id}',
    function(Request $req, Response $resp, $args){
      $ctrl=new Photos($this);
      return $ctrl->deletePhotos($req,$resp,$args);
    }
  )->setName("photosDelete");

  $app->put('/photos/{id}',
    function(Request $req, Response $resp, $args){
      $ctrl=new Photos($this);
      return $ctrl->putPhotosID($req,$resp,$args);
    }
  )->setName("photosPut");

  $app->post('/photos[/]',
    function(Request $req, Response $resp, $args){
      $ctrl=new Photos($this);
      return $ctrl->postPhotos($req,$resp,$args);
    }
  )->setName("photosPut");


//======================================================
//Series
//======================================================

//Lite de series
$app->get('/series[/]',
  function(Request $req, Response $resp, $args){
    $ctrl=new Series($this);
    return $ctrl->getSeries($req,$resp,$args);
  }
)->setName("seriesGet");

$app->get('/series/{id}',
  function(Request $req, Response $resp, $args){
    $ctrl=new Series($this);
    return $ctrl->getSeriesID($req,$resp,$args);
  }
)->setName("seriesGetID");

// Supprimer une Serie
$app->delete('/series/{id}',
  function(Request $req, Response $resp, $args){
    $ctrl=new Series($this);
    return $ctrl->deleteSeries($req,$resp,$args);
  }
)->setName("seriessDelete");

  $app->run();
?>
