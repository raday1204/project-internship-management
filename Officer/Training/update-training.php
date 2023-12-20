<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
    }

    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->studentCode) && isset($data->newStatus)) {
        $studentCode = $conn->real_escape_string($data->studentCode);
        $newStatus = $conn->real_escape_string($data->newStatus);

        // Update the status in the training table for the specific company
        $sql = "UPDATE training SET status = '$newStatus' WHERE student_code = '$studentCode'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("error" => "Error updating status: " . $conn->error));
        }
    } else {
        echo json_encode(array("error" => "Invalid input data."));
    }

    // Close the connection
    $conn->close();
} else {
    echo json_encode(array("error" => "Invalid request method."));
}
?>
