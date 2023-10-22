<?php
    include('menu.php');
    include('nav.php');
    ?>
<body>
    <div id="barraPesquisar">
        <form id="formPesquisar">
            <input type="text" name="textoConsulta" id="txtPesquisar">
            <input type="submit" value="Pesquisar">
            <input type="button" value="Limpar" onclick="limparpesquisa()">
        </form>
    </div>

    <div id="resultadosPesquisa">

    </div>

    <script src="app.js"></script>

    <?php include('bottom.php') ?>
    
