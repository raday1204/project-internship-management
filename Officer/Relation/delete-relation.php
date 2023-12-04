<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');

$hostAuth = 'localhost';
$userAuth = 'root';
$passAuth = '';
$dbname = 'internship_management';

$conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $relationId  = isset($_GET['id']) ? $_GET['id'] : null;

    if ($relationId  === null) {
        echo json_encode(['success' => false, 'message' => 'Invalid ID']);
        exit;
    }

    $delete_query = "DELETE FROM relation WHERE id = $relationId ";

    if ($conn->query($delete_query) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Relation deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error deleting relation: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>
