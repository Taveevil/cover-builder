<?php 
    $doc_name = 'template_1';

?>

<link rel="stylesheet" href="<?php echo $site['url_cover_letters'].$doc_name?>/css/style.css">
<div class="cl_template" id="<?php echo $doc_name;?>">
    <header>
        <h1>
            <span>Tavee</span>
            <span>Villamar</span>
        </h1>
        <h2>Certified Coding guy</h2>
    </header>
    <div class="column" id="column-1">
        <div class="seperator">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="contact contact__to">
            <h5>To</h5>
            <ul>
                <li class="manager_name">Manager Name</li>
                <li class="company_name">Company Name</li>
                <li class="phone">(123)123-1234</li>
                <li class="email">email@fakeemail.ca</li>
                <li class="company_address">123 fake st. A1B 2C4</li>
            </ul>
        </div>
        <div class="contact contact__from">
            <h5>From</h5>
            <ul>
                <li>Tavee Villamar</li>
                <li>hello@tavee.ca</li>
                <li>(204)228-7253</li>
            </ul>
        </div>
    </div>
    <div class="column" id="column-2">
        <div class="seperator">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="cl_content_container">
            <div class="cl_content">    
            </div>
        </div>
    </div>
</div>