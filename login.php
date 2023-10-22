<?php include('nav.php');?>
<body>
    
    <?php
        @session_start();
        if(isset($_SESSION['msg'])){
            echo $_SESSION['msg'];
            unset($_SESSION['msg']);    
        }
    ?>

    <div class="container-cadastro">

        <div class="info-cadastro">

        </div>

            <div class="cadastro">

                <h3>Entre em Sua Conta!</h3>

                <form action="login.act.php" method="post" enctype="multipart/form-data">

                    <p><input type="text" name="email" id="" placeholder="Email"></p>
                    <p><input type="password" name="senha" id="" placeholder="Senha"></p>
                    <p id="botao"><input type="submit" value="Enviar" ></p>
                </form>

            </div>
        
    </div>
</body>
</html>