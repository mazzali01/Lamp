<?php
    require('connect.php');
    extract($_POST);
    extract($_FILES);

    $destino = "fotosClientes/" . md5(time()) . ".jpg";

    @session_start();
    $msg = "";

    if(mysqli_query($con, "INSERT INTO `tb_clientes` 
    (`cod`, `nome`, `apelido`, `email`, `tel`, `nasc`, `foto`) VALUES 
        ('NULL', '$nome', '$apelido', '$email', '$tel', '$nasc', '$destino');")){
        $msg = "<p class=green>Cadastro Criado com sucesso!</p>";
    }else{
        $msg = "<p class=red>Erro ao fazer cadastro: ". $con->error . "</p>";
    }
    $_SESSION['msg'] = $msg;

    move_uploaded_file($foto['tmp_name'],$destino);
    header("location:cadastro.php");