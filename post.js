document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const postForm = document.getElementById('post-form');
    const itemImage = document.getElementById('item-image');
    const imagePreview = document.getElementById('image-preview');
    
    // Show image preview when user selects an image
    itemImage.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            
            reader.readAsDataURL(file);
        }
    });
    
    // Handle form submission
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('item-name').value;
        const description = document.getElementById('item-description').value;
        const category = document.getElementById('item-category').value;
        const price = document.getElementById('item-price').value;
        const location = document.getElementById('item-location').value;
        
        // For image, use either the preview image or a default placeholder
        let pictureUrl = imagePreview.src;
        if (!pictureUrl || pictureUrl === '') {
            pictureUrl = "https://smithfamilybookstore.com/wp-content/uploads/2019/11/girls-reading-3.jpg"; // Default image
        }
        
        // Get existing posts from localStorage
        let currentPosts = [];
        const savedPosts = localStorage.getItem('huskyTradePosts');
        if (savedPosts) {
            currentPosts = JSON.parse(savedPosts);
        }
        
        // Create new post object
        const newPost = {
            name: name,
            picture: pictureUrl,
            description: description,
            category: category,
            price: price,
            owner: "Current User", // This would ideally be the logged-in user
            location: location
        };
        
        // Add new post to posts array
        currentPosts.push(newPost);
        
        // Save updated posts to localStorage
        localStorage.setItem('huskyTradePosts', JSON.stringify(currentPosts));
        
        // Show success message
        alert("Your item has been posted successfully!");
        
        // Redirect to home page to see the post
        window.location.href = 'index.html';
    });
});