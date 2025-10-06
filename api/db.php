<?php
try {
     $dbh = new PDO('mysql:host=localhost;dbname=test-DB', 'root', '');
     $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
     echo "Connection failed: " . $e->getMessage();
     die();
}
