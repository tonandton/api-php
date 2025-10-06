<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "../db.php";

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
     echo json_encode(array("status" => "error"));
     die();
}

try {
     $stmt = $dbh->prepare("DELETE FROM users WHERE id = ?");
     $stmt->bindParam(1, $data->id);

     if ($stmt->execute()) {
          echo json_encode(array("status" => "success"));
     } else {
          echo json_encode(array("status" => "error"));
     }

     $dbh = null;
} catch (PDOException $e) {
     echo json_encode(['error' => $e->getMessage()]);
     die();
}
