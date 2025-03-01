class Profile {
    constructor(name, picture, description, category, price, owner, location, contactInfo) {
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.category = category;
        this.price = price;
        this.owner = owner;
        this.location = location;
        this.contactInfo = contactInfo || "No contact info provided"; // Default value for existing posts
    }
}

let posts = [];
var showAll = true;
var showTextbooksOnly = false;
var showElectronicsOnly = false;
var showSuppliesOnly = false;
var showTutoringOnly = false;

// Load posts from localStorage
function loadPostsFromStorage() {
    const savedPosts = localStorage.getItem('huskyTradePosts');
    if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        
        // Convert plain objects to Profile instances if needed
        posts = parsedPosts.map(post => {
            return new Profile(
                post.name,
                post.picture,
                post.description,
                post.category,
                post.price,
                post.owner,
                post.location,
                post.contactInfo
            );
        });
    } 
        // Add default posts if no saved posts exist
        posts.push(
            new Profile(
            "MacBook Pro",
            "https://smithfamilybookstore.com/wp-content/uploads/2019/11/girls-reading-3.jpg",
            "I don't want this anymore",
            "Textbook",
            "FREE",
            "Buckley Hall",
            "CT Hall"
            ),
            new Profile(
            "MacBook Pro",
            "https://smithfamilybookstore.com/wp-content/uploads/2019/11/girls-reading-3.jpg",
            "I don't want this anymore",
            "Textbook",
            "FREE",
            "Buckley Hall",
            "CT Hall"
            ),
            new Profile(
            "MacBook Pro",
            "https://smithfamilybookstore.com/wp-content/uploads/2019/11/girls-reading-3.jpg",
            "I don't want this anymore",
            "Electronics",
            "FREE",
            "Buckley Hall",
            "Buckley Hall"
            )
        );
    }


// Load posts when the script runs
loadPostsFromStorage();

const container = document.getElementById("homeitems");

function createItemBlockHTML(post) {
    return `
        <div class="itemblock" data-post-id="${posts.indexOf(post)}">
            <div class="itemblock_image">
                <img src="${post.picture}" alt="Image">
            </div>
            <div class="itemblock__content">
                <div class="itemblock_title">${post.name}</div>
                <div class="itemblock_description">${post.description}</div>
                <div class="price_and_loc">
                    <div class="itemblock_price">${post.price}</div>
                    <div class="itemblock_location">
                        <img src="locationicon.png" alt="Location" style="width: 20px; height: 20px;">
                        ${post.location}
                    </div>
                </div>
                <div class="expanded-content" style="display: none;">
                    <div class="seller-info">
                        <p><strong>Seller:</strong> ${post.owner}</p>
                        <p><strong>Category:</strong> ${post.category}</p>
                        <p><strong>Contact:</strong> ${post.contactInfo}</p>
                    </div>
                    <button class="contact-button">Contact Seller</button>
                </div>
            </div>
        </div>
    `;
}

function showPosts(category = null) {
    if (!container) return; // Ensure container exists
    container.innerHTML = ''; // Clear previous posts

    for (let i = 0; i < posts.length; i++) {
        if (category === null || posts[i].category === category) {
            container.innerHTML += createItemBlockHTML(posts[i]);
        }
    }
    
    // Set up clickable functionality after posts are loaded
    setupExpandableItems();
}

function setupExpandableItems() {
    // Get all item blocks
    const itemBlocks = document.querySelectorAll('.itemblock');
    
    // Add click event listener to each item block
    itemBlocks.forEach(block => {
        block.addEventListener('click', function() {
            // Toggle the 'expanded' class
            this.classList.toggle('expanded');
            
            // Find the expanded content div inside this block
            const expandedContent = this.querySelector('.expanded-content');
            
            // Toggle its display
            if (expandedContent.style.display === 'none') {
                expandedContent.style.display = 'block';
            } else {
                expandedContent.style.display = 'none';
            }
        });
    });
    
    // Add event listener for contact buttons
    document.querySelectorAll('.contact-button').forEach(button => {
        button.addEventListener('click', function(event) {
            // Prevent the click from bubbling up to the itemblock
            event.stopPropagation();
            
            // Get the post ID from the parent itemblock
            const itemBlock = this.closest('.itemblock');
            const postId = itemBlock.getAttribute('data-post-id');
            const post = posts[postId];
            
            // Show contact information
            alert(`Contact information for ${post.name}:\nSeller: ${post.owner}\nContact: ${post.contactInfo}\nLocation: ${post.location}`);
        });
    });
}

window.onload = function() {
    // Call the showPosts function to display posts based on the flags
    if (showAll) {
        showPosts(); // Show all posts
    } else if (showTextbooksOnly) {
        showPosts("Textbook"); // Show only textbooks
    } else if (showElectronicsOnly) {
        showPosts("Electronics"); // Show only electronics
    } else if (showSuppliesOnly) {
        showPosts("Supplies"); // Show only supplies
    } else if (showTutoringOnly) {
        showPosts("Tutoring"); // Show only tutoring
    }
};

// Set up event listeners once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if elements exist before adding event listeners
    const textbookBtn = document.getElementById("textbook-button");
    if (textbookBtn) {
        textbookBtn.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            showAll = false;
            showTextbooksOnly = true;
            showElectronicsOnly = false;
            showSuppliesOnly = false;
            showTutoringOnly = false;
            
            showPosts("Textbook");
            console.log("Textbook button clicked");
            
            return false;
        });
    }

    const electronicsBtn = document.getElementById("electronics-button");
    if (electronicsBtn) {
        electronicsBtn.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            showAll = false;
            showTextbooksOnly = false;
            showElectronicsOnly = true;
            showSuppliesOnly = false;
            showTutoringOnly = false;
            
            showPosts("Electronics");
            console.log("Electronics button clicked");
            
            return false;
        });
    }

    const suppliesBtn = document.getElementById("supplies-button");
    if (suppliesBtn) {
        suppliesBtn.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            showAll = false;
            showTextbooksOnly = false;
            showElectronicsOnly = false;
            showSuppliesOnly = true;
            showTutoringOnly = false;
            
            showPosts("Supplies");
            console.log("Supplies button clicked");
            
            return false;
        });
    }

    const tutoringBtn = document.getElementById("tutoring-button");
    if (tutoringBtn) {
        tutoringBtn.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            showAll = false;
            showTextbooksOnly = false;
            showElectronicsOnly = false;
            showSuppliesOnly = false;
            showTutoringOnly = true;
            
            showPosts("Tutoring");
            console.log("Tutoring button clicked");
            
            return false;
        });
    }

    const allBtn = document.getElementById("all-button");
    if (allBtn) {
        allBtn.addEventListener("click", function(event) {    
            event.preventDefault();
            event.stopPropagation();
            
            showAll = true;
            showTextbooksOnly = false;
            showElectronicsOnly = false;
            showSuppliesOnly = false;
            showTutoringOnly = false;
            
            showPosts();
            console.log("All button clicked");
            
            return false;
        });
    }
});