<?php 
    include 'libraries/config.php';
    include 'libraries/read.php'; 
    include 'libraries/write.php'; 
    include 'libraries/functions.php'; 
    

    include 'template/header.php';


    
    
?>
<body>
    
    <?php include 'template/pagelets/block-writer.php' ?>
    <?php include 'template/pagelets/menu-variables.php' ?>

    <div class="cover_letter_container">
        <main id="cover_letter">
            <?php include 'template/pagelets/templates/template_1.php' ?>
        </main>
    </div>

    <?php include 'template/pagelets/menu-blocks.php' ?>

<?php include 'template/footer.php'; ?>
