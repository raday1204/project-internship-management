<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

$hostAuth = "localhost";
$userAuth = "root";
$passAuth = "";
$dbname = "internship_management";

$conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Use prepared statement to avoid SQL injection
    $select_query = "SELECT * FROM relation";
    $result = $conn->query($select_query);

    if ($result === false) {
        echo json_encode(['success' => false, 'message' => 'Error executing query: ' . $conn->error]);
        exit();
    }

    $relations = [];
    while ($row = $result->fetch_assoc()) {
        $relations[] = [
            'id' => $row['id'],
            'relation_date' => $row['relation_date'],
            'relation_content' => $row['relation_content']
        ];
    }

    echo json_encode(['success' => true, 'data' => $relations]);
} else {
    // Handle invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

// Close the connection
$conn->close();
?>
