<?php include('head.php')?>

<nav>
    <input type="button" id="dm">
    <label for="dm">
        <p id="inicio">Lamp</p>
    </label>
    <ul>
        <li><a href="main.php">Sobre nós</a></li>
        <li><a href="http://">Cursos</a></li>
        <li><a href="http://">Time</a></li>
        <li><a href="http://">Faça uma doação</a></li>
        <li><a href="cadastro.php">Cadastrar-se</a></li>
        <li><a href="listar.php">Listar PROVISORIO</a></li>
        <li><?php
            @session_start();
            if(isset($_SESSION['logado']) && $_SESSION['logado'] == true){
                echo "<a href=\"logoff.php\"><li>Sair</li></a>";
            }else{
                echo "<a href=\"login.php\"><li>Entrar</li></a>";
            }
        ?></li>
    </ul>
</nav>

