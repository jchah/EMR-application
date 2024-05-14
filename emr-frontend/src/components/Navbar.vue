<template>
    <nav class="navbar has-background-primary-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
       
    
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
        </div>
    
        <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item has-text-link-light">
            Home
            </a>
    
            <a class="navbar-item has-text-link-light">
            Documentation
            </a>
    
            <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link has-text-link-light">
                More
            </a>
    
            <div class="navbar-dropdown">
                <a class="navbar-item">
                About
                </a>
                <a class="navbar-item is-selected">
                Jobs
                </a>
                <a class="navbar-item">
                Contact
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                Report an issue
                </a>
            </div>
            </div>
        </div>
    
        <div class="navbar-end">
            <div class="navbar-item">
            <div class="buttons">
                <a class="button has-background-success-dark has-text-primary-light">
                <strong>Sign up?</strong>
                </a>
                <a class="button has-background-warning-dark has-text-link-light">
                Log in?
                </a>
            </div>
            </div>
        </div>
        </div>
    </nav>
</template>