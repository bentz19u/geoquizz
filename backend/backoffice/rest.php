<?php
  require_once __DIR__ . '/../src/vendor/autoload.php';

  use \Psr\Http\Message\ServerRequestInterface as Request;
  use \Psr\Http\Message\ResponseInterface as Response;
  use \DavidePastore\Slim\Validation\Validation as Validation;
  use \Respect\Validation\Validator as Validator;
  use illuminate\database\Eloquent\ModelNotFoundException as ModelNotFoundException;

  /* Appel des contrôleurs */

  use \geoquizz\control\PhotoController as Photos;
  use \geoquizz\control\CompteController as Comptes;
  use \geoquizz\control\SerieController as Series;

  /* Appel des utilitaires */

  use \geoquizz\utils\Writer as writer;


  $config=parse_ini_file("../src/config/geoquizz.db.conf.ini");
  $db = new Illuminate\Database\Capsule\Manager();
  $db->addConnection($config);
  $db->setAsGlobal();
  $db->bootEloquent();

  /* Appel et configuration de twig */
  $loader = new Twig_Loader_Filesystem('../src/view/template');
  $twig = new Twig_Environment($loader, array(
      'cache' => false
  ));

  //Création et configuration du container
  $configuration=[
    'settings'=>[
      'displayErrorDetails'=>true,
      'production' => false,
      'tmpl_dir' => __DIR__ . '/../src/view/template'
    ],
    'view'=>function($c){
      return new \Slim\Views\Twig(
        $c['settings']['tmpl_dir'],
        ['debug'=>true]
      );
    }
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
  //Comptes
  //======================================================

  $validators = [
      'nom' => Validator::StringType()->alnum(),
      'email' => Validator::StringType()->alnum(),
      'password' => Validator::StringType()->alnum(),
      'password2' => Validator::StringType()->alnum(),
  ];

  $app->post('/comptes[/]',
    function(Request $req, Response $resp, $args){
      if($req->getAttribute('has_errors')){
        $errors = $req->getAttribute('errors');
        return afficheError($resp, '/parties/nouvelle', $errors);
      }else{
        $ctrl=new Comptes($this);
        return $ctrl->postCompte($req,$resp,$args);
      }
    }
  )->setName("comptesPut")->add(new Validation($validators));

  $app->get('/comptes[/]',
    function(Request $req, Response $resp, $args){
      $ctrl=new Comptes($this);
      return $ctrl->getComptes($req,$resp,$args);
    }
  )->setName("comptesGet");

  //======================================================
  //Photos
  //======================================================

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

  $validators = [
      'description' => Validator::StringType()->alnum(),
      'url' => Validator::StringType()->alnum(),
      'position_long' => Validator::numeric(),
      'position_lat' =>Validator::numeric()
  ];

  $app->put('/photos/{id}',
    function(Request $req, Response $resp, $args){
      if($req->getAttribute('has_errors')){
        $errors = $req->getAttribute('errors');
        return afficheError($resp, '/parties/nouvelle', $errors);
      }else{
        $ctrl=new Photos($this);
        return $ctrl->putPhotosID($req,$resp,$args);
      }
    }
  )->setName("photosPut")->add(new Validation($validators));

  $validators = [
    'description' => Validator::StringType()->alnum(),
    'url' => Validator::StringType()->alnum(),
    'position_long' => Validator::numeric(),
    'position_lat' =>Validator::numeric()
  ];

  $app->post('/photos[/]',
    function(Request $req, Response $resp, $args){
      if($req->getAttribute('has_errors')){
        $errors = $req->getAttribute('errors');
        return afficheError($resp, '/parties/nouvelle', $errors);
      }else{
        $ctrl=new Photos($this);
        return $ctrl->postPhotos($req,$resp,$args);
      }
    }
  )->setName("photosPost")->add(new Validation($validators));


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

//Afficher une serie par son ID
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
)->setName("seriesDelete");

//Modifier une serie

$validators = [
    'ville' => Validator::StringType()->alnum(),
    'map_refs' => Validator::numeric(),
    'dist' => Validator::numeric()
];

$app->put('/series/{id}',
  function(Request $req, Response $resp, $args){
    if($req->getAttribute('has_errors')){
      $errors = $req->getAttribute('errors');
      return afficheError($resp, '/parties/nouvelle', $errors);
    }else{
    $ctrl=new Series($this);
      return $ctrl->putSeriesID($req,$resp,$args);
    }
  }
)->setName("seriesPut")->add(new Validation($validators));

//Ajouter une serie

$validators = [
  'ville' => Validator::StringType()->alnum(),
  'map_refs' => Validator::numeric(),
  'dist' => Validator::numeric()
];

$app->post('/serie[/]',
  function(Request $req, Response $resp, $args){
    if($req->getAttribute('has_errors')){
      $errors = $req->getAttribute('errors');
      return afficheError($resp, '/parties/nouvelle', $errors);
    }else{
      $ctrl=new Series($this);
      return $ctrl->postSeries($req,$resp,$args);
    }
  }
)->setName("seriesPost")->add(new Validation($validators));

//======================================================
//General
//======================================================

// Supprimer une Serie
$app->get('/connexion[/]',
  function(Request $req, Response $resp, $args){
    $ctrl=new Comptes($this);
    return $ctrl->getComptesConnexion($req,$resp,$args);
  }
)->setName("comptesConnexionGet");

  $app->run();
?>
