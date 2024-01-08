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

$conn->set_charset("utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $relationId = $_GET['id'];

    // Use prepared statement to avoid SQL injection
    $select_query = "SELECT * FROM relation WHERE id = ?";
    $stmt = $conn->prepare($select_query);

    $stmt->bind_param("i", $relationId);

    $stmt->execute();

    $result = $stmt->get_result();

    if ($result === false) {
        echo json_encode(['success' => false, 'message' => 'Error executing query: ' . $conn->error]);
        exit();
    }

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        $basePath = '/PJ/Backend/Officer/uploads/';
        $imagePath = $basePath . basename($row['relation_pic']);
        
        $response = [
            'success' => true,
            'data' => [
                'id' => $row['id'],
                'relation_date' => $row['relation_date'],
                'relation_content' => $row['relation_content'],
                'relation_pic' => $imagePath
            ]
        ];
        
        echo json_encode($response);
    } else {
        echo json_encode(['success' => false, 'message' => 'Relation not found']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>