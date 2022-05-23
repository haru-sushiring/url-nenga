<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
    <link rel="stylesheet" href="../../style.css" />
    <title>URLねんが</title>
    <script>
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyAgOZLBIHOJaz_r1n4Vb17BBuk9Xpm0aB4",
            authDomain: "kifunenga.firebaseapp.com",
            databaseURL: "https://kifunenga.firebaseio.com",
            projectId: "kifunenga",
            storageBucket: "kifunenga.appspot.com",
            messagingSenderId: "756508810526",
            appId: "1:756508810526:web:64f64025e7f7a19803bd0f",
            measurementId: "G-FKVKXNJDE5",
            storageBucket: "gs://kifunenga.appspot.com",
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    </script>
</head>

<body>
    <div class="container">
        <div class="row text-center">
            <div class="col-12 col-sm-12">
                <p>URLをコピーする↓</p>
                <div class="copy_main">
                    <?php
                    $url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
                    ?>
                    <div class="copy_btn" data-clipboard-text=<?php echo $url; ?>>
                        <i class="fa"></i><span>URLをコピーする</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12">
                <img src="" id="image" class="rounded mx-auto d-block">
                <p>画像をクリックすると、はがきが反転します</p>
            </div>
        </div>
    </div>
    <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-storage.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-database.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.6/clipboard.min.js"></script>
    <script src="../../js/storage4.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>

</html>