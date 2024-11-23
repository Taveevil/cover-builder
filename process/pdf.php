<?php 
include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

// include autoloader
require_once '../libraries/dompdf/autoload.inc.php';

// $html = implode('',$_POST);
$html = '<h1>Hello<h1>';

// reference the Dompdf namespace
use Dompdf\Dompdf;

// instantiate and use the dompdf class
$dompdf = new Dompdf();
$dompdf->loadHtml($html);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('letter', 'portrait');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser
$dompdf->stream();

$output = $dompdf->output();
return file_put_contents('filename.pdf', $output);

?>