<?php  
    include('nav.php');    
    ?>
    <body>
   <?php
    include('connect.php');
    $cod = $_GET['cod'];
    $busca = mysqli_query($con, "SELECT * FROM `tb_clientes` WHERE `cod` = '$cod'");
    $cliente = mysqli_fetch_array($busca);

        @session_start();
        if(isset($_SESSION['msg'])){
            echo $_SESSION['msg'];
            unset($_SESSION['msg']);    
        }
    ?>
    
    <div class="container-cadastro">

        <div class="info-cadastro"></div>
    
        <div class="cadastro">
    
            <h3>Alteração de Perfil</h3>

                <form action="alterar.act.php" method="post" enctype="multipart/form-data">

                    <p>O nome de utilizador deve conter entre 1 e 20 caracteres; contendo apenas
                     letras de A a Z, números de 0 a 9, hifens ou traços sublinhados, não podendo
                      ser incluso quaisquer termos inapropriados.</p>

                    <p><input type="hidden" name="cod" id="cod"  value="<?php echo $cliente['cod'];?>"></p>
                    
                    <p><input type="text" name="nome" id="" placeholder="Nome Completo"></p>

                    <p><input type="text" name="apelido" id="" placeholder="Apelido"></p>
                
                    <p><input type="text" name="email" id="" placeholder="Email"></p>
                
                    <p><input type="text" name="tel" id="" placeholder="Telefone"></p>
                
                    <p><input type="date" name="nasc" id="" ></p>
                
                    <div class="foto">
                        <p>Foto: </p>
                        <p id="idfoto"><label for="foto">Escolher Foto</label></p>
                    </div>

                    <p>Ao clicar no botão abaixo, indicará que leu e concorda com os 
                    <a href="http://">Termos de Serviço</a> e <a href="http://">Termos de Privacidade</a>.</p>
                
                    <p><input type="file" name="foto" id="foto"></p>
                    <p id="botao"><input type="submit" value="Enviar"></p>
                </form>
        </div>
    </div>

</body>