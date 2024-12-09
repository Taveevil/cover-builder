<?php 
    include 'libraries/config.php';
    include 'libraries/read.php'; 
    include 'libraries/write.php'; 
    include 'libraries/functions.php'; 
    include 'template/header.php';
?>

<main id="login">
	<?php if($_SESSION['user_id'] !== 1) : ?>
	<form action="<?php echo $site['url_process']; ?>/do-login.php" method="post">
		<header>
			<span><i class="ph ph-key"></i></span>
			<h1>Login</h1>
		</header>
		<label for="username">
			<p>Username</p>
			<input name="username" type="text" placeholder="Username">
		</label>
		
		<label for="password">
			<p>Password</p>
			<input id="password" name="password" type="password" placeholder="Password">
		</label>
		
		<div class="input_container">
			<button class="btn btn--return" > Go Back </button>
			<input class="btn" type="submit" value="Login">
		</div>
	</form>
	
	<?php else: ?>
	<form action="<?php echo $site['url_process']; ?>/do-logout.php" method="post">
		<header>
			<span><i class="ph ph-key"></i></span>
			<h1>Logout</h1>
		</header>
		<div class="input_container">
			<button class="btn btn--return">Go Back</button>
			<input class="btn" type="submit" value="Log Out">
		</div>
	</form>
	<?php endif; ?>
</main>

<?php include 'template/footer.php'; ?>
