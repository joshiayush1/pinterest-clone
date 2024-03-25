document.addEventListener("DOMContentLoaded", function() {
    const pins = document.querySelectorAll(".pin");
    
    pins.forEach(pin => {
        pin.addEventListener("click", function(e) {
            e.preventDefault();
            const postId = this.getAttribute("data-post-id"); 
            window.location.href = '/profile/userposts/viewpost/' + postId;
        });
    });
});